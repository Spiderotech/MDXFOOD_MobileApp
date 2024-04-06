import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';
import axios from '../Utils/user/axios'


const PhoneverificationScreen = () => {
    const route = useRoute();
    const { email } = route.params;

   
    

    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation()

    const validatePhoneNumber = () => {
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError('Invalid phone number');
            return false;
        }
        setError('');
        return true;
    };



    const sendVerificationCode = async () => {
        if (!validatePhoneNumber()) return;
        try {
           
            const response = await axios.post('/verifyphone', { phone:phoneNumber });
            console.log(response.data);
            
            if (response.data.status===true) {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                navigation.navigate('Otp', { confirmation, phoneNumber,email });
            } else {
                setError("phone number already exsist"); 
            }
        } catch (error) {
            console.error('Error verifying phone number:', error);
            setError('Error verifying phone number');
        }
    };

    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' bg-white p-3 rounded-full ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <XMarkIcon size={20} color="red" />

                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  items-center'>

                        <Text className='text-white  font-medium text-center text-lg '>
                            Verify phone number

                        </Text>

                    </View>

                </View>
                <View className=' flex justify-center '>


                    <Text className='text-white  font-medium text-center text-base p-10'>
                        You're one step away from the delicious food being to order

                    </Text>

                </View>


            </SafeAreaView>
            <View className='flex-1 bg-white px-10   rounded-tl-3xl '>
                <View className=' mt-48'>

                    <View className='form  space-y-2'>
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Phone number

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber} 
                            placeholder='Enter phone'
                            keyboardType="phone-pad"
                        />
                        {error ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{error}</Text> : null}



                    </View>

                    <TouchableOpacity className='py-3  bg-red-600 rounded-xl mt-5' onPress={sendVerificationCode}>
                        <Text className=' text-white  text-base text-center'>
                            Send verification code

                        </Text>



                    </TouchableOpacity>



                </View>


            </View>





        </View>
    )
}

export default PhoneverificationScreen
