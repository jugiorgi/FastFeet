import React, { useState } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
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

export default function RecipientEdit() {
	const location = useLocation();
	const [cep, setCep] = useState(location.state.recipient.zip_code);

	const recipientsStartInfo = {
		nome: location.state.recipient.name,
		email: location.state.recipient.email,
		rua: location.state.recipient.street,
		numero: location.state.recipient.number,
		complemento: location.state.recipient.complement
			? location.state.recipient.complement
			: '',
		estado: location.state.recipient.state,
		cidade: location.state.recipient.city,
	};

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

				const response = await api.put(
					`recipients/${location.state.recipient.id}`,
					recipient
				);

				if (response) {
					toast.success('Destinatário editado com sucesso');
					history.push('/recipients');
				} else {
					toast.error('Não foi possível editar o destinatário, tente novamente');
				}
			} else {
				toast.error(
					'Não foi possível editar o destinatário, preencha todos os dados'
				);
			}
		} catch (error) {
			toast.error('Não foi possível editar o destinatário');
		}
	}

	function handleComeBack() {
		history.push('/recipients');
	}

	return (
		<>
			<Form initialData={recipientsStartInfo} onSubmit={handleSubmit}>
				<AboveForms>
					<div>
						<h1>Edição de destinatário</h1>
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
