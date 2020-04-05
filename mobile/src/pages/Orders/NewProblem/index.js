import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Container, FormInput, SubmitButton } from './styles';

export default function NewProblem({ navigation }) {
	const [problem, setProblem] = useState('');
	const order_id = navigation.getParam('id');

	function handleSubmit() {}
	return (
		<>
			<Background />
			<Container>
				<FormInput
					keyboardType="text"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Inclua aqui o problema que ocorreu na entrega."
					returnKeyType="send"
					onSubmitEditing={handleSubmit}
					value={problem}
					onChangeText={setProblem}
				/>

				<SubmitButton color="#82BF18" onPress={handleSubmit}>
					Entrar no sistema
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
