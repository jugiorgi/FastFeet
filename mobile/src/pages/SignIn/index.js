import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Background, Form, FormInput, SubmitButton } from './styles';
import logo from '~/assets/fastfeet-logo.svg';

export default function SignIn() {
	const dispatch = useDispatch();
	const [id, setId] = useState('');

	const loading = useSelector((state) => state.auth.loading);

	function handleSubmit() {
		dispatch(signInRequest(id));
	}

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

					<SubmitButton loading={loading} onPress={handleSubmit}>
						Acessar
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
