import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { store } from './Store'
import { Provider } from 'react-redux'
import { requestUserPermission } from './Utils/nottification/nottificationservice'
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Forgroundhandler from './Utils/nottification/Forgroundhandler'
import PushNotification from "react-native-push-notification";





const App = () => {

  

  // useEffect(() => {
  //   console.log("Setting up notifications...");

  //   requestUserPermission().then(() => {
  //     PushNotification.createChannel({
  //       channelId: "your-channel-id", // Ensure this ID is used when showing a notification
  //       channelName: "Default channel",
  //       channelDescription: "A default channel for app notifications",
  //     });
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       console.log("Foreground message received:", remoteMessage);
  //       PushNotification.localNotification({
  //         channelId: "your-channel-id",
  //         title: remoteMessage.notification?.title || "Default Title",
  //         message: remoteMessage.notification?.body || "Default Body",
  //         soundName: "default",
  //         vibrate: true
  //       });
  //     });
  //     return unsubscribe;
  //   });
  // }, []);

 



  return (
    <Provider store={store}>
      <Navigation />
      {/* <Forgroundhandler/> */}
    </Provider>
   
  )
}

export default App
