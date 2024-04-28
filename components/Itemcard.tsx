import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftCircleIcon, QrCodeIcon, ClockIcon, MapPinIcon } from 'react-native-heroicons/solid'

const itemcard = ({ restaurant }) => {
    const navigation = useNavigation()

    const handlePress = () => {

        const restaurantData = restaurant;

        navigation.navigate('Restaurant', { restaurantData });
    };
    return (
        <View className="mt-2">
            <ScrollView
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15

                }}
            >
                <View className="flex justify-center items-center  mt-3">
                    <TouchableOpacity
                        style={{ width: '100%', borderRadius: 10, backgroundColor: '#fff', }}
                        onPress={handlePress}
                    >

                        <Image
                            className=" rounded-t-lg shadow  h-40 w-full"
                            src={restaurant.restaurantImage}


                        />
                        <View className="  flex flex-col mb-5 mt-3 ">
                            <Text className="mt-2 ml-4 font-semibold text-xl  text-black">{restaurant.name}</Text>

                           

                            <View className="w-full mt-1 ml-1   flex flex-row  ">
                                <View className='ml-2 mt-2'>
                                    <ClockIcon size={20} color='red' />

                                </View>
                                <Text className="mt-2 ml-2 font-semibold  text-md ">15-30 Minutes (preparationTime )</Text>

                            </View>
                            <Text className="mt-3 ml-4 font-medium  ">{restaurant.location}</Text>

                        

                        </View>

                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default itemcard
