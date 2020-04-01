import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import Pagination from '@material-ui/lab/Pagination';
import AboveComponent from '~/components/AboveComponent';
import api from '~/services/api';
import formatId from '~/util/format';

import { Table, Action, ActionList, Footer } from './styles';

export default function Recipients() {
	const [filter, setFilter] = useState(false);
	const [reload, setReload] = useState(false);
	const [recipients, setRecipients] = useState([]);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);

	function searchBar(data) {
		setFilter(data);
	}

	useEffect(() => {
		setReload(false);
		async function loadRecipients() {
			try {
				let response = [];
				if (filter) {
					response = await api.get('recipients', {
						params: {
							page,
							q: filter,
						},
					});
				} else {
					response = await api.get('recipients', {
						params: {
							page,
						},
					});
				}

				const count = response.data.count / 10;
				setSize(Math.ceil(count));

				const data = response.data.recipients.map(res => ({
					...res,
					visible: false,
				}));

				setRecipients(data);
			} catch (error) {
				toast.error('Não foi possível carregar os destinatários');
			}
		}
		loadRecipients();
	}, [filter, reload, page]);

	function handleToggleVisible(recipient) {
		const index = recipients.indexOf(recipient);

		const data = recipients.map(res => ({
			...res,
			visible: false,
		}));

		data[index].visible = !data[index].visible;
		setRecipients(data);
	}

	async function handleDeleteRecipients(id, name) {
		async function handleDelete() {
			try {
				const response = await api.delete(`recipients/${id}`);
				if (response) {
					toast.success('Destinatário removido');
					setReload(true);
				} else {
					toast.error('Não foi possível remover o destinatário');
					setReload(true);
				}
			} catch (error) {
				toast.error('Não foi possível remover o destinatário');
				setReload(true);
			}
		}

		function handleCloseConfirmDialog() {
			const data = recipients.map(res => ({
				...res,
				visible: false,
			}));
			setRecipients(data);
			setReload(true);
		}

		const result = window.confirm(
			`Tem certeza que deseja remover o destinatário ${name}?`
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
				title="Gerenciando destinatários"
				path="/register/recipient"
				placeholder="Buscar por destinatários"
			/>

			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Endereço</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{recipients.map(recipient => (
						<tr key={recipient.id}>
							<td>{formatId(recipient.id)}</td>
							<td>
								<div className="name">
									<span>{recipient.name}</span>
								</div>
							</td>
							<td>
								<span>
									<div>
										{recipient.street}, {recipient.number},{' '}
										{recipient.complement ? `${recipient.complement}, ` : ''}
										{recipient.city} - {recipient.state}
									</div>
								</span>
							</td>
							<td>
								<button type="button" onClick={() => handleToggleVisible(recipient)}>
									<MdMoreHoriz className="active" size={24} color="#C6C6C6" />
								</button>
								<Action>
									<ActionList visible={recipient.visible}>
										<button type="button">
											<Link
												to={{
													pathname: '/edit/recipient',
													state: {
														recipient,
													},
												}}
											>
												<MdModeEdit size={15} color="#4D85EE" />
												<span>Editar</span>
											</Link>
										</button>
										<button
											type="button"
											onClick={() => handleDeleteRecipients(recipient.id, recipient.name)}
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
