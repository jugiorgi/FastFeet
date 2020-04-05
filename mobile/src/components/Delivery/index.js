import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dateFormat from '~/utils/dateFormat';
import {
	Container,
	Status,
	Title,
	DeliveryId,
	Body,
	Circle,
	Line,
	Details,
	BodyDescription,
	Information,
	Space,
	InformationTitle,
	InformationDetail,
	DetailsButton,
	More,
} from './styles';

function Delivery({ data, navigation }) {
	const [state, setState] = useState('');

	useEffect(() => {
		if (!data.start_date && !data.end_date) {
			setState('aguardando');
		} else if (data.start_date && !data.end_date) {
			setState('retirada');
		} else {
			setState('entregue');
		}
	}, [state, data.start_date, data.end_date]);

	return (
		<Container>
			<Status>
				<Title>
					<Icon name="local-shipping" size={30} color="#7D40E7" />
					<DeliveryId>Encomenda {data.id}</DeliveryId>
				</Title>
				<Body>
					<Circle
						paint={
							state === 'aguardando' || state === 'retirada' || state === 'entregue'
						}
					/>
					<Line />
					<Circle paint={state === 'retirada' || state === 'entregue'} />
					<Line />
					<Circle paint={state === 'entregue'} />
				</Body>
				<Details>
					<BodyDescription>{`Aguardando \nRetirada`}</BodyDescription>
					<BodyDescription>Retirada</BodyDescription>
					<BodyDescription>Entregue</BodyDescription>
				</Details>
			</Status>
			<Information>
				<Space>
					<InformationTitle>Data</InformationTitle>
					<InformationDetail>{dateFormat(data.createdAt)}</InformationDetail>
				</Space>
				<Space>
					<InformationTitle>Cidade</InformationTitle>
					<InformationDetail>{data.recipient.city}</InformationDetail>
				</Space>
				<DetailsButton onPress={() => navigation.navigate('Details', { data })}>
					<More>Ver detalhes</More>
				</DetailsButton>
			</Information>
		</Container>
	);
}
export default withNavigation(Delivery);
