import React from 'react';
import { View, Button } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'
import { navyLime } from '../../constants/styles'

export function SignUp({ navigation }) {
    return (
        <View style={navyLime.mainView}>
            <LoginSignUpForm isLogin={false} navigation={navigation}></LoginSignUpForm>
        </View>
    );
}