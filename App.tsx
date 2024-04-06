import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { store } from './Store'
import { Provider } from 'react-redux'
import { requestUserPermission } from './Utils/nottification/nottificationservice'
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';




const App = () => {

  

  useEffect(()=>{

    requestUserPermission()

    

  },[])

 



  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
   
  )
}

export default App
