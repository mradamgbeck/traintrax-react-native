import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { darkModeLime } from '../../constants/styles'

export function Home({ route, navigation }) {
    const { loggedInUser } = route.params;
    const [username, setUsername] = useState(loggedInUser);
    return (
        <View style={darkModeLime.mainView}>
            <Text style={darkModeLime.windowText}>Welcome to TrainTrax, {username}!</Text>
        </View>
    );
}