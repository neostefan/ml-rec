import React from "react";
import tw from "twrnc";
import { View, Text } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
    fileName: string;
    fileSize?: string;
    data: number;
    analyzeSample?: (dataName) => void
}

const MediaCard: React.FC<Props> = ({ fileName, fileSize, data, analyzeSample }) => {
    return (
        <View style={tw.style("flex-row border-2 border-zinc-500 rounded h-24 m-3 p-2")}>
            <View style={tw.style("flex-1 justify-center items-stretch")}>
                <FontAwesome name="file-audio-o" size={60} color={tw.color("bg-zinc-800")}/>
            </View>
            <View style={tw.style("flex-2 justify-center")}>
                <Text style={tw.style("tracking-wide text-lg", {fontFamily: "Anton_400Regular"})}>{fileName}</Text>
                <View style={tw.style("self-end flex-row justify-between w-14")}>
                    <MaterialCommunityIcons
                        onPress={() => analyzeSample(data)} 
                        name="google-analytics" 
                        size={20} 
                        color={tw.color("bg-red-600")}
                        style={tw.style("self-end")}
                    />
                    <MaterialCommunityIcons 
                        onPress={analyzeSample}
                        name="delete" 
                        size={20} 
                        color={tw.color("bg-red-600")}
                        style={tw.style("self-end")}
                    />
                </View>
            </View>
        </View>
    )
}

export default MediaCard