import React, { useState } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import { AboveForms, FormContent } from './styles';
import Select from '~/components/Select';

const schema = Yup.object().shape({
	deliveryman_id: Yup.number().required('Escolha um entregador'),
	recipient_id: Yup.number().required('Escolha um destinatário'),
	product: Yup.string().required('Digite o produto da encomenda'),
});

export default function OrderRegister() {
	const [deliverymanId, setDeliverymanId] = useState([]);
	const [recipientsId, setRecipientsId] = useState([]);

	function handleSubmit(data) {
		const newOrder = {
			deliveryman_id: deliverymanId,
			recipient_id: recipientsId,
			product: data.produto,
		};

		async function createOrder() {
			try {
				if (await schema.isValid(newOrder)) {
					const response = await api.post('order', newOrder);

					if (response) {
						toast.success('Encomenda cadastrada com sucesso');
						history.push('/orders');
					}
				} else {
					toast.error(
						'Não foi possível cadastrar a encomenda, preencha todos os dados'
					);
				}
			} catch (error) {
				toast.error('Não foi possível cadastrar a encomenda');
			}
		}

		if (newOrder) {
			createOrder(newOrder);
		}
	}

	function getSelectRecipientsOption(data) {
		setRecipientsId(data.value);
	}

	function getSelectDeliverymanOption(data) {
		setDeliverymanId(data.value);
	}

	function handleComeBack() {
		history.push('/orders');
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<AboveForms>
					<div>
						<h1>Cadastro de encomendas</h1>
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
						<div className="select">
							<div className="destinatario">
								<label>Destinatário</label>
								<Select getValue={getSelectRecipientsOption} endpoint="recipients" />
							</div>
							<div className="entregador">
								<label>Entregador</label>
								<Select getValue={getSelectDeliverymanOption} endpoint="deliveryman" />
							</div>
						</div>
						<div className="produto">
							<label>Nome do produto</label>
							<Input name="produto" />
						</div>
					</div>
				</FormContent>
			</Form>
		</>
	);
}
