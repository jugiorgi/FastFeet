import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	MdMoreHoriz,
	MdRemoveRedEye,
	MdModeEdit,
	MdDeleteForever,
} from 'react-icons/md';
import Pagination from '@material-ui/lab/Pagination';
import api from '~/services/api';
import { Table, Status, ActionList, Action, Footer } from './styles';
import formatId from '~/util/format';
import ModalComponent from './Modal';
import AboveComponent from '~/components/AboveComponent';

export default function Orders() {
	const [filter, setFilter] = useState(false);
	const [orders, setOrders] = useState([]);
	const [reload, setReload] = useState(false);
	const [show, setShow] = useState(false);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);

	useEffect(() => {
		setReload(false);
		function verifyStatus(res) {
			if (res.canceled_at) {
				return { color: '#FAB0B0', info: 'CANCELADA' };
			}

			if (!res.start_date && !res.end_date) {
				return { color: '#F0F0DF', info: 'PENDENTE' };
			}

			if (res.start_date && !res.end_date) {
				return { color: '#BAD2FF', info: 'RETIRADA' };
			}

			return { color: '#DFF0DF', info: 'ENTREGUE' };
		}

		async function loadOrders() {
			try {
				let response = [];
				if (filter) {
					response = await api.get('order', {
						params: {
							page,
							q: filter,
						},
					});
				} else {
					response = await api.get('order', {
						params: {
							page,
						},
					});
				}

				const count = response.data.count / 10;
				setSize(Math.ceil(count));

				const data = response.data.order.map(res => ({
					...res,
					status: verifyStatus(res),
					visible: false,
				}));

				setOrders(data);
			} catch (error) {
				toast.error('Não foi possível carregar as encomendas');
			}
		}
		loadOrders();
	}, [filter, reload, page]);

	function searchBar(data) {
		setFilter(data);
	}

	function handleToggleVisible(order) {
		const index = orders.indexOf(order);

		const data = orders.map(res => ({
			...res,
			visible: false,
		}));

		data[index].visible = !data[index].visible;
		setOrders(data);
	}

	function handleInfo() {
		setShow(!show);
	}

	async function handleDeleteOrders(id) {
		async function handleDelete() {
			try {
				const response = await api.delete(`order/${id}`);
				if (response.status === 200) {
					toast.success('Encomenda cancelada');
					setReload(true);
				} else {
					toast.error('Não foi possível cancelar a encomenda');
					setReload(true);
				}
			} catch (error) {
				toast.error('Não foi possível cancelar a encomenda');
				setReload(true);
			}
		}

		function handleCloseConfirmDialog() {
			const data = orders.map(res => ({
				...res,
				visible: false,
			}));
			setOrders(data);
			setReload(true);
		}

		const result = window.confirm(
			`Tem certeza que deseja cancelar a encomenda ${formatId(id)}`
		);
		if (result) {
			handleDelete();
			handleCloseConfirmDialog();
		} else {
			handleCloseConfirmDialog();
		}
	}

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<>
			<AboveComponent
				getFilter={searchBar}
				title="Gerenciando encomendas"
				path="/register/order"
				placeholder="Buscar por encomenda"
			/>

			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Destinatário</th>
						<th>Entregador</th>
						<th>Cidade</th>
						<th>Estado</th>
						<th>Status</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<tr key={order.id}>
							<td>{formatId(order.id)}</td>
							<td>{order.recipient.name}</td>
							<td>
								<div className="deliveryman">
									<img
										src={
											order.deliverymans.avatar
												? order.deliverymans.avatar.url
												: 'https://api.adorable.io/avatars/55/abott@adorable.png'
										}
										alt=""
									/>
									<span>{order.deliverymans.name}</span>
								</div>
							</td>
							<td>{order.recipient.city}</td>
							<td>{order.recipient.state}</td>
							<td>
								<div>
									<Status color={order.status.color}>
										<p>{order.status.info}</p>
									</Status>
								</div>
							</td>
							<td>
								<button type="button" onClick={() => handleToggleVisible(order)}>
									<MdMoreHoriz className="active" size={24} color="#C6C6C6" />
								</button>
								<Action>
									<ActionList visible={order.visible}>
										<button type="button" onClick={() => handleInfo()}>
											<MdRemoveRedEye size={15} color="#8E5BE8" />
											<span>Visualizar</span>
											{show ? <ModalComponent order={order} /> : ''}
										</button>
										<button type="button">
											<Link
												to={{
													pathname: '/edit/order',
													state: { orderId: order.id, orderProduct: order.product },
												}}
											>
												<MdModeEdit size={15} color="#4D85EE" />
												<span>Editar</span>
											</Link>
										</button>
										<button type="button" onClick={() => handleDeleteOrders(order.id)}>
											<MdDeleteForever size={15} color="#DE3B3B" />
											<span>Excluir</span>
										</button>
									</ActionList>
								</Action>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Footer>
				<Pagination
					count={size}
					page={page}
					variant="outlined"
					color="primary"
					onChange={handleChange}
				/>
			</Footer>
		</>
	);
}
