import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import userAuth from './hooks/authUser';
import ModalScreen from './screens/ModalScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
	const { user } = userAuth();
	// console.log('este----------', user.accessToken);
	// const { displayName } = user;
	// console.log('name:', displayName);
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{user ? (
				<>
					<Stack.Group>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Chat" component={ChatScreen} />
					</Stack.Group>
					<Stack.Group screenOptions={{ presentation: 'modal' }}>
						<Stack.Screen name="Modal" component={ModalScreen} />
					</Stack.Group>
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default Navigator;

const styles = StyleSheet.create({});
