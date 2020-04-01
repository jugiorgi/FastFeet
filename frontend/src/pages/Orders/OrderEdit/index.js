import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import { AboveForms, FormContent } from './styles';
import Select from '~/components/Select';

const schema = Yup.object().shape({
	deliveryman_id: Yup.number(),
	recipient_id: Yup.number(),
	product: Yup.string(),
});

export default function OrderRegister() {
	const [deliverymanId, setDeliverymanId] = useState([]);
	const [recipientsId, setRecipientsId] = useState([]);

	const location = useLocation();

	function handleSubmit(data) {
		let newOrder = {};

		if (deliverymanId.length !== 0) {
			newOrder = { deliveryman_id: deliverymanId };
		}

		if (recipientsId.length !== 0) {
			newOrder = {
				...newOrder,
				recipient_id: recipientsId,
			};
		}

		if (data.produto) {
			newOrder = {
				...newOrder,
				product: data.produto,
			};
		}

		async function editOrder() {
			try {
				if (await schema.isValid(newOrder)) {
					if (!location.state.orderId) {
						toast.error('Selecione uma encomenda para ser editada');
						history.push('/orders');
					} else {
						const response = await api.put(
							`order/${location.state.orderId}`,
							newOrder
						);

						if (response) {
							toast.success('Encomenda editada com sucesso');
							history.push('/orders');
						}
					}
				} else {
					toast.error('Não foi possível editar a encomenda, valide os dados');
				}
			} catch (error) {
				toast.error('Não foi possível editar a encomenda');
			}
		}

		if (Object.keys(newOrder).length !== 0) {
			editOrder(newOrder);
		} else {
			toast.error(
				'Não foi possível editar a encomenda, escolha algum dado para ser editado'
			);
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
						<h1>Edição de encomendas</h1>
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
							<Input
								name="produto"
								placeholder={location.state ? location.state.orderProduct : ''}
							/>
						</div>
					</div>
				</FormContent>
			</Form>
		</>
	);
}
