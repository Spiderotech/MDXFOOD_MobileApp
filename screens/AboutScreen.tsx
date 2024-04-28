import React from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View,Linking } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import apple from "../assets/images/MDXFOOD.png";

const AboutScreen = () => {
    const navigation = useNavigation()
    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size={30} color="white" />

                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  mb-5 '>

                        <Text className='text-white  font-medium  text-lg mt-2 '>
                            About

                        </Text>


                    </View>

                </View>


            </SafeAreaView>
            <View className='  bg-white h-auto  rounded-tl-3xl '>
                <View className='flex justify-center items-center  mt-10 mb-10'>
                   
                        <Image className="  h-20 w-20" source={apple} />

                   

                </View>
            </View>


            <View className='flex-1 bg-white '>
                <View className='p-2  gap-1'>
                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between'
                     onPress={() => Linking.openURL('mailto:akshaykrishnam70@gmail.com')}  >
                        <Text className=' text-black ml-10  text-base  '>
                            Contact us about your order

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between' 
                     onPress={() => Linking.openURL('mailto:akshaykrishnam70@gmail.com')} >
                        <Text className=' text-black ml-10  text-base  '>
                            Send us some app feedback

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between'
                    onPress={() => Linking.openURL('https://play.google.com/store/apps')}  >
                        <Text className=' text-black ml-10  text-base  '>
                            Rate us on the App Store

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity className='py-5  bg-slate-50  flex  flex-row justify-between'onPress={() => navigation.navigate('Cookies')}  >
                        <Text className=' text-black ml-10  text-base  '>
                            Cookie Settings

                        </Text>
                        <ChevronRightIcon size={30} color="red" />
                    </TouchableOpacity>



                </View>

                <Text className="text-gray-700 text-lg text-center mt-5 font-medium mb-4">
                    @2024 MDX FOOD
                </Text>

                <View className='flex flex-row gap-3 items-center justify-center'>
                <Text className=" text-red-600 text-md text-center mt-5 font-medium mb-4">
                    Terms and Condition
                </Text>
                <Text className="text-red-600 text-md text-center mt-5 font-medium mb-4">
                    Privacy Policy
                </Text>

                </View>


            </View>

        </View>
    )
}

export default AboutScreen
