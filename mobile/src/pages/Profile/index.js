import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function Profile() {
	return <Text>Profile</Text>;
}

Profile.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<Icon name="account-circle" size={20} color={tintColor} />
	),
};
