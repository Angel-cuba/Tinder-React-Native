import React, { useLayoutEffect } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from 'react-native';
import userAuth from '../hooks/authUser';
import tw from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
	const { logout, user } = userAuth();
	console.log(user);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	return (
		<SafeAreaView style={tw('bg-gray-200')}>
			{/* Header */}
			<View style={tw('items-center flex-row justify-between px-5 pb-2')}>
				<TouchableOpacity style={tw('')} onPress={logout}>
					<Image source={{ uri: user.photoURL }} style={tw('h-10 w-10 rounded-full')} />
				</TouchableOpacity>

				<TouchableOpacity>
					<Image source={require('../assets/tinder.png')} style={tw('h-14 w-14')} />
				</TouchableOpacity>

				<TouchableOpacity style={tw('')} onPress={() => navigation.navigate('Chat')}>
					<Ionicons name="chatbubbles-sharp" size={24} color="#FF5864" />
				</TouchableOpacity>
			</View>

			{/* End of Header */}
			{/* <Text>Home🥰</Text>
			<Button title="Go to ChatScreen" onPress={() => navigation.navigate('Chat')} />
			<Button title="Logout" onPress={logout} /> */}
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
