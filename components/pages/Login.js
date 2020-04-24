import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'
import { navyLime } from '../../constants/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Login({ route, navigation }) {
    return (
        <View style={navyLime.mainView}>
            <LoginSignUpForm isLogin={true} navigation={navigation}></LoginSignUpForm>
            <TouchableOpacity style={navyLime.button}
                onPress={() => navigation.navigate('SignUp')}
            ><Text style={navyLime.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}