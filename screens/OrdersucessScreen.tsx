import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import paymentSuccessfulImage from "../assets/images/payment-successful.png"; 

const OrdersuccessScreen = () => {
    const navigation = useNavigation();

    setTimeout(() => {
        navigation.navigate('Home');
    }, 5000);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Image
                style={{ width: 200, height: 200 }} // Adjust width and height according to your requirements
                source={paymentSuccessfulImage} // Use source instead of src
            />
        </SafeAreaView>
    );
}

export default OrdersuccessScreen;
