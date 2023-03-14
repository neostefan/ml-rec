import React from "react";
import tw from "twrnc";
import { View, Text, Dimensions, FlatList } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory-native";

import MediaCard from "../components/media-card";

const { width } = Dimensions.get("screen")

let data = [
    { "value": 1, "ml-unit": 3000.10 },
    { "value": 2, "ml-unit": 100.2 },
    { "value": 3, "ml-unit": 10.3 },
    { "value": 4, "ml-unit": 10.9 },
    { "value": 5, "ml-unit": 120.4 }
]

let data1 = [
    { "value": 1, "ml-unit": 1000.10 },
    { "value": 2, "ml-unit": 300.2 },
    { "value": 3, "ml-unit": 500.3 },
    { "value": 4, "ml-unit": 250.9 },
    { "value": 5, "ml-unit": 950.4 }
]

let data2 = [
    { "value": 1, "ml-unit": 3000.10 },
    { "value": 2, "ml-unit": 100.2 },
    { "value": 3, "ml-unit": 10.3 },
    { "value": 4, "ml-unit": 10.9 },
    { "value": 5, "ml-unit": 120.4 }
]

let data3 = [
    { "value": 1, "ml-unit": 3000.10 },
    { "value": 2, "ml-unit": 100.2 },
    { "value": 3, "ml-unit": 10.3 },
    { "value": 4, "ml-unit": 10.9 },
    { "value": 5, "ml-unit": 120.4 }
]

let data4 = [
    { "value": 1, "ml-unit": 3000.10 },
    { "value": 2, "ml-unit": 100.2 },
    { "value": 3, "ml-unit": 10.3 },
    { "value": 4, "ml-unit": 10.9 },
    { "value": 5, "ml-unit": 120.4 }
]

let fileData = [
    { name: "audio-sample-01", data: 1 },
    { name: "audio-sample-02", data: 2 },
    { name: "audio-sample-03", data: 3 },
    { name: "audio-sample-04", data: 4 },
    { name: "audio-sample-05", data: 5 },
    { name: "audio-sample-06", data: 6 },
    { name: "audio-sample-07" },
    { name: "audio-sample-08" },
    { name: "audio-sample-09" },
    { name: "audio-sample-10" },
    { name: "audio-sample-11" }
]

const Analyzer = () => {

    let [chartData, setChartData] = React.useState(data)

    let AnalyzeSample = (value: number) => {
        if(value == 1) {
            setChartData(data1)
        } else if(value == 2) {
            setChartData(data2)
        } else if(value == 3) {
            setChartData(data3)
        } else if(value == 4) {
            setChartData(data4)
        } else if(value == 5) {
            setChartData(data)
        }
    }

    return (
        <View style={tw.style("justify-between pt-5 px-5")}>
            <View style={tw.style("bg-zinc-300 border-2 border-transparent rounded-2xl shadow-2xl my-5")}>
                <VictoryChart width={width} domainPadding={40} theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={[
                            "ACI",
                            "ADI",
                            "SC",
                            "SE",
                            "TE"
                        ]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (
                            x
                        )}
                    />
                    <VictoryBar 
                        data={chartData} 
                        x="value" 
                        y="ml-unit" 
                        alignment="middle"
                        style={{data: { fill: tw.color("bg-red-600") }}}
                        animate={{ onEnter: {
                            duration: 500,
                            before: () => ({
                                fill: tw.color("bg-red-600")
                            })
                        }}}
                    />
                </VictoryChart>
            </View>
            <View style={tw.style("h-2/4 my-5")}>
                <FlatList
                    data={fileData}
                    renderItem={({item}) => <MediaCard fileName={item.name} data={item.data} analyzeSample={AnalyzeSample} />}
                />
            </View>
        </View>
    )
}

export default Analyzer
