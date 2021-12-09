import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text>Home🥰</Text>
			<Button title="Go to ChatScreen" onPress={() => navigation.navigate('Chat')} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
