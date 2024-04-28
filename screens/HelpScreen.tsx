import React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View ,Linking} from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { ChevronRightIcon } from 'react-native-heroicons/solid'

const HelpScreen = () => {
    const navigation = useNavigation()
    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
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
                <View className='p-2  gap-1'>
                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between'
                        onPress={() => Linking.openURL('mailto:akshaykrishnam70@gmail.com')}  >
                        <Text className=' text-black ml-10  text-base  '>
                            Help with an order

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between'
                        onPress={() => Linking.openURL('mailto:akshaykrishnam70@gmail.com')} >
                        <Text className=' text-black ml-10  text-base  '>
                           Account and Payment

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>

                  



                </View>


            </View>






        </View>
    )
}

export default HelpScreen
