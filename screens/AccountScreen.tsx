import React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import {UserCircleIcon,BookOpenIcon,QuestionMarkCircleIcon,CreditCardIcon,ArrowLeftStartOnRectangleIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
    const navigation=useNavigation()

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size={30} color="white" />

                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  '>

                        <Text className='text-white  font-medium  text-lg mt-2 '>
                            Account

                        </Text>
                    </View>

                </View>


            </SafeAreaView>

            <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>
                <View className='p-5 '>
                    <TouchableOpacity className='py-5 bg-slate-300 rounded-tl-3xl flex flex-row'  onPress={() => navigation.navigate('Profile')} >
                        <View className='ml-10'>
                        <UserCircleIcon size={30} color="white" className='ml-5'/>

                        </View>
                        
                        <Text className=' text-black ml-10  text-base  '>
                            Profile

                        </Text>
                         



                    </TouchableOpacity>
                   
                    <TouchableOpacity className='py-5 bg-slate-300  flex-row  mt-2'  onPress={() => navigation.navigate('Orders')} >
                    <View className='ml-10'>
                    <BookOpenIcon size={30} color="white" />

                    </View>
                   
                        <Text className=' text-black ml-10 text-base '>
                        My Orders

                        </Text>
                         
                    </TouchableOpacity>
                    <TouchableOpacity className='py-5 bg-slate-300  flex-row  mt-2'   onPress={() => navigation.navigate('Home')}>
                    <View className='ml-10'>
                    <CreditCardIcon size={30} color="white" className='ml-10'/>

                    </View>
                   
                        <Text className=' text-black ml-10 text-base '>
                        Payments 

                        </Text>
                         

                    </TouchableOpacity>
                    <TouchableOpacity className='py-5 bg-slate-300  flex-row  mt-2'   onPress={() => navigation.navigate('Help')}>
                    <View className='ml-10'>
                    <QuestionMarkCircleIcon size={30} color="white" className='ml-10'/>

                    </View>
                   
                        <Text className=' text-black ml-10 text-base '>
                        Help

                        </Text>
                         

                       

                    </TouchableOpacity>
                    <TouchableOpacity className='py-5 bg-slate-300  flex-row  mt-2'  onPress={() => handleLogout()}>
                    <View className='ml-10'>
                    <ArrowLeftStartOnRectangleIcon size={30} color="white" className='ml-10'/>

                    </View>
                  
                        <Text className=' text-black ml-10 text-base '>
                        Logout

                        </Text>
                         

                       

                    </TouchableOpacity>




                </View>


            </View>





        </View>
    )
}

export default AccountScreen
