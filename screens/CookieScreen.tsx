import React from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import apple from "../assets/images/MDXFOOD.png";

const CookieScreen = () => {
    const navigation = useNavigation()
    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size={30} color="white" />

                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  mb-10 '>

                        <Text className='text-white  font-medium  text-lg mt-2 '>
                            Cookies

                        </Text>


                    </View>

                </View>


            </SafeAreaView>

            <View className='  bg-white h-auto  rounded-tl-3xl '>
                <View className='flex justify-center items-center  mt-20 mb-5'>

                    <Image className="  h-20 w-20" source={apple} />



                </View>
            </View>
            <View className='flex-1 bg-white p-4  items-center'>
                <Text className="text-gray-700 text-lg font-medium mb-4">
                    Manage Cookie Settings
                </Text>
                <Text className="text-gray-600 mb-4 text-md text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit augue ut velit rutrum, sed congue lectus ultricies.
                </Text>

                <Text className="text-gray-600 mb-4 text-md text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit augue ut velit rutrum, sed congue lectus ultricies.
                </Text>
                
                <TouchableOpacity className=' bg-red-600 py-3 px-6 rounded-md'onPress={() => navigation.navigate('Account')}>
                    <Text className=' text-white font-medium'>
                        Manage Cookies
                    </Text>
                </TouchableOpacity>
            </View>





        </View>
    )
}

export default CookieScreen
