import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function AboveComponent({
	getFilter,
	title,
	placeholder,
	path,
}) {
	function handleSubmit(data) {
		const { filter } = data;

		getFilter(filter);
	}

	return (
		<Container>
			<h1>{title}</h1>

			<Content>
				<Form onSubmit={handleSubmit}>
					<div>
						<button type="submit">
							<MdSearch size={24} color="#999" />
						</button>
						<Input name="filter" placeholder={placeholder} />
					</div>
				</Form>
				<Link to={path}>
					<MdAdd size={20} color="#fff" />
					Cadastrar
				</Link>
			</Content>
		</Container>
	);
}

AboveComponent.propTypes = {
	getFilter: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
};
