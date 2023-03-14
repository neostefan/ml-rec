import React from "react";
import tw from "twrnc";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Message, MessageType } from "../util/definitions-util";

interface props {
    message: Message
    cancel?: () => void
}

const Notification: React.FC<props> = ({message, cancel}) => {
    return (
        <View style={(message.type == MessageType.ERROR) ? tw.style("flex flex-row justify-around items-center p-2 bg-red-200 border-2 border-red-600 rounded-lg") : tw.style("flex flex-row justify-around items-center p-1 bg-green-200 border-2  border-green-600 rounded-lg")}>
            <Text style={(message.type == MessageType.ERROR) ? tw.style("text-red-800 mr-3") : tw.style("text-green-800 mr-3")}>{message.body}</Text>
            <TouchableOpacity onPress={cancel}>
                <FontAwesome name="close" size={17} color={(message.type == MessageType.ERROR) ? tw.color("text-red-800") : tw.color("text-green-800")}/>
            </TouchableOpacity>
        </View>
    )
}

export default Notification