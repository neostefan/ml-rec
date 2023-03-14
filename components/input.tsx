import React from "react";
import tw from "twrnc"
import { TextInput, View, Text } from "react-native";

interface props {
    inputLabel: string;
    inputValue: string;
    inputType?: string;
    inputPlaceHolder: string;
    isSecureText?: boolean
    onInputChange: (newText: string) => void; 
}

const Input: React.FC<props> = ({ inputLabel, inputValue, inputType, onInputChange, inputPlaceHolder, isSecureText }) => {
    return (
        <View style={tw.style("p-0 m-4")}>
            <Text style={tw.style("text-red-600")}>{inputLabel}</Text>
            <TextInput
                style={tw.style(`w-60 h-11 border border-2 border-t-0 border-red-400 rounded-lg p-3 text-red-200`)} 
                onChangeText={onInputChange} 
                value={inputValue} 
                placeholder={inputPlaceHolder}
                secureTextEntry={isSecureText}
                placeholderTextColor={tw.color("text-red-200")}
            />
        </View>
    )
}

export default Input;