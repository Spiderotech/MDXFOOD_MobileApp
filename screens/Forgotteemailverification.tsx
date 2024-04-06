import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from "../Utils/user/axios";
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Forgotteemailverification = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { useremail } = route.params;
    const [email, setEmail] = useState(useremail);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');


    const handleContinue = async () => {
        let hasError = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        } else {
            setEmailError('');
        }
        const phoneRegex = /^\+?\d{1,3}(?:\s\d{3})?\s?\d{7,}$/; 
        if (!phoneNumber.trim()) {
            setPhoneNumberError('Phone number is required');
            hasError = true;
        } else if (!phoneRegex.test(phoneNumber.trim())) {
            setPhoneNumberError('Please enter a valid phone number with optional country code (e.g., +1 1234567890)');
            hasError = true;
        } else if (phoneNumber.trim().indexOf(' ') === -1) {
            setPhoneNumberError('Please enter a space after the country code');
            hasError = true;
        } else {
            setPhoneNumberError('');
        }

        if (!hasError && email.trim() && phoneNumber.trim()) {
            try {
                console.log(email,phoneNumber,"verfication");
                
                const response = await axios.post('/verifyemailandphone', { email: email,phone: phoneNumber });
                console.log(response.data);
                if(response.data.status === true){

                    const number=response.data.user.phone

                    const confirmation = await auth().signInWithPhoneNumber(number);
                    navigation.navigate('Forgotteotp', { confirmation,number,email });

                }else{
                    setPhoneNumberError(response.data.message);

                }


            } catch (error) {
                setPhoneNumberError(error)

            }
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
                            User verification
                        </Text>
                    </View>

                </View>
                <View className=' flex justify-center '>
                    <Text className='text-white  font-medium text-center text-base p-5'>
                        Enter your phone number for verification

                    </Text>

                </View>
            </SafeAreaView>
            <View className='flex-1 bg-white px-10   mt-10 rounded-tl-3xl '>
                <View className=' mt-36'>
                    <View className='form  space-y-2'>
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Email address
                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={useremail}
                            placeholder='Enter email..'
                            autoCapitalize='none'
                            editable={false}
                        />
                        {emailError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{emailError}</Text> : null}
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
                        {phoneNumberError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{phoneNumberError}</Text> : null}
                    </View>
                    <TouchableOpacity className='py-3  bg-red-600 rounded-xl mt-5' onPress={handleContinue}>
                        <Text className=' text-white  text-base text-center'>
                            Verify User
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Forgotteemailverification;
