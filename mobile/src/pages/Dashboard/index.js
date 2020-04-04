import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import {
	Container,
	AboveComponent,
	Avatar,
	WelcomeText,
	Title,
	Name,
	Logout,
	Menu,
	MenuTitle,
	Pending,
	HandedOut,
	DeliveryHeader,
	List,
} from './styles';
import Delivery from '~/components/Delivery';

export default function Dashboard() {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(true);
	const [pending, setPending] = useState([]);
	const [handledOut, setHandledOut] = useState([]);
	const { id, name, avatar } = useSelector((state) => state.auth);

	useEffect(() => {
		async function loadOrdersPeding() {
			const response = await api.get(`deliveryman/${id}/orders`);
			setPending(response.data);
		}

		async function loadOrdersHandledOut() {
			const response = await api.get(`deliveryman/${id}/deliveries`);
			setHandledOut(response.data);
		}

		if (isPending) {
			loadOrdersPeding();
		} else {
			loadOrdersHandledOut();
		}
	}, [isPending, id]);

	function handleLogout() {
		dispatch(signOut());
	}

	return (
		<Container>
			<AboveComponent>
				<Avatar
					source={{
						uri: avatar || `https://api.adorable.io/avatar/50/${name}.png`,
					}}
				/>
				<WelcomeText>
					<Title>
						<Text>Bem vindo de volta,</Text>
					</Title>
					<Name>
						<Text>{name}</Text>
					</Name>
				</WelcomeText>
				<Logout onPress={handleLogout}>
					<Icon name="exit-to-app" size={30} color="#E74040" />
				</Logout>
			</AboveComponent>

			<Menu>
				<MenuTitle>Entregas</MenuTitle>
				<DeliveryHeader>
					<Pending
						pending={isPending}
						onPress={() => {
							setIsPending(!isPending);
						}}
					>
						Pendentes
					</Pending>
					<HandedOut
						handedOut={!isPending}
						onPress={() => {
							setIsPending(!isPending);
						}}
					>
						Entregues
					</HandedOut>
				</DeliveryHeader>
			</Menu>

			<List
				data={isPending ? pending : handledOut}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <Delivery onCancel={() => {}} data={item} />}
			/>
		</Container>
	);
}

Dashboard.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<Icon name="reorder" size={20} color={tintColor} />
	),
};
