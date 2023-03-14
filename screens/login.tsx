import * as React from "react";
import tw from "twrnc";
import { View, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Input from "../components/input";
import Notification from "../components/notification";
import { RootStackParamList } from "../util/navigation-util";
import { setJwtToken } from "../util/auth-token-util";
import { Message, MessageType } from "../util/definitions-util";

interface Props {
    navigator: NavigationProp<RootStackParamList>;
}

interface resData {
    msg: string;
    token: string;
}

const LogIn: React.FC<Props> = ({ navigator }) => {

    let [email, setEmail] = React.useState<string>("")
    let [password, setPassword] = React.useState<string>("")
    let [msg, setMsg] = React.useState<Message>()
    let [hasMsg, setHasMsg] = React.useState<boolean>(false)

    let toggleNotificationStatus = () => {
        setHasMsg(!hasMsg)
    }

    let handleSignIn = async () => {
        
        try {
            let res = await fetch("http://20.108.66.200:3000/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            let jsonResponse = await res.json() as Promise<resData>
            let decodedRes = await jsonResponse
            console.log(decodedRes)
            if(decodedRes.token) {
                await setJwtToken(decodedRes.token)
                navigator.navigate('Home')
            } else {
                setHasMsg(true)
                setMsg({body: decodedRes.msg, type: MessageType.ERROR})
            }
        } catch(e) {
            if(typeof e == "string") {
                setMsg({body: e, type: MessageType.ERROR})
            } else {
                setMsg({body: e.message, type: MessageType.ERROR})
            }
        }

    }

    return (
        <View style={tw.style("justify-center items-center w-full h-full p-5 bg-zinc-800")}>
            { hasMsg ? <Notification message={msg} cancel={toggleNotificationStatus}/> : null }
            <Input 
                inputPlaceHolder="enter your email"
                inputLabel="e-mail"
                inputValue={email}
                onInputChange={setEmail}
            />
            <Input 
                inputPlaceHolder="enter your password"
                inputLabel="password"
                inputValue={password}
                isSecureText={true}
                onInputChange={setPassword}
            />
            <Button color={tw.color("bg-red-300")} title="Sign In" onPress={handleSignIn}/>
        </View>
    )
}

export default LogIn