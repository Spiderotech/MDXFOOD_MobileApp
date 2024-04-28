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

    console.log(selectedExtras);


    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemsByRestaurantId(state, restaurantId));



    const handleIncrease = () => {
        dispatch(setRestaurant(restaurantData));
        dispatch(addToCart({ restaurantId: restaurantId, item: { ...food, extras: selectedExtras } }));
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
            <TouchableOpacity className=" w-full    flex flex-col   p-3 " onPress={handlePress}  >

                <View className="flex flex-row w-full  ">
                    <Image
                        style={{ width: 90, height: 100 }}
                        className=" rounded-lg shadow "
                        src={food.image}
                    />
                    <View className=' w-56 ml-5 items-center justify-center '>
                        <Text className="mt-2 text-2xl font-semibold">{food.name}</Text>

                    </View>

                </View>
                <View className="flex flex-col ml-5   ">
                    <Text className="mt-2 text-md font-medium">{food.description}</Text>
                    <View className="w-[90%]">

                        <View className="mt-3">
                            <Text className="mt-2 mb-3 font-medium text-start text-black text-lg">
                                Add extras
                            </Text>
                            {food.extraItems.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelectExtra(item)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={{ fontSize: 16 }}>
                                        {item.name} - £{item.price}
                                    </Text>
                                    {selectedExtras.find(selectedExtra => selectedExtra._id === item._id) ?
                                        <Icon.CheckSquare strokeWidth={2} height={24} width={24} stroke="green" /> :
                                        <Icon.Square strokeWidth={2} height={24} width={24} stroke="grey" />
                                    }
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View className="flex flex-row justify-between  mt-4 mb-3 items-center">
                            <Text className="mt-1 text-lg text-black font-semibold">£ {food.price}</Text>
                            <View className="flex-row items-center">
                                <TouchableOpacity onPress={handleDecrease} className="P-1 rounded-full bg-red-500" disabled={totalItems.filter(item => item._id === food._id).length === 0}>

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


