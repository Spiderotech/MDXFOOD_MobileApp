import React from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import apple from "../assets/images/apple-pay.png";
import paypal from "../assets/images/paypal.png";



const PaymentScreen = () => {
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
                            Payments

                        </Text>


                    </View>

                </View>


            </SafeAreaView>

            <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>
                <View className='p-5 '>

                    <View className="flex justify-center items-center  mt-3 w-full border rounded-lg bg-slate-50 ">
                        <TouchableOpacity onPress={() => navigation.navigate('Ordersucess')}>
                            <Image className="  h-14 w-20" source={paypal} />
                        </TouchableOpacity>
                    </View>
                    <View className="flex justify-center items-center  mt-3 w-full border rounded-lg bg-slate-50 ">
                        <TouchableOpacity onPress={() => navigation.navigate('Ordersucess')}>
                            <Image className="  h-14 w-20" source={apple} />
                        </TouchableOpacity>
                    </View>

                    


                </View>


            </View>






        </View>
    )
}

export default PaymentScreen
