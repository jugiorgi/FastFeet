import React from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import AvatarInput from './AvatarInput';
import { AboveForms, FormContent } from './styles';

const schema = Yup.object().shape({
	avatar_id: Yup.string().required('Insira uma foto'),
	email: Yup.string()
		.email()
		.required('Insira um email'),
	name: Yup.string().required('Insira um nome'),
});

export default function DeliverymanRegister() {
	async function handleSubmit(data) {
		const deliveryman = {
			name: data.nome,
			email: data.email,
			avatar_id: data.avatar_id,
		};

		try {
			if (await schema.isValid(deliveryman)) {
				const response = await api.post('deliveryman', deliveryman);
				if (response) {
					toast.success('Entregador cadastrado com sucesso');
					history.push('/deliverymans');
				} else {
					toast.error('Não foi possível cadastrar o entregador, tente novamente');
				}
			} else {
				toast.error(
					'Não foi possível cadastrar o entregador, preencha todos os dados'
				);
			}
		} catch (error) {
			toast.error('Não foi possível cadastrar o entregador');
		}
	}

	function handleComeBack() {
		history.push('/deliverymans');
	}
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<AboveForms>
					<div>
						<h1>Cadastro de entregadores</h1>
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
						<div className="produto">
							<AvatarInput name="avatar_id" />

							<div>
								<label>Nome</label>
								<Input name="nome" />
							</div>
							<div className="email">
								<label>Email</label>
								<Input name="email" />
							</div>
						</div>
					</div>
				</FormContent>
			</Form>
		</>
	);
}
