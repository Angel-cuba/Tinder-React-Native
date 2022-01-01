import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen = () => {
	return (
		<View style={styles.mainContainer}>
			<Text>ChatScreen</Text>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
});
