import React from "react";
import tw from "twrnc";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Notification from "../components/notification";

import { Message, MessageType } from "../util/definitions-util";
import { getJwtToken } from "../util/auth-token-util";

//! Test this on next allocation
// const CustomRecordingOptions: Audio.RecordingOptions = {
//     android: {
//         extension: '.wav',
//         audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
//         outputFormat: Audio.AndroidOutputFormat.DEFAULT,
//     }
// }

const Capture: React.FC = () => {
    
    let recorder = React.useRef<Audio.Recording>(new Audio.Recording())

    let [notification, setNotification] = React.useState<Message>()

    let [hasNotification, setHasNotification] = React.useState<boolean>(false)

    // let [loading, setLoading] = React.useState<boolean>(false)

    let [isRecording, setisRecording] = React.useState<boolean>(false)

    let [recordingDuration, setRecordingDuration] = React.useState<number>(0)

    let [isUploading, setIsUploading] = React.useState<boolean>(false)

    let [uploadProgress, setUploadProgress] = React.useState<number>(0)

    let toggleNotificationStatus = () => {
        setHasNotification(false)
    }

    let _updateScreenForRecordingStatus = (status: Audio.RecordingStatus) => {
        if (status.canRecord) {
            setisRecording(status.isRecording)
            setRecordingDuration(status.durationMillis)
        } else if (status.isDoneRecording) {
            setisRecording(status.isRecording)
            setRecordingDuration(status.durationMillis)
        //   if (!loading) {
        //     this._stopRecordingAndEnablePlayback();
        //   }
        }
    };

    let _updateScreenForFileUpload = (uploadProgress) => {
        let progress = Math.floor((uploadProgress.totalBytesSent / uploadProgress.totalBytesExpectedToSend) * 100)
        setUploadProgress(progress)
        setNotification({body: "Uploading: " + progress + "%", type: MessageType.INFO})
        setHasNotification(true)
        if(isUploading == false) {
            setIsUploading(true)
        }
    }

    let startRecording = async () => {
        try {
            let pRes = await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
            })

            if(pRes.granted) {
                await recorder.current.prepareToRecordAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
                recorder.current.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus)
                await recorder.current.startAsync()
                
                //! Not tested yet...
                //After 5mins stop and send the sample to the server
                // setTimeout(async () => {
                //     await stopRecordingAndSendFile()
                //     await startRecording()
                // }, 300000)
            }
        } catch(e: any) {
            setHasNotification(true)
            setNotification({body: e.message, type: MessageType.ERROR})
        }
    }

    let stopRecordingAndSendFile = async () => {
        try {
            await recorder.current.stopAndUnloadAsync()
            await Audio.setAudioModeAsync({
                staysActiveInBackground: false,
            })
            let token = await getJwtToken()

            let uri = recorder.current.getURI()
            recorder.current = new Audio.Recording()
            let task = FileSystem.createUploadTask("http://213.168.250.5:3000/laugh", uri, {
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: "sample",
                headers: { "Authorization": "Bearer " + token }
            }, _updateScreenForFileUpload)

            let result = await task.uploadAsync()
            console.log(result)
            let msgBody = JSON.parse(result.body)
            if(result) {
                setHasNotification(false)
                setIsUploading(false)
            }

            console.log(result)
            if(result.status == 200 || result.status == 201) {
                setHasNotification(true)
                setNotification({body: "Sample Submitted Successfully!", type: MessageType.INFO})
            } else {
                setHasNotification(true)
                setNotification({body: msgBody.msg, type: MessageType.ERROR})
            }
        }catch(e: any) {
            console.log(e)
            if(typeof e == "string") {
                setNotification({body: e, type: MessageType.ERROR})
            } else {
                setNotification({body: e.message, type: MessageType.ERROR})
            }
            setHasNotification(true)
        }
    }

    // to send the recorded data in a streaming format 
    // recorder.current.setOnRecordingStatusUpdate()

    let zeroDisplay = (value: number): string => {
        let valueInString = value.toString()

        if(value < 10) {
            return "0" + valueInString
        }

        return valueInString
    }

    let handleRecordingDurationCoversion = (timeInMs: number): string => {
        let valueInS = timeInMs / 1000

        let seconds = Math.floor(valueInS % 60)
        let minutes = Math.floor(valueInS / 60)

        return zeroDisplay(minutes) + ":" + zeroDisplay(seconds)
    }

    return (
        <View style={tw`flex py-15 px-5 bg-zinc-800`}>
            { hasNotification ? <Notification message={notification} cancel={toggleNotificationStatus}/> : null }
            <View style={tw`flex items-center`}>
                <View style={tw`flex items-center justify-center w-full h-full`}>
                    <TouchableOpacity onPress={isRecording ? stopRecordingAndSendFile : startRecording}>
                            <View style={tw`shadow-2xl shadow-red-400/20 rounded-full`}>
                                <MaterialCommunityIcons 
                                    name={(isRecording === false) ? "microphone-off" : "microphone"} 
                                    color={tw.color(`bg-red-500`)} 
                                    size={350}/>
                            </View>
                    </TouchableOpacity>
                    <Text style={tw.style('text-red-300 my-6', {fontFamily: 'Anton_400Regular', fontSize: 45})}>{handleRecordingDurationCoversion(recordingDuration)}</Text>
                    <Text style={tw`text-base text-red-300 my-5`}>
                        Click to {(isRecording === false) ? <Text>Record</Text> : <Text>Stop</Text>}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Capture