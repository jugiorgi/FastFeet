import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dateFormat from '~/utils/dateFormat';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import {
	Container,
	Deliveryman,
	Avatar,
	Title,
	Description,
	SubmitButton,
} from './styles';

export default function Profile() {
	const dispatch = useDispatch();
	const [deliveryman, setDeliveryman] = useState([]);
	const { id } = useSelector((state) => state.auth);

	useEffect(() => {
		async function loadDeliveryman() {
			const response = await api.get(`deliveryman/${id}`);

			setDeliveryman(response.data);
		}

		loadDeliveryman();
	}, [id]);

	function handleLogout() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Avatar
				source={{
					uri: deliveryman.avatar
						? deliveryman.avatar.url
						: `https://api.adorable.io/avatar/50/${deliveryman.name}.png`,
				}}
			/>

			<Deliveryman>
				<Title>Nome Completo</Title>
				<Description>{deliveryman.name}</Description>

				<Title>Email</Title>
				<Description>{deliveryman.email}</Description>

				<Title>Data de cadastro</Title>
				<Description>{dateFormat(deliveryman.created_at)}</Description>
			</Deliveryman>
			<SubmitButton color="#E74040" onPress={handleLogout}>
				Logout
			</SubmitButton>
		</Container>
	);
}

Profile.navigationOptions = {
	tabBarLabel: 'Meu perfil',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="account-circle" size={20} color={tintColor} />
	),
};
