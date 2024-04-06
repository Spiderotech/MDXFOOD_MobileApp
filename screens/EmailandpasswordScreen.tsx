import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from "../Utils/user/axios"
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EmailandpasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [emailExistsgoogle, setEmailExistsgoogle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

   

    
    

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "27273793549-pioep06c9kg5cv30s63b4o9r1g2s6hv5.apps.googleusercontent.com",
            iosClientId: "27273793549-d0d78sqt9g7a6p4kk6pur2cb6hglc33t.apps.googleusercontent.com",

        });


    }, [])

    async function onGoogleButtonPress() {
        try {

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            const { user } = await auth().signInWithCredential(googleCredential);
            console.log('User displayName:', user.displayName);
            console.log('User email:', user.email);
            try {

                
                    const fcmToken = await AsyncStorage.getItem('fcmToken');
                    console.log(fcmToken, "Token fetched from AsyncStorage");
               
          

                const email = user.email

                const response = await axios.post('/googlelogin', { email: email,fcmtoken:fcmToken });

                if (response.data.status === true) {

                    await AsyncStorage.setItem('accessToken', response.data.accessToken);
                    await AsyncStorage.setItem('userData', JSON.stringify(response.data.isuser));

                    navigation.navigate('Home');


                } else {

                    setEmailError('Error login user');




                }

            } catch (error) {
                console.error('Error creating user:', error);

            }



        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    }

    const handleContinue = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;

        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!hasError && email.trim()) {
            try {
               

                const response = await axios.post('/verifyemail', { email: email });
                console.log(response.data);

                const exists = response.data.user?.google === true;
                const existss = response.data.user?.google === false;

                if (existss) {
                    setEmailExists(true);
                } else if (exists) {
                    setEmailError('User created account using Google');
                    setEmailExistsgoogle(true)

                } else {
                    navigation.navigate('Phone', { email: email });
                }


            } catch (error) {
                console.error('Error checking email:', error);
            }
        }
    };

    const handlelogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasError = false;

        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        } else {
            setEmailError('');
        }


        if (!password.trim()) {
            setPasswordError('Password is required');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            try {

               
                    var fcmToken = await AsyncStorage.getItem('fcmToken');
                    console.log(fcmToken, "Token fetched from AsyncStorage");
               

              
                const response = await axios.post('/login', { email: email, password: password,fcmtoken:fcmToken });
                console.log(response.data);
                if (response.data.status === true) {
                    await AsyncStorage.setItem('accessToken', response.data.accessToken);
                    await AsyncStorage.setItem('userData', JSON.stringify(response.data.isuser));

                    navigation.navigate('Home');

                } else {
                    setPasswordError('Invalid password ..');


                }


            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };


    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' bg-white p-3 rounded-full ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={20} color="red" />
                    </TouchableOpacity>
                    <View className=' flex justify-center ml-5  items-center'>
                        <Text className='text-white  font-medium text-center text-lg '>
                            Sign up or log in with email
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <View className='flex-1 bg-white px-10  mt-10  rounded-tl-3xl '>
                <View className=' mt-36'>
                    <View className='form  space-y-2'>
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Email address
                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={email}
                            placeholder='Enter email..'
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                        {emailError ? <Text style={{ color: 'red', marginLeft: 10, marginBottom: 5 }}>{emailError}</Text> : null}

                        {emailExistsgoogle && (
                            <>
                                <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Light}
                                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                                    className='mt-3'
                                />
                            </>
                        )}
                        {emailExists && (
                            <>
                                <Text className=' text-gray-500 ml-4 text-base'>
                                    Password
                                </Text>
                                <View className='flex-row  flex justify-between items-center p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'>
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

                                {passwordError ? <Text style={{ color: 'red', marginLeft: 10 }}>{passwordError}</Text> : null}
                            </>
                        )}
                    </View>
                    {emailExists ? (<TouchableOpacity className='py-3 bg-red-600 rounded-xl mt-5' onPress={() => handlelogin()}>
                        <Text className='text-white text-base text-center'>
                            Log in
                        </Text>
                    </TouchableOpacity>) : (
                        <TouchableOpacity className='py-3 bg-red-600 rounded-xl mt-5' onPress={() => handleContinue()}>
                            <Text className='text-white text-base text-center'>
                                Continue
                            </Text>
                        </TouchableOpacity>

                    )}

                    {emailExists && (
                        <TouchableOpacity className='flex items-end mb-5 mt-5' onPress={() => navigation.navigate('Emailverification',{useremail:email})}>
                            <Text className='text-black text-base text-center'>
                                Forgot password
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

export default EmailandpasswordScreen;
