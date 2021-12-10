import React, { useLayoutEffect } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userAuth from '../hooks/authUser';
import tw from 'tailwind-rn';

const LoginScreen = ({ navigation }) => {
	const { signInWithGoogle, loading } = userAuth();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	return (
		<View style={tw('flex-1')}>
			<ImageBackground
				resizeMode="cover"
				style={tw('flex-1')}
				source={{ uri: 'https://tinder.com/static/tinder.png' }}
			>
				<TouchableOpacity
					style={[
						tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'),
						{ marginHorizontal: '25%' },
					]}
					onPress={signInWithGoogle}
				>
					<Text style={tw('text-center')}>Sign In </Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
