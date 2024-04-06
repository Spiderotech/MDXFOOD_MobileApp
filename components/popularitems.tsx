import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsByRestaurantId, deleteCart } from '../slices/cartSlice';
import { setRestaurant } from '../slices/restaurantSlice';

import * as Icon from 'react-native-feather';

export default function Popularitems({ food, restaurantId, restaurantData }) {
    const navigation = useNavigation();
    const [selectedExtras, setSelectedExtras] = useState([]);

    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemsByRestaurantId(state, restaurantId));

    const handleIncrease = () => {

        dispatch(setRestaurant(restaurantData));

        dispatch(addToCart({ restaurantId: restaurantId, item: { ...food } }));
    };



    const handleDecrease = () => {
        const cartItemCount = totalItems.filter(item => item._id === food._id).length;

        if (cartItemCount === 1) {

            dispatch(deleteCart({ restaurantId: restaurantId }));
        } else {
            dispatch(removeFromCart({ restaurantId: restaurantId, itemId: food._id }));
        }
    };




    const handleSelectExtra = (extra) => {
        if (selectedExtras.find((selected) => selected === extra)) {
            setSelectedExtras(selectedExtras.filter((selected) => selected !== extra));
        } else {
            setSelectedExtras([...selectedExtras, extra]);
        }
    };

    const handlePress = () => {

        const restaurant = restaurantData;
        const fooddata = food
        const Id = restaurantId;

        navigation.navigate('Fooddetails', { restaurant, fooddata, Id });
    };

    return (
        <View className=" mt-3  w-[90%]  bg-white  rounded-lg shadow">
            <TouchableOpacity className=" w-full    flex flex-row   p-2 " onPress={handlePress}  >
                <Image
                    style={{ width: 90, height: 100 }}
                    className=" rounded-lg shadow"
                    src={food.image}
                />
                <View className="flex flex-col ml-5 w-52 ">
                    <View className="w-full ">
                        <Text className="mt-2 text-xl">{food.name}</Text>
                        <Text className="mt-2 text-md">{food.description}</Text>
                        <View className="mt-3">
                            <Text className="mt-2 mb-3 font-medium text-start text-black text-md">
                                Extra items
                            </Text>
                            {food.extraItems.map((item, index) => (
                                 <Text className='mb-3'>
                                 {item.name}   £{item.price}
                             </Text>
                                
                            ))}
                        </View>
                        <View className="flex flex-row justify-between pl-3 mt-3 mb-3 items-center">
                            <Text className="mt-2 text-black font-semibold">£{food.price}</Text>
                            <View className="flex-row items-center">
                                <TouchableOpacity onPress={handleDecrease} className="P-1 rounded-full bg-red-500"  disabled={totalItems.filter(item => item._id === food._id).length === 0}>
                                    
                                        <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                   
                                </TouchableOpacity>
                                <Text className="px-3 ">{totalItems.filter(item => item._id === food._id).length}</Text>
                                <TouchableOpacity onPress={handleIncrease} className="P-1 rounded-full bg-red-500">
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}


