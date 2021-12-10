import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
// all the SignIn methods from Firebase
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from 'firebase/auth';

import { auth } from '../firebase/firebase';

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
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					//Logged in user
					setUser(user);
				} else {
					//Not logged in user
					setUser(null);
				}

				setInitialLoading(false);
			}),
		[user]
	);

	const logout = () => {
		setLoading(true);
		signOut(auth)
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	const signInWithGoogle = async () => {
		setLoading(true);
		await Google.logInAsync(config)
			.then(async (logInResponse) => {
				if (logInResponse.type === 'success') {
					//login success.......
					// console.log(logInResponse);
					const { idToken, accessToken } = logInResponse;
					const credentials = GoogleAuthProvider.credential(idToken, accessToken);

					await signInWithCredential(auth, credentials);
				}

				return Promise.reject();
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	};

	const memoValue = useMemo(
		() => ({
			user,
			loading,
			error,
			signInWithGoogle,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoValue}>{!initialLoading && children}</AuthContext.Provider>
	);
};

export default function userAuth() {
	return useContext(AuthContext);
}

const styles = StyleSheet.create({});
