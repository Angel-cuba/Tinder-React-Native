import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import userAuth from './hooks/authUser';

const Stack = createNativeStackNavigator();

const Navigator = () => {
	const { user } = userAuth();

	return (
		<Stack.Navigator>
			{user ? (
				<>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Chat" component={ChatScreen} />
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default Navigator;

const styles = StyleSheet.create({});
