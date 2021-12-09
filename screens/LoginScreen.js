import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import userAuth from '../hooks/authUser';

const LoginScreen = () => {
	const { signInWithGoogle } = userAuth();
	return (
		<View>
			<Text>This is theLoginScreen</Text>
			<Button title="Login with Google" onPress={signInWithGoogle} />
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
