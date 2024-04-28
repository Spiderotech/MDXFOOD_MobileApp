import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation ,useRoute} from '@react-navigation/native'
import axios from "../Utils/user/axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserdetailsScreen = () => {
    const route = useRoute();
    const { fullPhoneNumber ,email} = route.params;
    const navigation=useNavigation()
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [nameerror, setnameError] = useState('');
    const [passworderror, setpasswordError] = useState('');

    const [fcmtoken, setFcmtoken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('fcmToken');
                console.log(token, "Token fetched from AsyncStorage");
                setFcmtoken(token);
            } catch (error) {
                console.error('Error fetching FCM token:', error);
            }
        };

        fetchToken();
    }, []);


    const createUser = async () => {
        setnameError('');
        setpasswordError('');
        
    
       
        if (!fullName.trim()) {
            setnameError('Please enter your full name');
            return;
        }
        if (!password.trim()) {
            setpasswordError('Please enter a password');
            return;
        }
        if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setpasswordError('Password must be at least 6 characters long and contain special characters');
            return;
        }
    
        if (nameerror || passworderror) {
            
            return;
        }
    
        try {
           

            const body={
                fullName: fullName,
                email: email,
                phoneNumber: fullPhoneNumber,
                password: password,
                fcmtoken:fcmtoken,
               
            }
          console.log(body);
          
            const response = await axios.post('/createuser',body);
    
            if(response.data.status === true){
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('userData', JSON.stringify(response.data.isuser));

                navigation.navigate('Home');
               
            }else{
                setpasswordError(response.data.message);
               


            }
    
        } catch (error) {
            console.error('Error creating user:', error);
        
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
                            Sign up 

                        </Text>

                    </View>

                </View>


            </SafeAreaView>
            <View className='flex-1 bg-white px-10  mt-10  rounded-tl-3xl '>
                <View className=' mt-2'>

                    <View className='form  space-y-2'>
                    <Text className=' text-gray-500 ml-4 text-base'>
                            Full name

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder='Enter fullname'
                        />
                         {nameerror ? <Text style={{ color: 'red', marginLeft: 10 }}>{nameerror}</Text> : null}
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Email address

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={email}
                            placeholder='Enter email..'
                            editable={false}
                        />
                        <Text className=' text-gray-500 ml-4 text-base'>
                            Phone

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={fullPhoneNumber}
                            placeholder='Enter phone'
                            editable={false}
                        />

                        <Text className=' text-gray-500 ml-4 text-base'>
                            Password

                        </Text>
                        <TextInput
                            className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Enter password'
                        />
                         {passworderror ? <Text style={{ color: 'red', marginLeft: 10 }}>{passworderror}</Text> : null}

                    </View>

                    <TouchableOpacity className='py-3  bg-red-600 rounded-xl mt-5'   onPress={createUser}>
                    <Text className=' text-white  text-base text-center'>
                            Create accout

                        </Text>



                    </TouchableOpacity>
                   


                </View>


            </View>





        </View>
  )
}

export default UserdetailsScreen
