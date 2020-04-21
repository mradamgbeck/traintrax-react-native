import React from 'react';
import { View, Button } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'

export function SignUp({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LoginSignUpForm isLogin={false} navigation={navigation}></LoginSignUpForm>
        </View>
    );
}