import React, { useEffect, useState } from 'react'
import { ShoppingBagIcon, UsersIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'

import { View, Text, SafeAreaView, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Itemcard from '../components/Itemcard'
import { useNavigation } from '@react-navigation/native'
import axios from "../Utils/restaurant/axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsByRestaurantId ,deleteCart} from '../slices/cartSlice';
import SkeletonLoader from '../components/SkeletonLoader'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [resturant, setresturant] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const cartItems = useSelector(state => state.cart.carts);
    const restaurantIds = Object.keys(cartItems);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    const calculateTotalItems = () => {
        let total = 0;
        
        for (const restaurantId in cartItems) {
            const items = cartItems[restaurantId];
            total += items.length; 
        }
        return total;
    };
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuthentication();
    }, []);




    const handleShoppingIconPress = () => {
        if (restaurantIds.length > 0) {

            navigation.navigate('Cart', { restaurantId: restaurantIds[0] });
        } else {

            console.log('Cart is empty');
        }
    };



    const handleAccount = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                navigation.navigate('Account');
            } else {
                navigation.navigate('Auth');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

   



    useEffect(() => {

        axios
            .get("/getallresturant")
            .then((response) => {

                setresturant(response.data.allresturant);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);
    console.log(resturant, "data");

    return (
        <SafeAreaView>
            <SafeAreaView className=" bg-red-600  rounded-b-3xl ">
                <StatusBar barStyle="dark-content" />
                <View className="flex-row items-center flex justify-between space-x-2 px-4 pb-3  mt-4">
                    <Text className="text-white font-semibold text-xl">MDX FOOD</Text>
                    <View className='flex-row'>
                    {Object.keys(cartItems).every(restaurantId => cartItems[restaurantId].length === 0) ? null : (
                                <View className='relative'>
                                <TouchableOpacity
                                    className='bg-white p-2 rounded-full ml-4 mt-3'
                                    onPress={handleShoppingIconPress}>
                                    <ShoppingBagIcon size={20} color='red' />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: 4, right: -3, backgroundColor: 'white', borderRadius: 10, minWidth: 15, minHeight: 15, justifyContent: 'center', alignItems: 'center', borderColor:'red' }}>
                                <Text style={{ color: 'red', fontSize: 10 }}>{calculateTotalItems()}</Text>
                            </View>
                        </View>
                            )}
                           
                        <TouchableOpacity className=' bg-white p-2 rounded-full ml-4 mt-3'
                            onPress={() => handleAccount()}

                        >
                            <UsersIcon size={20} color="red" />

                        </TouchableOpacity>

                    </View>


                </View>

                <View className="flex-row items-center flex justify-between space-x-2 px-4 pb-3  mt-4 mb-10">
                    <TouchableOpacity className='flex-row flex-1 p-3 items-center rounded-full bg-white border border-gray-50' onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={20} color="red" />
                        <Text className=' ml-3 flex-1' >Restaurants, dishes</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView>
                <View className=" w-full mb-36 ">
                    <View className="flex flex-row m-4 items-center">
                        <Text className="text-lg font-semibold">Nearby </Text>
                    </View>

                    <ScrollView className='mb-10' showsVerticalScrollIndicator={false}>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)
                        ) : resturant.length === 0 ? (
                            <View className='flex justify-center items-center mt-40'>
                                 <Text >No restaurants found</Text>

                            </View>
                           
                        ):(
                            resturant.map((restaurants, index) => (
                                <Itemcard key={index} restaurant={restaurants} />
                            ))
                        )}
                         
                    </ScrollView>


                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen
