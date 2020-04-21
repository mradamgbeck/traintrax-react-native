import React, { useState } from 'react';
import { View, Button } from 'react-native'
import { LoginSignUpForm } from '../LoginSignUpForm'

export function Login({ route, navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LoginSignUpForm isLogin={true} navigation={navigation}></LoginSignUpForm>
            <Button
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}