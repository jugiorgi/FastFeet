import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Container } from './styles';

export default function Confirm() {
	return (
		<>
			<Background />
		</>
	);
}

Confirm.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Confirmar entrega',
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
