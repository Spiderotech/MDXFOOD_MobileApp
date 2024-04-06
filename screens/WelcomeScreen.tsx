import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



export default function WelcomeScreen() {
  const navigation=useNavigation()

  setTimeout(()=>{

      navigation.navigate('Home')
    

  },5000);
   
  return (
    <SafeAreaView className="h-full justify-center items-center bg-red-600">
      <Text className="text-white font-semibold text-2xl">MDXFOOD.COM</Text>
    </SafeAreaView>
  )
}

  
