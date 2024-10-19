import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";

export const useNotification = () => {
  async function registerForPushNotificationsAsync() {
      let token = '';
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("TOKEN: ", token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      return token;
  }
  
  //* for when the notification comes in and the app is foregrounded
  function handleNotification(notification: Notifications.Notification) {
    console.log(notification.request.content);
  }
  
  //* for when the notification is interacted with
  function handleNotificationResponse(response: Notifications.NotificationResponse) {
      
  }
    
  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse
  }
}

export default useNotification;