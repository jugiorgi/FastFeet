import React from 'react';
import dateFormat from '~/utils/dateFormat';

import { Container, Description, Date } from './styles';

export default function Problem({ data }) {
	return (
		<Container>
			<Description>{data.description}</Description>
			<Date>{data.createdAt ? dateFormat(data.createdAt) : '--/--/--'}</Date>
		</Container>
	);
}
