import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import Popularitems from '../components/popularitems';
import { useEffect, useState } from 'react'
import axios from "../Utils/restaurant/axios"
import CartIcon from '../components/carticon';
import { ArrowLeftCircleIcon, QrCodeIcon, ClockIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import SkeletonLoader from '../components/SkeletonLoader'
import {  selectCartItemsByRestaurantId ,deleteCart} from '../slices/cartSlice';
import { useSelector } from 'react-redux';

/*------------------------------------------------------------------------------Restaurant screen  start ------------------------------------------------------------------------------------- */

export default function RestaurentScreen({ route }) {
    const navigation = useNavigation()
    const { restaurantData } = route.params;
    const dispatch = useDispatch()
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalItems = useSelector(state => selectCartItemsByRestaurantId(state, id));
    const cartItems = useSelector(state => state.cart.carts);
    const restaurantIds = Object.keys(cartItems);

    console.log(restaurantIds,"cart idssss in restaurant");


    const id = restaurantData._id

    const data=restaurantData

    

    useEffect(() => {

        const fetchFoodData = async () => {
            try {
                const response = await axios.get("/getallfood?id=" + id);
                setFood(response.data.fooddata);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchFoodData();
    }, [restaurantData]);



    return (
        <View className='h-screen '>


            <View className="relative">
                <Image className=" w-full h-60"
                    src={restaurantData.restaurantImage}
                />
                <TouchableOpacity
                    className="absolute top-10 left-4  mt-3  rounded-lg flex justify-center items-center"
                    onPress={() => navigation.goBack()}

                >
                    <ArrowLeftCircleIcon size={40} color="red" />

                </TouchableOpacity>

            </View>
            <View className=" bg-white w-full  h-auto rounded-tl-3xl rounded-br-3xl shadow -mt-12 p-3  ">
                <View className="w-full h-10  mt-4 flex flex-row  ">
                    <View className="flex flex-row justify-center items-center">
                        <Text className=" ml-4 font-semibold text-2xl">{restaurantData.name}</Text>


                    </View>


                </View>
                <View className="w-full  mt-4 flex flex-row  ">
                    <View className='ml-2 mt-1 '>
                        <MapPinIcon size={20} color='red' />

                    </View>
                    <Text className=" ml-2 font-medium text-gray-500 text-xl">{restaurantData.location}</Text>

                </View>
                <View className="w-full mt-2   flex flex-row  ">
                    <View className='ml-2 mt-2'>
                        <ClockIcon size={20} color='red' />

                    </View>
                    <Text className="mt-2 ml-2 font-semibold text-md mb-10">15-30 Minutes(Preparation time )</Text>

                </View>




            </View>
            <ScrollView className='mb-10'  >
                <View className="flex justify-center items-center mb-14  ">
                   

                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)
                    ) : (
                        food.map((foods, index) => (
                            <Popularitems key={index} food={foods} restaurantId={id} restaurantData={data} />
                        ))
                    )}

                </View>

            </ScrollView>

            <CartIcon restaurantId={id} />
        </View>
    )
}
/*------------------------------------------------------------------------------Restaurant  screen  end ------------------------------------------------------------------------------------- */