import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import { Container, FormInput, SubmitButton } from './styles';

export default function NewProblem({ navigation }) {
	const [problem, setProblem] = useState('');
	const order_id = navigation.getParam('id');

	async function handleSubmit() {
		try {
			await api.post(`delivery/${order_id}/problems`, {
				description: problem,
			});

			navigation.navigate('Details');
		} catch (error) {
			Alert('Não foi possível cadastrar o problema, tente novamente');
		}
	}
	return (
		<>
			<Background />
			<Container>
				<FormInput
					multiline
					keyboardType="text"
					placeholder="Inclua aqui o problema que ocorreu na entrega."
					returnKeyType="send"
					onSubmitEditing={handleSubmit}
					value={problem}
					onChangeText={setProblem}
				/>

				<SubmitButton color="#7D40E7" onPress={handleSubmit}>
					Enviar
				</SubmitButton>
			</Container>
		</>
	);
}

NewProblem.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Informar problema',
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
