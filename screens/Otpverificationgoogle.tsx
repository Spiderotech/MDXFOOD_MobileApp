import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import axios from '../Utils/user/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otpverificationgoogle = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const { confirmation, fullPhoneNumber ,email,name} = route.params;


    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => (prevTimer === 0 ? 60 : prevTimer - 1)); 
        }, 1000);

        return () => clearInterval(interval); 
    }, []);

    async function confirmCode() {
        try {
            await confirmation.confirm(code);

            try {
                const fcmToken = await AsyncStorage.getItem('fcmToken');
                console.log(fcmToken, "Token fetched from AsyncStorage");

                const body={
                    fullName: name,
                    email: email,
                    phoneNumber: fullPhoneNumber,
                    fcmToken:fcmToken,
                   
                }
              console.log(body);
              
                const response = await axios.post('/googlecreateuser',body);
        
                if(response.data.status === true){
                    await AsyncStorage.setItem('accessToken', response.data.accessToken);
                    await AsyncStorage.setItem('userData', JSON.stringify(response.data.isuser));
    
                    navigation.navigate('Home');
                   
                }else{
                    setError(response.data.message);
                   
    
    
                }
        
            } catch (error) {
                console.error('Error creating user:', error);
            
            }
           

        } catch (error) {
            setError('Invalid code. Please try again.');
        }
    }

    async function resendCode() {
        try {
            await auth().signInWithPhoneNumber(fullPhoneNumber);
            console.log('Resending code...');
            setError('Resending code...');
        } catch (error) {
            console.error('Error resending code:', error);
            setError('Error resending code');
        }
    }

  return (
    <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' bg-white p-3 rounded-full ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={20} color="red" />

                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  items-center'>

                        <Text className='text-white  font-medium text-center text-lg '>
                            Enter your code

                        </Text>

                    </View>

                </View>
                <View className=' flex justify-center '>


                    <Text className='text-white  font-medium text-center text-base p-10'>
                        We've sent your 6-digit code to {fullPhoneNumber}

                    </Text>

                </View>


            </SafeAreaView>
            <View className='flex-1 bg-white px-10   rounded-tl-3xl '>
                <View className=' mt-36'>

                    <View className='form  space-y-2'>
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Your code

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={code}
                            onChangeText={text => setCode(text)}
                            placeholder='Enter code'
                        />
                        {error ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{error}</Text> : null}



                    </View>

                    <TouchableOpacity className='py-3  bg-red-600 rounded-xl mt-5' onPress={() => confirmCode()} >
                        <Text className=' text-white  text-base text-center'>
                            Verify

                        </Text>



                    </TouchableOpacity>
                    <View className='flex justify-between flex-row'>
                    <TouchableOpacity className='flex items-start mb-5 mt-5' onPress={() => resendCode()}  >
                        <Text className=' text-red-600 text-base text-center ml-4'>
                            Resend code

                        </Text>

                    </TouchableOpacity>

                    </View>
                    



                </View>


            </View>





        </View>
  )
}

export default Otpverificationgoogle
