import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import { db } from '../firebase/firebase';
import userAuth from '../hooks/authUser';

const ModalScreen = ({ navigation }) => {
	const { user } = userAuth();

	const [image, setImage] = useState(null);
	const [job, setJob] = useState(null);
	const [age, setAge] = useState(null);

	const incompleteForm = !image || !job || !age;

	const updateUserProfile = () => {
		setDoc(doc(db, 'users', user.uid), {
			id: user.uid,
			displayName: user.displayName,
			photoURL: image,
			job: job,
			age: age,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				navigation.navigate('Home');
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<View style={tw('flex-1 items-center pt-2')}>
			<Image
				style={tw('h-20 w-full')}
				resizeMode="contain"
				source={{ uri: 'https://links.papareact.com/2pf' }}
			/>
			<Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome {user.displayName}</Text>
			<Text style={tw('text-center p-4 font-bold text-red-400')}>Step 1: The Profile Picture</Text>
			<TextInput
				value={image}
				onChangeText={(text) => setImage(text)}
				placeholder="Enter a Profile Pic URL"
				style={tw('text-center text-xl pb-2')}
			/>

			<Text style={tw('text-center p-4 font-bold text-red-400')}>Step 2: The Job Name</Text>
			<TextInput
				value={job}
				onChangeText={(text) => setJob(text)}
				placeholder="Enter your ocupation"
				style={tw('text-center text-xl pb-2')}
			/>

			<Text style={tw('text-center p-4 font-bold text-red-400')}>Step 3: The Age</Text>
			<TextInput
				value={age}
				onChangeText={(text) => setAge(text)}
				placeholder="Enter your age"
				style={tw('text-center text-xl pb-2')}
				keyboardType="numeric"
				maxLength={2}
			/>

			<TouchableOpacity
				disabled={incompleteForm}
				style={[
					tw('w-64 p-3 rounded-xl absolute bottom-20 bg-red-400'),
					incompleteForm ? tw('bg-gray-400') : tw('bg-red-400'),
				]}
				onPress={updateUserProfile}
			>
				<Text style={tw('text-center text-white text-xl')}>Update your profile</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ModalScreen;
