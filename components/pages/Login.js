import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'
import { darkModeLime } from '../../constants/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Login({ route, navigation }) {
    return (
        <View style={darkModeLime.mainView}>
            <LoginSignUpForm isLogin={true} navigation={navigation}></LoginSignUpForm>
            <TouchableOpacity style={darkModeLime.button}
                onPress={() => navigation.navigate('SignUp')}
            ><Text style={darkModeLime.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}