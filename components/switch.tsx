import React from "react";
import tw from "twrnc";
import { View, TouchableOpacity, Text } from "react-native";

interface props {
    screenName: string;
    switchScreen: (screenName: string) => void
}

const Switch: React.FC<props> = ({screenName, switchScreen}) => {
    return (
        <View style={tw.style(`flex-row justify-center shadow-2xl`)}>
            <TouchableOpacity onPress={() => switchScreen('LogIn')}>
            <View style={tw.style(`${screenName === 'LogIn' ? 'bg-red-700 shadow-2xl shadow-red-500/50' : 'bg-white'} p-2`)}>
                    <Text style={tw.style(`${screenName === 'LogIn' ? 'text-white font-bold' : 'text-red-400 font-bold'}`)}>Sign In</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchScreen('SignUp')}>
                <View style={tw.style(`${screenName === 'SignUp' ? 'bg-red-700 shadow-2xl shadow-red-500/50' : 'bg-white'} p-2`)}>
                    <Text style={tw.style(`${screenName === 'SignUp' ? 'text-white font-bold' : 'text-red-400 font-bold'}`)}>Sign Up</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Switch