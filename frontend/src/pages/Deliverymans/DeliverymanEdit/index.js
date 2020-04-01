import React from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import AvatarInput from './AvatarInput';
import { AboveForms, FormContent } from './styles';

const schema = Yup.object().shape({
	avatar_id: Yup.string(),
	email: Yup.string().email(),
	name: Yup.string(),
});

export default function DeliverymanEdit() {
	const location = useLocation();

	const deliverymanStartInfo = {
		nome: location.state.deliverymanName,
		email: location.state.deliverymanEmail,
	};

	async function handleSubmit(data) {
		let deliveryman = {};

		if (data.nome) {
			deliveryman = {
				...deliveryman,
				name: data.nome,
			};
		}

		if (data.email && data.email !== deliverymanStartInfo.email) {
			deliveryman = {
				...deliveryman,
				email: data.email,
			};
		}

		if (data.avatar_id) {
			deliveryman = {
				...deliveryman,
				avatar_id: data.avatar_id,
			};
		}

		try {
			if (await schema.isValid(deliveryman)) {
				const response = await api.put(
					`deliveryman/${location.state.deliverymanId}`,
					deliveryman
				);
				if (response) {
					toast.success('Entregador editado com sucesso');
					history.push('/deliverymans');
				} else {
					toast.error('Não foi possível editar o entregador, tente novamente');
				}
			} else {
				toast.error('Não foi possível editar o entregador, valide as informações');
			}
		} catch (error) {
			toast.error('Não foi possível editar o entregador');
		}
	}

	function handleComeBack() {
		history.push('/deliverymans');
	}

	return (
		<>
			<Form initialData={deliverymanStartInfo} onSubmit={handleSubmit}>
				<AboveForms>
					<div>
						<h1>Edição de entregadores</h1>
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
							<AvatarInput
								name="avatar_id"
								avatarUrl={location.state.deliverymanAvatar}
							/>

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
