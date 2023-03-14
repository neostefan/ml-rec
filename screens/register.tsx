import * as React from "react";
import tw from "twrnc";
import { View, Button } from "react-native";

import Input from "../components/input";
import Notification from "../components/notification";
import { Message, MessageType } from "../util/definitions-util";

interface resData {
    msg: string;
}

const Register: React.FC = () => {

    let [email, setEmail] = React.useState<string>("")
    let [firstName, setFirstName] = React.useState<string>("")
    let [lastName, setLastName] = React.useState<string>("")
    let [password, setPassword] = React.useState<string>("")
    let [msg, setMsg] = React.useState<Message>()
    let [hasMsg, setHasMsg] = React.useState<boolean>(false)

    let toggleNotificationStatus = () => {
        setHasMsg(!hasMsg)
    }

    let handleSignUp = async () => {
        try {
            let response = await fetch("http://20.108.66.200:3000/auth/register", {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password
                })
            })

            let jsonResponse = await response.json() as resData
            let res = await jsonResponse

            if(res.msg) {
                setMsg({body: res.msg, type: MessageType.INFO})
                setHasMsg(true)
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
            {hasMsg ? <Notification message={msg} cancel={toggleNotificationStatus}/> : null}
            <Input 
                inputPlaceHolder="enter your email"
                inputLabel="e-mail"
                inputValue={email}
                onInputChange={setEmail}
            />
            <Input 
                inputPlaceHolder="enter your firstname"
                inputLabel="firstName"
                inputValue={firstName}
                onInputChange={setFirstName}
            />
            <Input 
                inputPlaceHolder="enter your lastname"
                inputLabel="lastName"
                inputValue={lastName}
                onInputChange={setLastName}
            />
            <Input 
                inputPlaceHolder="enter your password"
                inputLabel="password"
                inputValue={password}
                isSecureText={true}
                onInputChange={setPassword}
            />
            <Button color={tw.color("bg-red-300")} title="Sign Up" onPress={handleSignUp}/>
        </View>
    )
}

export default Register