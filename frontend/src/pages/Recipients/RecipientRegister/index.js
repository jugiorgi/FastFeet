import React, { useState } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import history from '~/services/history';
import api from '~/services/api';
import { AboveForms, FormContent } from './styles';

const schema = Yup.object().shape({
	name: Yup.string().required(),
	email: Yup.string()
		.email()
		.required(),
	street: Yup.string().required(),
	number: Yup.string().required(),
	state: Yup.string().required(),
	city: Yup.string().required(),
	zip_code: Yup.string()
		.required()
		.max(8),
});

export default function RecipientRegister() {
	const [cep, setCep] = useState('');

	async function handleSubmit(data) {
		let recipient = {
			name: data.nome,
			email: data.email,
			street: data.rua,
			number: data.numero,
			state: data.estado,
			city: data.cidade,
			zip_code: cep.replace('-', ''),
		};

		try {
			if (await schema.isValid(recipient)) {
				if (data.complemento) {
					recipient = {
						...recipient,
						complement: data.complemento,
					};
				}

				const response = await api.post('recipients', recipient);
				if (response) {
					toast.success('Destinatário cadastrado com sucesso');
					history.push('/recipients');
				} else {
					toast.error('Não foi possível cadastrar o destinatário, tente novamente');
				}
			} else {
				toast.error(
					'Não foi possível cadastrar o destinatário, preencha todos os dados'
				);
			}
		} catch (error) {
			toast.error('Não foi possível cadastrar o destinatário');
		}
	}

	function handleComeBack() {
		history.push('/recipients');
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<AboveForms>
					<div>
						<h1>Cadastro de destinatário</h1>
					</div>
					<div>
						<button type="submit" onClick={handleComeBack}>
							<MdChevronLeft size={20} color="#FFF" />
							<span>VOLTAR</span>
						</button>
						<button className="save" type="submit">
							<MdCheck size={20} color="#FFF" />
							<span>SALVAR</span>
						</button>
					</div>
				</AboveForms>

				<FormContent>
					<div className="form">
						<div className="nome">
							<div id="name">
								<label>Nome</label>
								<Input name="nome" placeholder="Ludwig Van Beethoven" />
							</div>
							<div id="mail">
								<label>Email</label>
								<Input name="email" placeholder="ludwig@fastfeet.com" />
							</div>
						</div>

						<div className="rua">
							<div id="street">
								<label>Rua</label>
								<Input name="rua" placeholder="Rua Beethoven" />
							</div>
							<div id="number">
								<label>Número</label>
								<Input name="numero" placeholder="1729" />
							</div>
							<div id="complement">
								<label>Complemento</label>
								<Input name="complemento" />
							</div>
						</div>

						<div className="cidade">
							<div id="city">
								<label>Cidade</label>
								<Input name="cidade" placeholder="Diadema" />
							</div>
							<div id="state">
								<label>Estado</label>
								<Input name="estado" placeholder="São Paulo" />
							</div>
							<div id="zip_code">
								<label>CEP</label>
								<InputMask
									name="cep"
									placeholder="09960-580"
									mask="99999-999"
									onChange={e => setCep(e.target.value)}
									value={cep}
									autoComplete="off"
								/>
							</div>
						</div>
					</div>
				</FormContent>
			</Form>
		</>
	);
}
