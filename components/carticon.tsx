import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectCartItemsByRestaurantId, selectCartTotalByRestaurantId } from '../slices/cartSlice';

export default function CartIcon({ restaurantId }) {
  const navigation = useNavigation()

  const cartItems = useSelector(state => selectCartItemsByRestaurantId(state, restaurantId));
  const cartTotal = useSelector(state => selectCartTotalByRestaurantId(state, restaurantId));

  if (!cartItems.length) return null;

  return (
    <View className="absolute flex bottom-5 w-full z-50 mb-2">
      <TouchableOpacity
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg bg-red-500"
        onPress={() => navigation.navigate('Cart')}
      
      >
        <View className="p-2 px-4 rounded-full bg-red-400">
          <Text className="font-extrabold text-white text-lg">
            {cartItems.length}
          </Text>
        </View>
        <Text className="flex-1 text-center font-bold text-lg text-white">
          View Cart
        </Text>
        <Text className="font-bold text-lg text-white">
          £{cartTotal}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
