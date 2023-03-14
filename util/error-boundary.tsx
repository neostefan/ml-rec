import React from "react";
import tw from "twrnc";
import { View, Text } from "react-native";

interface props {
    errorMsg?: string;
    children: React.ReactElement;
}

const ErrorBoundary: React.FC<props> = ({ errorMsg, children }) => {

    let [hasError, setHasError] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(errorMsg) {
            setHasError(true)
        }
    })

    if(hasError) {
        return (
            <View>
                <Text>{errorMsg}</Text>
            </View>
        )
    }

    return (
        <View style={tw.style("flex-1 bg-zinc-800")}>
            { children }
        </View>
    )
}

export default ErrorBoundary;