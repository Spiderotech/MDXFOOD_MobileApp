import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from '../Utils/user/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const GoogleloginScreen = () => {
    const navigation = useNavigation()

useEffect(()=>{
    GoogleSignin.configure({
        webClientId:"27273793549-pioep06c9kg5cv30s63b4o9r1g2s6hv5.apps.googleusercontent.com",
        iosClientId: "27273793549-d0d78sqt9g7a6p4kk6pur2cb6hglc33t.apps.googleusercontent.com",
    
      });


},[])


async function onGoogleButtonPress() {
    try {

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        const { user } = await auth().signInWithCredential(googleCredential);
        console.log('User displayName:', user.displayName);
        console.log('User email:', user.email);

        try {

            const email= user.email
            const name=user.displayName

            const fcmToken = await AsyncStorage.getItem('fcmToken');
            console.log(fcmToken, "Token fetched from AsyncStorage");
          
            const response = await axios.post('/googlelogin', { email: email,fcmtoken:fcmToken });

            console.log(response.data);
            
    
            if(response.data.status === true){
                
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('userData', JSON.stringify(response.data.isuser));

                navigation.navigate('Home');
               
               
            }else{

                navigation.navigate('Googlephone',{email,name})
               
               


            }
    
        } catch (error) {
            console.error('Error creating user:', error);
        
        }



       

      
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
}

    return (

        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' bg-white p-3 rounded-full ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={20} color="red" />


                    </TouchableOpacity>

                </View>
                <View className=' flex justify-center mt-5'>
                    <Text className='text-white  font-bold text-center text-3xl'>
                        MDX FOOD

                    </Text>
                    <Text className='text-white  font-medium text-center text-lg p-10'>
                        You're one step away from the delicious food being to order

                    </Text>

                </View>

            </SafeAreaView>
            <View className='flex-1 bg-white px-8 pt-8  rounded-tl-full   '>
                <View className=' mt-32 flex justify-center items-center'>
                    <GoogleSigninButton
                  
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    />
                    <Text className=' text-xl text-black  font-semibold text-center py-5'>
                        or

                    </Text>
                    <TouchableOpacity className='py-3  bg-white flex justify-between ' onPress={() => navigation.navigate('Email')} >
                        <Text className='text-red-600 ml-3  font-medium text-center text-lg'>

                            Continue with email


                        </Text>


                    </TouchableOpacity>
                </View>


            </View>





        </View>


    )
}

export default GoogleloginScreen
