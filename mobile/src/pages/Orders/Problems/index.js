import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import Problem from '~/components/Problem';
import { Container, DeliveryTitle, List } from './styles';

export default function Problems({ navigation }) {
	const [problems, setProblems] = useState([{ item: 'oi' }]);
	const order_id = navigation.getParam('id');

	useEffect(() => {
		async function loadProblems() {
			try {
				const response = await api.get(`delivery/${order_id}/problems`);

				setProblems(response.data);
			} catch (error) {
				Alert.alert('Não foi possível carregar os problemas', 'Tente novamente');
			}
		}

		loadProblems();
	}, [order_id]);

	return (
		<>
			<Background />
			<Container>
				<DeliveryTitle>Encomenda {order_id}</DeliveryTitle>

				<List
					data={problems}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => <Problem onCancel={() => {}} data={item} />}
				/>
			</Container>
		</>
	);
}

Problems.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Visualizar problema',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Details');
			}}
		>
			<Icon name="chevron-left" size={30} color="#fff" />
		</TouchableOpacity>
	),
});
