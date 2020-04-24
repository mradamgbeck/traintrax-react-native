import React, { useState } from 'react';
import { AsyncStorage, Text, View, TextInput, Keyboard, Picker } from 'react-native';
import { herokuUrl } from '../constants/url-constants'
import { logTrainTraxError } from '../constants/error-messages'
import { roles } from '../constants/roles'
import { navyLime } from '../constants/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navyLimeColors } from '../constants/colors';

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
                loginUserAndSetToken(user);
                getAndPersistUserData(user.username)
                if (role === roles.trainer) {
                    dismissKeyboardAndNavigate('TrainerHome', { loggedInUser: username });
                } else {
                    dismissKeyboardAndNavigate('ClientHome', { loggedInUser: username });
                }
            } else {
                registerUser(user);
                dismissKeyboardAndNavigate('Login');
            }
        }
    }

    function loginUserAndSetToken({ username, password }) {
        fetch(herokuUrl + `/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => {
                return response.headers
            })
            .then(headers => {
                AsyncStorage.setItem('token', headers.map.authorization)
            })
            .catch(logTrainTraxError)
    }

    function getAndPersistUserData(username) {
        AsyncStorage.getItem('token')
            .then(token => {
                fetch(herokuUrl + `/api/user/blarg/` + username, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then(json => {
                        AsyncStorage.setItem('username', json.username)
                        AsyncStorage.setItem('role', json.role)
                        setRole(json.role)
                    })
                    .catch(logTrainTraxError)
            })
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
        <View style={navyLime.pageView}>
            <TextInput
                style={navyLime.textInput}
                onChangeText={(username) => setUsername(username)}
                placeholder="Username"
                placeholderTextColor={navyLimeColors.placeHolderText}
                keyboardType="email-address">
            </TextInput>
            <TextInput
                style={navyLime.textInput}
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                placeholderTextColor={navyLimeColors.placeHolderText}
                secureTextEntry={true}
            />
            {isLogin ? null :
                <Picker
                    style={navyLime.picker}
                    mode='dropdown'
                    itemStyle={navyLime.pickerItem}
                    selectedValue={role}
                    onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                >
                    <Picker.Item label="Trainer" value={roles.trainer} />
                    <Picker.Item label="Client" value={roles.client} />
                </Picker>}
            <TouchableOpacity
                style={navyLime.button}
                onPress={saveData}>
                <Text style={navyLime.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View>
    );
}