import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import userAuth from '../hooks/authUser';
import tw from 'tailwind-rn';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
const DUMMY_DATA = [
	{
		id: 123,
		firstName: 'Angel',
		lastName: 'Araoz',
		ocupation: 'Software Developer',
		photoURL:
			'https://res.cloudinary.com/dqaerysgb/image/upload/v1630358737/jooly8uzpykfvixik2vv.jpg',
		age: 37,
	},
	{
		id: 124,
		firstName: 'Anniina',
		lastName: 'Kapanen',
		ocupation: 'Language Developer',
		photoURL:
			'https://res.cloudinary.com/dqaerysgb/image/upload/v1628772863/vxininiehhw7b9sh39nf.jpg',
		age: 40,
	},
	{
		id: 125,
		firstName: 'Vera',
		lastName: 'Maria',
		ocupation: 'Software Engineering',
		photoURL:
			'https://res.cloudinary.com/dqaerysgb/image/upload/v1628772923/ioyht3mnqdg9yojvji3i.jpg',
		age: 2,
	},
];

const HomeScreen = ({ navigation }) => {
	const { logout, user } = userAuth();
	// console.log(user);
	const [profiles, setProfiles] = useState([]);
	const swipeRef = useRef(null);

	useLayoutEffect(
		() =>
			onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
				if (!snapshot.exists()) {
					navigation.navigate('Modal');
				}
			}),
		[]
	);

	useEffect(() => {
		let unsubscribe;

		const fetchUsers = async () => {
			unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
				setProfiles(
					snapshot.docs
						.filter((doc) => doc.id !== user.uid)
						.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
				);
			});
		};
		fetchUsers();
		return unsubscribe;
	}, []);
	console.log(profiles);
	return (
		<SafeAreaView style={tw('flex-1')}>
			{/* Header */}
			<View style={tw('items-center flex-row justify-between px-5 pb-2')}>
				<TouchableOpacity style={tw('')} onPress={logout}>
					<Image source={{ uri: user.photoURL }} style={tw('h-10 w-10 rounded-full')} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Modal')}>
					<Image source={require('../assets/tinder.png')} style={tw('h-14 w-14')} />
				</TouchableOpacity>

				<TouchableOpacity style={tw('')} onPress={() => navigation.navigate('Chat')}>
					<Ionicons name="chatbubbles-sharp" size={24} color="#FF5864" />
				</TouchableOpacity>
			</View>

			{/* End of Header */}
			<View style={tw('flex-1 mt-2')}>
				{/* <Text>U have {DUMMY_DATA.length} personalities</Text> */}

				<Swiper
					ref={swipeRef}
					containerStyle={{ backgroundColor: 'transparent' }}
					cards={profiles}
					stackSize={5}
					cardIndex={0}
					animateCardOpacity
					verticalSwipe={false}
					onSwipedLeft={() => {
						console.log('Swipe REJECT');
					}}
					onSwipedRight={() => {
						console.log('Swipe MATCH');
					}}
					overlayLabels={{
						left: {
							title: 'Nope',
							style: {
								label: {
									textAlign: 'right',
									color: 'red',
								},
								wrapper: {
									flexDirection: 'column',
									alignItems: 'flex-end',
									justifyContent: 'flex-start',
									marginTop: 30,
									marginLeft: -30,
								},
							},
						},
						right: {
							title: 'Match',
							style: {
								label: {
									color: '#80ff72',
								},
								wrapper: {
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'flex-start',
									marginTop: 30,
									marginLeft: 30,
								},
							},
						},
					}}
					renderCard={(card) =>
						card ? (
							<View key={card.id} style={tw('bg-white h-3/4 rounded-xl ')}>
								<Image
									style={tw('absolute top-0 w-full h-96')} // h-full w-full rounded-sm'
									source={{
										uri: card.photoURL,
									}}
								/>

								<View
									style={[
										tw(
											'absolute bottom-0 bg-white w-full flex-row justify-between h-20 px-6 py-2 rounded-b-xl'
										),
										styles.cardShadow,
									]}
								>
									<View>
										<Text style={tw('text-xl font-bold')}>{card.displayName}</Text>
										<Text>{card.job}</Text>
									</View>
									<Text style={tw('text-2xl font-bold')}>{card.age}</Text>
								</View>
							</View>
						) : (
							<View
								style={tw(
									'relative bg-white h-3/4 rounded-xl justify-center items-center',
									styles.cardShadow
								)}
							>
								<Text style={tw('font-bold pb-5')}>No more profiles</Text>

								<Image
									style={tw('h-20 w-full')}
									height={100}
									width={100}
									source={{ uri: 'https://links.papareact.com/6gb' }}
								/>
							</View>
						)
					}
				/>
			</View>

			<View style={tw('flex flex-row justify-evenly')}>
				<TouchableOpacity
					onPress={() => swipeRef.current.swipeLeft()}
					style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
				>
					<Entypo name="cross" size={24} color="red" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => swipeRef.current.swipeRight()}
					style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
				>
					<AntDesign name="heart" size={24} color="green" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	cardShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
});
