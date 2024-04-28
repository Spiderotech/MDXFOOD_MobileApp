
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftCircleIcon, PlusIcon, MinusIcon, ArchiveBoxXMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectCartItemsByRestaurantId, selectCartTotalByRestaurantId, deleteCart } from '../slices/cartSlice';
import { selectRestaurant } from '../slices/restaurantSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icon from "react-native-feather";
import axios from "../Utils/orders/axios"

const CartScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const restaurantId = restaurant._id
    const totalItems = useSelector(state => selectCartItemsByRestaurantId(state, restaurantId));
    const cartTotal = useSelector(state => selectCartTotalByRestaurantId(state, restaurantId));
    const [groupItems, setGroupItems] = useState({})
    const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);


    console.log(totalItems);



    useEffect(() => {
        const items = totalItems.reduce((group, item) => {
            if (group[item._id]) {
                group[item._id].push(item);
            } else {
                group[item._id] = [item]
            }
            return group
        }, {})
        setGroupItems(items)

    }, [])




    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setUserData(userData);
                }


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

    const handleDeleteCart = async () => {
        try {

            dispatch(deleteCart({ restaurantId }));
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    };



    const handleCheckout = async () => {
        try {
            if (isLoggedIn) {
                const uniqueItemIds = new Set(totalItems.map(item => item._id));
                const items = [...uniqueItemIds].map(itemId => {
                    const mainItem = totalItems.find(item => item._id === itemId);
                    const extraItems = mainItem.extras.map(extra => ({ id: extra._id, name: extra.name, price: extra.price }));
                    return {
                        id: mainItem._id,
                        name: mainItem.name,
                        price: mainItem.price,
                        quantity: groupItems[mainItem._id].length,
                        extras: extraItems
                    };
                });
                const body = {
                    restaurantId: restaurant._id,
                    userId: userData.userId,
                    items: items,
                    totalPrice: cartTotal
                    
                };

                console.log(body);
                
                const response = await axios.post('/order', body);


                if (response.data.status) {

                    handleDeleteCart()

                    navigation.navigate('Payment');
                } else {
                    console.error('Error creating order:', response.data.message);
                }




            } else {
                navigation.navigate('Auth');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        if (totalItems.length === 0) {
            const timer = setTimeout(() => {
                handleDeleteCart();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [totalItems]);

    return (

        <View className='flex-1 bg-red-600'>
            <SafeAreaView className=' flex mt-4'>
                <View className=' flex-row justify-start mt'>
                    <TouchableOpacity className=' ml-4 mt-3' onPress={() => navigation.goBack()}>
                        <ArrowLeftCircleIcon size={30} color="white" />

                    </TouchableOpacity>
                    <View className=' ml-2  flex-col '>
                        <View className='flex-row justify-between flex   w-[90%]'>
                            <Text className='text-white  font-medium  text-lg mt-3 '>
                                Your Cart

                            </Text>
                            <TouchableOpacity className=' ml-4 mt-3' onPress={handleDeleteCart} >
                                <ArchiveBoxXMarkIcon size={30} color="white" />

                            </TouchableOpacity>

                        </View>





                    </View>



                </View>


            </SafeAreaView>

            <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>

                <Text className="text-center text-lg text-black mt-2 " > {restaurant.name}</Text>
                <View className=" flex-row px-10 items-center  h-20 rounded-tl-3xl">
                    <Image
                        className="rounded-lg shadow w-10 h-10 ml-9"
                        src={restaurant.restaurantImage}
                    />
                    <Text className="flex-1 pl-4 font-semibold">
                        Prepare in 20-30 minute

                    </Text>

                </View>

                {totalItems.length === 0 ? (

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Your cart is empty</Text>
                    </View>


                ) : (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 50
                            }}
                            className="bg-white pt-5"
                        >
                            {Object.entries(groupItems).map(([key, items]) => {
                                let mainItem = items[0];
                                return (
                                    <View key={key} className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md shadow-gray">
                                        <Text className="font-bold text-black">{totalItems.filter((item) => item._id === mainItem._id).length}x</Text>
                                        <Image className="h-11 w-10 rounded-full" src={mainItem.image} />
                                        <View className="flex-1">
                                            <View className='flex flex-row ml-3'>
                                            <Text className="font-bold mt-1 text-gray-700  ">{mainItem.name}</Text>
                                            <Text className=" ml-5 font-semibold text-base ">£ {mainItem.price}</Text>

                                            </View>
                                            {mainItem.extras.map(extraItem => (
                                                <Text key={extraItem._id} className="text-gray-500 ml-2 mt-1"> {extraItem.name}   £ {extraItem.price}</Text>
                                            ))}
                                        </View>
                                        
                                        <TouchableOpacity onPress={() => dispatch(removeFromCart({ restaurantId: restaurantId, itemId: mainItem._id }))} className="p-1 rounded-full bg-red-500">
                                            <Icon.Minus strokeWidth={2} height={15} width={15} stroke="white" />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}

                        </ScrollView>

                        {/* Cart totals */}
                        <View className="p-6 px-8  space-y-4 bg-white">
                            <View className="flex-row justify-between">
                                <Text className="text-zinc-700">Subtotal</Text>
                                <Text className="text-zinc-700">£{cartTotal}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-zinc-700 font-extrabold">Order Total</Text>
                                <Text className="text-zinc-700 font-extrabold">£{cartTotal}</Text>
                            </View>
                            <View >
                                <TouchableOpacity

                                    onPress={() => handleCheckout()}


                                    className="bg-red-600  h-14 justify-center rounded-full mb-5">
                                    <Text className="text-white text-center font-bold text-lg">

                                        Make Payment

                                    </Text>

                                </TouchableOpacity>

                            </View>
                        </View>
                    </>

                )}



            </View>

        </View>

    )
}

export default CartScreen


