import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import Pagination from '@material-ui/lab/Pagination';
import AboveComponent from '~/components/AboveComponent';
import api from '~/services/api';
import formatId from '~/util/format';

import { Table, Action, ActionList, Footer } from './styles';

export default function Deliverymans() {
	const [filter, setFilter] = useState(false);
	const [reload, setReload] = useState(false);
	const [deliverymans, setDeliverymans] = useState([]);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);

	useEffect(() => {
		setReload(false);
		async function loadDeliverymans() {
			try {
				let response = [];
				if (filter) {
					response = await api.get('deliveryman', {
						params: {
							page,
							q: filter,
						},
					});
				} else {
					response = await api.get('deliveryman', {
						params: {
							page,
						},
					});
				}

				const count = response.data.count / 10;
				setSize(Math.ceil(count));

				const data = response.data.deliveryman.map(res => ({
					...res,
					visible: false,
				}));

				setDeliverymans(data);
			} catch (error) {
				toast.error('Não foi possível carregar os entregadores');
			}
		}
		loadDeliverymans();
	}, [filter, reload, page]);

	function searchBar(data) {
		setFilter(data);
	}

	function handleToggleVisible(deliveryman) {
		const index = deliverymans.indexOf(deliveryman);

		const data = deliverymans.map(res => ({
			...res,
			visible: false,
		}));

		data[index].visible = !data[index].visible;
		setDeliverymans(data);
	}

	async function handleDeleteDeliverymans(id, name) {
		async function handleDelete() {
			try {
				const response = await api.delete(`deliveryman/${id}`);
				if (response) {
					toast.success('Entregador removido');
					setReload(true);
				} else {
					toast.error('Não foi possível remover o entregador');
					setReload(true);
				}
			} catch (error) {
				toast.error('Não foi possível remover o entregador');
				setReload(true);
			}
		}

		function handleCloseConfirmDialog() {
			const data = deliverymans.map(res => ({
				...res,
				visible: false,
			}));
			setDeliverymans(data);
			setReload(true);
		}

		const result = window.confirm(
			`Tem certeza que deseja remover o entregador ${name}?`
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
				title="Gerenciando entregadores"
				path="/register/deliveryman"
				placeholder="Buscar por entregadores"
			/>

			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Foto</th>
						<th>Nome</th>
						<th>Email</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{deliverymans.map(deliveryman => (
						<tr key={deliveryman.id}>
							<td>{formatId(deliveryman.id)}</td>
							<td>
								<img
									src={
										deliveryman.avatar
											? deliveryman.avatar.url
											: 'https://api.adorable.io/avatars/55/abott@adorable.png'
									}
									alt={deliveryman.id}
								/>
							</td>
							<td>
								<div>
									<span>{deliveryman.name}</span>
								</div>
							</td>
							<td>
								<div>
									<span>{deliveryman.email}</span>
								</div>
							</td>
							<td>
								<button type="button" onClick={() => handleToggleVisible(deliveryman)}>
									<MdMoreHoriz className="active" size={24} color="#C6C6C6" />
								</button>
								<Action>
									<ActionList visible={deliveryman.visible}>
										<button type="button">
											<Link
												to={{
													pathname: '/edit/deliveryman',
													state: {
														deliverymanId: deliveryman.id,
														deliverymanName: deliveryman.name,
														deliverymanEmail: deliveryman.email,
														deliverymanAvatar: deliveryman.avatar.url,
													},
												}}
											>
												<MdModeEdit size={15} color="#4D85EE" />
												<span>Editar</span>
											</Link>
										</button>
										<button
											type="button"
											onClick={() =>
												handleDeleteDeliverymans(deliveryman.id, deliveryman.name)
											}
										>
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
