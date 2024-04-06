import React,{useEffect,useState} from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
    const navigation=useNavigation()


    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserData(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
    console.log(userData);
    
    return (
        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size={30} color="white" />
                    </TouchableOpacity>
                    <View className=' flex  justify-between ml-5  flex-row '>
                        <Text className='text-white  font-medium  text-lg mt-3 '>
                            Account details
                        </Text>
                        {/* <Text className='text-white  font-medium  text-lg mt-2 ml-28 '>
                            SAVE
                        </Text> */}
                    </View>
                </View>
            </SafeAreaView>
            <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>
                <View className='p-5 '>
                    {userData && (
                        <View className='form  space-y-2'>
                            <Text className=' text-gray-500 ml-4 text-base'>
                                Full name
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                                value={userData.userName}
                            />
                            <Text className=' text-gray-500 ml-4 text-base'>
                                Email address
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                                value={userData.userEmail}
                                editable={false}
                            />
                            <Text className=' text-gray-500 ml-4 text-base'>
                                Phone number
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-4'
                                value= {userData.userPhone}
                                editable={false}
                            />
                           
                            
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen
