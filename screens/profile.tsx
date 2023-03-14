import React from "react";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import { deleteJwtToken } from "../util/auth-token-util";
import { RootStackParamList } from "../util/navigation-util";

const Profile: React.FC = () => {

    let navigator = useNavigation<NavigationProp<RootStackParamList>>()

    let toggleLogOut = () => {
        try {
            deleteJwtToken()
            navigator.navigate('Auth')
        } catch(e) {
            //add a modal or notification to manage the state of the errors in the application
            console.log(e)
        }
    }

    return (
        <View style={tw.style("h-full bg-zinc-800")}>
            <View style={tw.style("h-70 pt-10 px-10 flex-row items-center justify-around")}>
                <Fontisto name="person" size={120} color={tw.color("bg-red-500")}/>
                <Text style={tw.style("text-red-100 text-2xl tracking-wider leading-10", {fontFamily: "Anton_400Regular"})}>James Quick</Text>
            </View>
            <View style={tw.style("flex-row px-10 items-center justify-evenly")}>
                <Ionicons name="mail" size={24} color={tw.color("bg-red-500")}/>
                <Text style={tw.style("text-red-100")}>under construction :) ...</Text>
            </View>
            <View style={tw.style("flex-row p-10")}>
                <View style={tw.style("flex-1 items-center")}>
                    <Ionicons name="ios-recording" size={48} color={tw.color("bg-red-500")}/>
                    <Text style={tw.style("text-red-100 text-2xl")}>{5}</Text>
                </View>
                <View style={tw.style("flex-1 items-center")}>
                    <TouchableOpacity onPress={() => toggleLogOut()}>
                        <Ionicons name="log-out" size={48} color={tw.color("bg-red-500")}/>
                    </TouchableOpacity>
                    <Text style={tw.style("text-red-100 text-lg")}>Log Out</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile