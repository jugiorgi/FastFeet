import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function Select({ getValue, endpoint }) {
	async function loadOptions(inputValue, callback) {
		try {
			const response = await api.get(`/${endpoint}`);
			let data = {};

			if (endpoint === 'recipients') {
				data = response.data.recipients.map(res => ({
					value: res.id,
					label: res.name,
				}));
			} else {
				data = response.data.deliveryman.map(res => ({
					value: res.id,
					label: res.name,
				}));
			}

			setTimeout(() => {
				callback(data);
			}, 1000);
		} catch (error) {
			toast.error('Não foi possível carregar as informações');
		}
	}

	return (
		<Container>
			<AsyncSelect
				cacheOptions
				loadOptions={loadOptions}
				defaultOptions
				onChange={option => getValue(option)}
			/>
		</Container>
	);
}

Select.propTypes = {
	getValue: PropTypes.func.isRequired,
	endpoint: PropTypes.string.isRequired,
};
