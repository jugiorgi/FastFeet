import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
	MdMoreHoriz,
	MdRemoveRedEye,
	MdDeleteForever,
	MdClear,
} from 'react-icons/md';
import Pagination from '@material-ui/lab/Pagination';
import ModalComponent from './Modal';
import api from '~/services/api';
import formatId from '~/util/format';

import { Header, Action, ActionList, Table, Footer } from './styles';

export default function Problems() {
	const [problems, setProblems] = useState([]);
	const [reload, setReload] = useState(false);
	const [show, setShow] = useState(false);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);

	useEffect(() => {
		setReload(false);

		async function loadProblems() {
			try {
				const response = await api.get('/delivery/problems', {
					params: {
						page,
					},
				});

				const count = response.data.count / 10;
				setSize(Math.ceil(count));

				const data = response.data.problems.map(res => ({
					...res,
					visible: false,
				}));

				setProblems(data);
			} catch (error) {
				toast.error('Não foi possível carregar os problemas');
			}
		}
		loadProblems();
	}, [reload, page]);

	function handleToggleVisible(problem) {
		const index = problems.indexOf(problem);

		const data = problems.map(res => ({
			...res,
			visible: false,
		}));

		data[index].visible = !data[index].visible;
		setProblems(data);
	}

	async function handleDeleteProblems(id) {
		async function handleDelete() {
			try {
				const response = await api.delete(`/problem/${id}/cancel-delivery`);
				if (response) {
					toast.success('Encomenda cancelada');
					setReload(true);
				}
			} catch (error) {
				toast.error('Não foi possível cancelar a encomenda');
				setReload(true);
			}
		}

		function handleCloseConfirmDialog() {
			const data = problems.map(res => ({
				...res,
				visible: false,
			}));
			setProblems(data);
			setReload(true);
		}

		const result = window.confirm(
			`Tem certeza que deseja remover o problema ${formatId(id)}?`
		);
		if (result) {
			handleDelete();
			handleCloseConfirmDialog();
		} else {
			handleCloseConfirmDialog();
		}
	}

	function handleInfo() {
		setShow(!show);
	}

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<>
			<Header>
				<h1>Problemas na entrega</h1>
			</Header>

			<Table>
				<thead>
					<tr>
						<th>Encomenda</th>
						<th>
							<div className="problem">Problema</div>
						</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{problems.map(problem => (
						<tr key={problem.id}>
							<td>
								{problem.order_id ? (
									formatId(problem.order_id)
								) : (
									<MdClear size={20} color="#ff0000" />
								)}
							</td>
							<td>
								<div className="problem">
									<span>{problem.description}</span>
								</div>
							</td>
							<td>
								<div className="acoes">
									<button type="button" onClick={() => handleToggleVisible(problem)}>
										<MdMoreHoriz className="active" size={24} color="#C6C6C6" />
									</button>
									<Action>
										<ActionList visible={problem.visible}>
											<button type="button" onClick={() => handleInfo()}>
												<MdRemoveRedEye size={15} color="#4D85EE" />
												<span>Visualizar</span>
												{show ? <ModalComponent problem={problem.description} /> : ''}
											</button>
											<button
												type="button"
												onClick={() => handleDeleteProblems(problem.order_id)}
											>
												<MdDeleteForever size={15} color="#DE3B3B" />
												<span>Cancelar encomenda</span>
											</button>
										</ActionList>
									</Action>
								</div>
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
