import React, { useState } from 'react';
import { AsyncStorage, Text, View, TextInput, Keyboard, Picker } from 'react-native';
import { herokuUrl } from '../constants/url-constants'
import { logTrainTraxError } from '../constants/error-messages'
import { roles } from '../constants/roles'
import { darkModeLime } from '../constants/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { darkModeLimeColors } from '../constants/colors';

export function LoginSignUpForm(props) {
    const { navigation } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [role, setRole] = useState(roles.client);

    async function saveData() {
        if (!username) {
            alert('Please enter a username.');
            return;
        } else if (!password) {
            alert('Please enter a password.');
            return;
        } else {
            const user = {
                username: username,
                password: password,
                role: role,
                isEnabled: true
            };
            if (isLogin) {
                loginUser(user);
                dismissKeyboardAndNavigate('Home', { loggedInUser: username });
            } else {
                registerUser(user);
                dismissKeyboardAndNavigate('Login');
            }
        }
    }

    function loginUser({ username, password }) {
        fetch(herokuUrl + `/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => {
                return response.headers.map.authorization
            })
            .then(token => {
                AsyncStorage.setItem('jwt', token)
            })
            .catch(logTrainTraxError)
    }

    function registerUser(user) {
        fetch(herokuUrl + `/api/user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .catch(logTrainTraxError)
    }

    function dismissKeyboardAndNavigate(destination, props) {
        Keyboard.dismiss();
        navigation.navigate(destination, props);
    }

    return (
        <View style={darkModeLime.pageView}>
            <TextInput
                style={darkModeLime.textInput}
                onChangeText={(username) => setUsername(username)}
                placeholder="Username"
                placeholderTextColor={darkModeLimeColors.placeHolderText}
                keyboardType="email-address">
            </TextInput>
            <TextInput
                style={darkModeLime.textInput}
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                placeholderTextColor={darkModeLimeColors.placeHolderText}
                secureTextEntry={true}
            />
            {isLogin ? null :
                <Picker
                    style={darkModeLime.picker}
                    mode='dropdown'
                    itemStyle={darkModeLime.pickerItem}
                    selectedValue={role}
                    onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                >
                    <Picker.Item label="Trainer" value={roles.trainer} />
                    <Picker.Item label="Client" value={roles.client} />
                </Picker>}
            <TouchableOpacity
                style={darkModeLime.button}
                onPress={saveData}>
                <Text style={darkModeLime.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View>
    );
}