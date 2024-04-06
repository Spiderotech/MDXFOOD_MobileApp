import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeftCircleIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "../Utils/user/axios"

const NewpasswordScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = async () => {
        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        } else if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError('Password must be at least 6 characters long and contain special characters');
            return;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else {
            setConfirmPasswordError('');
        }

        try {
            const response = await axios.post('/upadtepassword', { email:email,password:password });
                console.log(response.data);
                if(response.data.status === true){

                    navigation.navigate('Email')

        

                }else{
                    setConfirmPasswordError(response.data.message);

                }
        } catch (error) {
            console.error('Error changing password:', error);
            
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
                            Change password
                        </Text>
                    </View>
                    <View className=' flex justify-center '>
                        <Text className='text-white  font-medium text-center text-base p-10'>
                            Hi {email}, change your password here..
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <View className='flex-1 bg-white px-10 mt-10 rounded-tl-3xl '>
                <View className=' mt-48'>
                    <Text className='text-gray-500 ml-4 text-base'>
                        New Password
                    </Text>
                    <View className='flex-row flex justify-between items-center p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'>
                        <TextInput
                            className='w-[80%]'
                            value={password}
                            placeholder='Enter password'
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon size={15} color="red" /> : <EyeSlashIcon size={15} color="red" />}
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{passwordError}</Text> : null}
                    <Text className='text-gray-500 ml-4 text-base'>
                        Confirm Password
                    </Text>
                    <View className='flex-row flex justify-between items-center p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'>
                        <TextInput
                            className='w-[80%]'
                            value={confirmPassword}
                            placeholder='Confirm password'
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon size={15} color="red" /> : <EyeSlashIcon size={15} color="red" />}
                        </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{confirmPasswordError}</Text> : null}
                    <TouchableOpacity className='py-3 bg-red-600 rounded-xl mt-5' onPress={handleChangePassword}>
                        <Text className='text-white text-base text-center'>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default NewpasswordScreen;
