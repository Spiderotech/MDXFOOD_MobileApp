import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { ArrowLeftCircleIcon, PlusIcon, MinusIcon, ClockIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsByRestaurantId,deleteCart } from '../slices/cartSlice';
import { setRestaurant } from '../slices/restaurantSlice';
import * as Icon from 'react-native-feather';

const FoodsingledetailScreen = ({ route }) => {

    const [selectedExtras, setSelectedExtras] = useState([]);


    const { restaurant,fooddata, Id  } = route.params;


    const dispatch = useDispatch();
    const totalItems = useSelector(state => selectCartItemsByRestaurantId(state, Id));
    const navigation = useNavigation()

    
    const handleIncrease = () => {
        dispatch(setRestaurant(restaurant));
        dispatch(addToCart({ restaurantId: Id, item: { ...fooddata, extras: selectedExtras } }));
    };

    const handleDecrease = () => {
      
        
        const cartItemCount = totalItems.filter(item => item._id === fooddata._id).length;


        if (cartItemCount === 1) {
           
            dispatch(deleteCart({ restaurantId: Id }));
        } else {
            dispatch(removeFromCart({ restaurantId: Id, itemId: fooddata._id }));
        }
    };

    


    const handleSelectExtra = (extra) => {
        if (selectedExtras.find((selected) => selected === extra)) {
            setSelectedExtras(selectedExtras.filter((selected) => selected !== extra));
        } else {
            setSelectedExtras([...selectedExtras, extra]);
        }
    };

    return (

        <View className=' h-screen'>
            <ScrollView>
                <View className="relative ">
                    <Image className=" w-full h-60"
                        src={fooddata.image}
                    />
                    <TouchableOpacity
                        className="absolute top-10 left-4   rounded-lg flex justify-center items-center"
                        onPress={() => navigation.goBack()}

                    >
                        <ArrowLeftCircleIcon size={40} color="red" />

                    </TouchableOpacity>

                </View>
                <View className=" bg-white w-full h-auto rounded-tl-3xl shadow -mt-12 p-3  ">

                    <Text className="mt-1 ml-2  font-semibold text-black text-2xl">{fooddata.name}</Text>

                    <Text className="mt-3 ml-2 text-md mb-2 font-semibold">{fooddata.description}</Text>
                    
                    <View className="w-full    flex flex-row  ">
                        <View className='ml-2 mt-1'>
                            <ClockIcon size={20} color='red' />

                        </View>
                        <Text className="mt-1 ml-2 text-md font-medium mb-2">{fooddata.preparationTime} Minutes (preparationTime )</Text>

                    </View>
                    <Text className="mt-3 ml-2 text-xl font-semibold mb-5">£ {fooddata.price}</Text>

                </View>
                <ScrollView>
                    <View className=" bg-white h-60 ">
                        <Text className="mt-1 font-medium text-start text-black text-xl mb-4 ml-4"> Add extras</Text>
                        <View className=' p-5'>
                        {fooddata.extraItems.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelectExtra(item)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 ,padding:10}}>
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
                       
                    </View>
                </ScrollView>

            </ScrollView>
            <View className=' w-full bg-white flex bottom-8'>
                <View className="flex-row justify-center items-center mt-5">
                    <TouchableOpacity className="p-1 rounded-full bg-white border border-red-600 " onPress={handleDecrease} disabled={totalItems.filter(item => item._id === fooddata._id).length === 0} >
                        <MinusIcon size={30} color='red' />
                    </TouchableOpacity>
                    <Text className=" text-black  text-lg font-bold ml-6">{totalItems.filter(item => item._id === fooddata._id).length}</Text>
                    <TouchableOpacity className="p-1 rounded-full bg-white ml-5  border border-red-600" onPress={handleIncrease}>

                        <PlusIcon size={30} color='red' />

                    </TouchableOpacity>

                </View>
                <View className="flex-row justify-center items-center mt-5">
                    <TouchableOpacity className='py-4 w-[90%]  bg-red-600 rounded-xl mt-5 mb-10 ' onPress={() => navigation.goBack()} >
                        <Text className='text-white  text-lg font-semibold text-center'>
                            Add £{totalItems.filter(item => item._id === fooddata._id).length * fooddata.price}
                        </Text>



                    </TouchableOpacity>


                </View>


            </View>

        </View>


    )
}

export default FoodsingledetailScreen
