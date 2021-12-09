import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';

const AuthContext = createContext({
	// initial state
});

const config = {
	androidClientId: '510219033145-mtjco5euj872unqbvf2tqd3fba9mk0lv.apps.googleusercontent.com',
	iosClientId: '510219033145-o5slvrkta10b68670e2b496ih7m2hcvb.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
	permissions: ['public_profile', 'email', 'genders', 'location'],
};

export const AuthUserProvider = ({ children }) => {
	const signInWithGoogle = async () => {
		await Google.logInAsync(config).then(async (logInResponse) => {
			if (logInResponse.type === 'success') {
				//login success.......
			}
		});
	};

	return (
		<AuthContext.Provider value={{ user: null, signInWithGoogle }}>{children}</AuthContext.Provider>
	);
};

export default function userAuth() {
	return useContext(AuthContext);
}

const styles = StyleSheet.create({});
