import * as React from 'react';
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { deactivateKeepAwake } from "expo-keep-awake";
import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
import tw from "twrnc";
import * as Notifications from "expo-notifications";

import { AuthSelector, Capture, Analyzer, Profile } from './screens';

import { RootStackParamList, RootTabParamList } from "./util/navigation-util"
import { getJwtToken } from "./util/auth-token-util";
import ErrorBoundary from './util/error-boundary';
import useNotification from './hooks/useNotification';

const Tab = createBottomTabNavigator<RootTabParamList>()
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const { registerForPushNotificationsAsync } = useNotification(); 
  let [userToken, setUserToken] = React.useState<string | null>(null)
  let [error, setError] = React.useState<string | null>(null)

  deactivateKeepAwake()
  React.useEffect(() => {
    
    registerForPushNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    let fetchAuthUser = async () => {
      try {
        let token = await getJwtToken()
        console.log("token: ",  token)
        if(token) {
          setUserToken(token)
        }
      } catch(e) {
        setError(e.message)
      }
    }

    fetchAuthUser()
  }, [])

  let [fontLoaded] = useFonts({
    Anton_400Regular
  })

  if(!fontLoaded) {
    return null
  }

  //{userToken ? 'Home' : 'Auth'}

  return (
        <ErrorBoundary errorMsg={error}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={userToken ? 'Home' : 'Auth'} screenOptions={() => ({
              headerShown: false,
            })}>
              <Stack.Screen name='Auth' component={AuthSelector}/>
              <Stack.Screen name='Home' component={AppTab}/>
            </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
  );
}

function AppTab() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if(route.name === 'Profile') {
          iconName = focused ? "account-circle-outline" : "account-circle"
        } else if(route.name == 'Capture') {
          iconName = focused ? "microphone-variant" : "microphone-variant-off"
        } else if(route.name == 'Analyzer') {
          iconName = focused ? "chart-box-outline" : "chart-box"
        }

        return <MaterialCommunityIcons name={iconName} color={color} size={size}/>
      },
      tabBarActiveTintColor: tw.color("bg-red-500"),
      tabBarStyle: tw.style("border-0 border-transparent", {elevation: 0, shadowOpacity: 0}),
      tabBarInactiveTintColor: tw.color("bg-zinc-500"),
      headerShown: false 
    })}>
      <Tab.Screen name='Capture' component={ Capture }/>
      <Tab.Screen name='Analyzer' component={Analyzer}/>
      <Tab.Screen name='Profile' component={Profile}/>
    </Tab.Navigator>
  )
}