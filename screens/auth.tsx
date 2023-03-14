import * as React from "react";
import { View, Text, Pressable } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import tw from "twrnc";
import LogIn from "./login";
import Register from "./register";
import Switch from "../components/switch";
import { RootStackParamList } from "../util/navigation-util";

interface Props {
    navigation: NavigationProp<RootStackParamList>;
}

const AuthSelector: React.FC<Props> = ({ navigation }) => {

    let [screen, setScreen] = React.useState<string>('LogIn')

    let handleScreenSwitch = (name: string): void => {
        setScreen(name)
    }


    return (
        <View style={tw.style("flex justify-center flex-1")}>
            <View style={tw.style("flex flex-auto justify-center items-center")}>
                <Switch screenName={screen} switchScreen={(name: string) => handleScreenSwitch(name)}/>
            </View>
            <View style={tw.style("flex items-start flex-4")}>
                { screen === 'LogIn' ? <LogIn navigator={navigation}/> : <Register/> }
            </View>
        </View>
    )
}

export default AuthSelector