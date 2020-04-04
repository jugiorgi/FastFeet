import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { signInRequest } from '~/store/modules/auth/actions';

import {
	Container,
	Background,
	FormInput,
	SubmitButton,
	Image,
} from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
	const dispatch = useDispatch();
	const [id, setId] = useState(0);

	const loading = useSelector((state) => state.auth.loading);

	function handleSubmit() {
		dispatch(signInRequest(id));
	}

	return (
		<Background>
			<Container>
				<Image source={logo} />

				<FormInput
					keyboardType="number"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Informe seu ID de cadastro"
					returnKeyType="send"
					onSubmitEditing={handleSubmit}
					value={id}
					onChangeText={setId}
				/>

				<SubmitButton color="#82BF18" loading={loading} onPress={handleSubmit}>
					Entrar no sistema
				</SubmitButton>
			</Container>
		</Background>
	);
}

SignIn.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
