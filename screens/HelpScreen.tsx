import React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const HelpScreen = () => {
    const navigation=useNavigation()
  return (
    <View className='flex-1 bg-red-600'>
    <SafeAreaView className=' flex mt-4'>
        <View className=' flex-row justify-start'>
            <TouchableOpacity className=' ml-4 mt-3'  onPress={() => navigation.goBack()}>
                <ArrowLeftCircleIcon size={30} color="white" />

            </TouchableOpacity>
            <View className=' flex justify-center ml-5  '>

                <Text className='text-white  font-medium  text-lg mt-2 '>
                    Help

                </Text>
                

            </View>

        </View>


    </SafeAreaView>

    <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>
        <View className='p-5 '>
            

        </View>


    </View>
    





</View>
  )
}

export default HelpScreen
