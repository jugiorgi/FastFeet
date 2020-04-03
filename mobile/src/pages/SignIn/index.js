import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Background, Form, FormInput, SubmitButton } from './styles';
import logo from '~/assets/fastfeet-logo.svg';

export default function SignIn() {
	const [id, setId] = useState('');

	function handleSubmit() {}

	return (
		<Background>
			<Container>
				<Image source={logo} />

				<Form>
					<FormInput
						keyboardType="number"
						autoCorrect={false}
						autoCapitalize="none"
						placeholder=""
						returnKeyType="send"
						onSubmitEditing={handleSubmit}
						value={id}
						onChangeText={setId}
					/>

					<SubmitButton onPress={handleSubmit}>
						<Text>Acessar</Text>
					</SubmitButton>
				</Form>
			</Container>
		</Background>
	);
}

SignIn.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
