import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Check } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('Insira um e-mail válido')
		.required('Insira o seu e-mail'),
	password: Yup.string().required('Insira a sua senha'),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	function handleSubmit({ email, password }) {
		dispatch(signInRequest(email, password));
	}

	function handleChangeVisible() {
		setShowPassword(!showPassword);
	}

	return (
		<>
			<img src={logo} alt="fastfeet" />

			<Form schema={schema} onSubmit={handleSubmit}>
				<label>SEU E-MAIL</label>
				<Input name="email" type="email" placeholder="exemplo@email.com" />
				<label>SUA SENHA</label>
				<Input
					name="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="********"
				/>
				<div>
					<Check name="showPassword" onClick={handleChangeVisible} />
					<label>Mostrar senha</label>
				</div>

				<button type="submit">
					{loading ? 'Carregando...' : 'Entrar no sistema'}
				</button>
			</Form>
		</>
	);
}
