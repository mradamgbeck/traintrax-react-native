import React, { useState } from 'react';
import { View, Text } from 'react-native'

export function Home({ route, navigation }) {
    const { loggedInUser } = route.params;
    const [username, setUsername] = useState(loggedInUser);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to TrainTrax, {username}!</Text>
        </View>
    );
}