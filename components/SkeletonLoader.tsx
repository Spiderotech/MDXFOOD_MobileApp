import React from 'react'
import { View } from 'react-native'

const SkeletonLoader = () => {
    return (
        
        <View className="flex flex-row m-4 items-center  animate-pulse">
            <View className="bg-gray-300 h-20 w-20 rounded"></View>
            <View className="flex-1 ml-4">
                <View className="bg-gray-300 h-10 w-3/4 rounded mb-2"></View>
                <View className="bg-gray-300 h-10 w-1/2 rounded"></View>
            
            </View>
          
        </View>
    )
}

export default SkeletonLoader
