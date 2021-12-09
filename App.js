import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigator from './Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthUserProvider } from './hooks/authUser';

export default function App() {
	return (
		<NavigationContainer>
			{/* HOC - Higher Order Components */}
			<AuthUserProvider>
				{/* Passess down the cool auth stuff to childrens */}
				<Navigator />
			</AuthUserProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
