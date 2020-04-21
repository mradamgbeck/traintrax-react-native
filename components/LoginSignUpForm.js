import React, { useState } from 'react';
import { View, TextInput, Button, Keyboard, Picker } from 'react-native';

export function LoginSignUpForm(props) {
    const { navigation } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [role, setRole] = useState("CLIENT");

    async function saveData() {
        if (!username) {
            alert('Please enter a username.');
            return;
        } else if (!password) {
            alert('Please enter a password.');
            return;
        } else {
            if (isLogin) {
                //call login endpoint with creds
                dismissKeyboardAndNavigate('Home', { loggedInUser: username });
            } else {
                registerUser();
                dismissKeyboardAndNavigate('Login');
            }
        }
    }

    function registerUser() {
        const newUser = {
            username: username,
            password: password,
            role: role,
            isEnabled: true
        };
        fetch('https://jigglejam-traintrax.herokuapp.com/api/user/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then((response) => {
                console.log(response)
                response.json
            })
            .then(json => json)
            .catch((error) => {
                console.log("TRAINTRAX ERROR:\n----------------------"
                    + error)
            })
    }
    function dismissKeyboardAndNavigate(destination, props) {
        Keyboard.dismiss();
        navigation.navigate(destination, props);
    }

    return (
        <View>
            <TextInput
                onChangeText={(username) => setUsername(username)}
                placeholder="Username"
                placeholderTextColor="#000000"
                selectionColor="#fff"
                keyboardType="email-address">
            </TextInput>
            <TextInput
                onChangeText={(password) => setPassword(password)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#002f6c"
            />
            {isLogin ? null :
                <Picker
                    selectedValue={role}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                >
                    <Picker.Item label="Trainer" value="TRAINER" />
                    <Picker.Item label="Client" value="CLIENT" />
                </Picker>}
            <Button
                title={isLogin ? 'Login' : 'Sign Up'}
                onPress={saveData}>
            </Button>
        </View>
    );

}