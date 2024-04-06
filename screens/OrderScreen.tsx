import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from "../Utils/orders/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = () => {
    const navigation = useNavigation();
    const [activeView, setActiveView] = useState('pending');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [userData, setUserData] = useState(null);
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    const user = JSON.parse(userDataString);
                    setUserData(user);
                    console.log(user.userId);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData && userData.userId) {
            const fetchOrders = async () => {
                try {
                    const pendingResponse = await axios.get(`/getallpendingorder?id=${userData.userId}`);
                    console.log(pendingResponse.data.orderdata);
                    setPendingOrders(pendingResponse.data.orderdata);
                    const completedResponse = await axios.get(`/getallcompleteorder?id=${userData.userId}`);
                    console.log(completedResponse.data.orderdata);
                    setCompletedOrders(completedResponse.data.orderdata);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };

            fetchOrders();
        }
    }, [userData]);

    useEffect(() => {
        const updateTimers = () => {
            setTimers(prevTimers => {
                const newTimers = { ...prevTimers }; // Copy previous timers
                pendingOrders.forEach(order => {
                    if (order.status === 'confirmed') {
                        const remainingTime = calculateRemainingTime(order.updatedAt);
                        newTimers[order.orderId] = remainingTime;
                    }
                });
                return newTimers; // Return updated timers
            });
        };

        updateTimers();
        const timerInterval = setInterval(updateTimers, 1000);

        return () => clearInterval(timerInterval);
    }, [pendingOrders]);

    const calculateRemainingTime = (updatedAt) => {
        const updatedAtTime = new Date(updatedAt).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = Math.floor((currentTime - updatedAtTime) / 1000);
        const remainingTime = 15 * 60 - timeDifference; // 15 minutes in seconds
        return remainingTime > 0 ? remainingTime : 0;
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
                            Orders
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <View className='flex-1 bg-white   mt-10 rounded-tl-3xl '>
                <View className='flex-row  flex '>
                    <TouchableOpacity
                        className="  h-10 justify-center rounded-tl-3xl border border-red-600 w-[50%] mb-5"
                        onPress={() => setActiveView('pending')}>
                        <Text className="text-black text-center font-bold text-md">
                            Pending
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="  h-10 justify-center w-[50%] border border-red-600 mb-5"
                        onPress={() => setActiveView('completed')}>
                        <Text className="text-black text-center font-bold text-md">
                            Completed
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='flex-1'>
                    {activeView === 'pending' ? (
                        <View className=' h-auto p-2'>
                            {pendingOrders.length === 0 ? (
                                <Text>No pending orders found</Text>
                            ) : (
                                <>
                                    {pendingOrders.map((order, index) => (
                                        <View key={index} className="flex justify-center items-center mt-3">
                                            <TouchableOpacity
                                                style={{
                                                    width: '100%',
                                                    borderRadius: 10,
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                    backgroundColor: '#fff',
                                                }}
                                            >
                                                <View className="flex flex-col mb-3 p-2">
                                                    <Text className="mt-2 ml-2 text-md">{order.orderId}</Text>
                                                    <Text className="mt-2 ml-2 text-lg">{order.restaurantId.name}</Text>
                                                    {order.items.map((item, index) => (
                                                        <View key={index} className="mt-2 ml-2 flex-row ">
                                                            <Text className="font-normal">{item.name}</Text>
                                                            <Text className="ml-5">x{item.quantity}</Text>
                                                        </View>
                                                    ))}
                                                    <Text className="mt-2 ml-2 font-medium">£{order.totalPrice}</Text>
                                                    <View className='flex flex-row justify-between mt-2'>
                                                        <Text className="mt-1 ml-2 text-gray-500">{new Date(order.createdAt).toLocaleString()}</Text>
                                                        {order.status === 'pending' && (<View className='flex items-center justify-center rounded-lg p-1' style={{ borderColor: order.status === 'complete' ? 'green' : 'red', borderWidth: 1 }}>
                                                            <Text style={{ color: order.status === 'confirmed' ? 'green' : 'red' }}>{order.status}</Text>
                                                        </View>)}

                                                        {order.status === 'confirmed' && (
                                                            <View className='flex items-center justify-center rounded-lg p-1' style={{ borderColor: order.status === 'confirmed' ? 'green' : 'red', borderWidth: 1 }}>
                                                                <Text style={{ color: order.status === 'confirmed' ? 'green' : 'red' }}>
                                                                    {timers[order.orderId] ? `Estimated Time: ${Math.floor(timers[order.orderId] / 60)}:${(timers[order.orderId] % 60).toString().padStart(2, '0')}` : 'Ready to Serve'}
                                                                </Text>
                                                            </View>

                                                        )}
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </>

                            )}

                        </View>
                    ) : (
                        <View className=' p-2 h-auto'>
                            {completedOrders.length === 0 ? (
                                <Text>No completed orders found</Text>
                            ) : (
                                <>
                                    {completedOrders.map((order, index) => (
                                        <View key={index} className="flex justify-center items-center mt-3">
                                            <TouchableOpacity
                                                style={{
                                                    width: '100%',
                                                    borderRadius: 10,
                                                    shadowColor: '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                    backgroundColor: '#fff',
                                                }}
                                            >
                                                <View className="flex flex-col mb-3 p-2">
                                                    <Text className="mt-2 ml-2 text-md">{order.orderId}</Text>
                                                    <Text className="mt-2 ml-2 text-lg">{order.restaurantId.name}</Text>
                                                    {order.items.map((item, index) => (
                                                        <View key={index} className="mt-1 ml-2 flex-row ">
                                                            <Text className="font-medium">{item.name}</Text>
                                                            <Text className="mr-2">x{item.quantity}</Text>
                                                        </View>
                                                    ))}
                                                    <Text className="mt-1 ml-2 font-medium">£{order.totalPrice}</Text>
                                                    <View className='flex flex-row justify-between mt-2'>
                                                        <Text className="mt-1 ml-2 text-gray-500">{new Date(order.createdAt).toLocaleString()}</Text>
                                                        <View className='flex items-center justify-center rounded-lg p-1' style={{ borderColor: order.status === 'complete' ? 'green' : 'red', borderWidth: 1 }}>
                                                            <Text style={{ color: order.status === 'complete' ? 'green' : 'red' }}>{order.status}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </>

                            )}

                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

export default OrderScreen;
