import React from 'react';
import { View, Button } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'
import { darkModeLime } from '../../constants/styles'

export function SignUp({ navigation }) {
    return (
        <View style={darkModeLime.mainView}>
            <LoginSignUpForm isLogin={false} navigation={navigation}></LoginSignUpForm>
        </View>
    );
}