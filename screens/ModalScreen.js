import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import tw from 'tailwind-rn';
import userAuth from '../hooks/authUser';

const ModalScreen = () => {
	const { user } = userAuth();
	return (
		<View style={tw('flex-1 items-center pt-2')}>
			<Image
				style={tw('h-20 w-full')}
				resizeMode="contain"
				source={{ uri: 'https://links.papareact.com/2pf' }}
			/>
			<Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome {user.displayName}</Text>
			<Text style={tw('text-center p-4 font-bold text-red-400')}>Step 1: The Profile Picture</Text>
			<TextInput placeholder="Enter a Profile Pic URL" />
		</View>
	);
};

export default ModalScreen;
