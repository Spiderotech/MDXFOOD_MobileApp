import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ArrowLeftCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import axios from "../Utils/restaurant/axios"

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [allFoods, setAllFoods] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                const response = await axios.get('/allfoods');
                setAllFoods(response.data.fooddata);
            } catch (error) {
                console.error('Error fetching all foods:', error);
            }
        };
        fetchAllFoods();
    }, []);




    const handleSearch = () => {
        setLoading(true);
        const results = allFoods.filter(food => food.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(results);
        setLoading(false);
    };

    const navigateToRestaurant = (restaurantId) => {// Navigate to the restaurant screen with the restaurant data
        navigation.navigate('Restaurant', { restaurantData: restaurantId });
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
                            Search

                        </Text>


                    </View>


                </View>
                <View className="flex-row items-center flex justify-between space-x-2 px-4  mt-4 mb-5">
                    <View className='flex-row flex-1 items-center rounded-full bg-white border border-gray-50'>
                        <View className='ml-4'>
                            <MagnifyingGlassIcon size={20} color="red" />

                        </View>

                        <TextInput
                            placeholder='search'
                            className=' ml-3 p-3 flex-1'
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text);
                                handleSearch();
                            }}
                        />
                    </View>



                </View>



            </SafeAreaView>

            <View className='flex-1 bg-white  mt-10 rounded-tl-3xl '>
                <View className='p-2 flex justify-center items-center'>
                    <View >
                        <ScrollView style={{ padding: 20 }}>
                            {loading && <Text>Loading...</Text>}
                            {!loading && searchResults.length === 0 && <Text className=''>No items found</Text>}
                            {!loading && searchResults.map(food => (
                                <View key={food._id} className=" mt-3  w-full  bg-white  rounded-lg shadow">
                                    <TouchableOpacity className=" w-full    flex flex-row   p-2 " onPress={() => navigateToRestaurant(food.restaurantId)}>
                                        <Image style={{ width: 90, height: 100 }} className=" rounded-lg shadow" src={food.image} />
                                        <View className="flex flex-col ml-5 w-52 ">
                                            <View className="w-full ">
                                                <Text className="mt-2 text-xl">{food.name}</Text>
                                                <Text className="mt-2 text-md">{food.description}</Text>
                                                <View className="flex flex-row justify-between pl-3 mt-3 items-center">
                                                    <Text className="mt-2 font-semibold">£{food.price}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>



                </View>


            </View>






        </View>
    )
}

export default SearchScreen
