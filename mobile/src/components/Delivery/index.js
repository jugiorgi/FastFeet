import React, { useMemo, useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
	More,
} from './styles';

export default function Delivery({ data }) {
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

	const dateFormatted = useMemo(
		() => format(parseISO(data.createdAt), "dd'/'MM'/'yyyy", { locale: pt }),
		[data.createdAt]
	);

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
					<InformationDetail>{dateFormatted}</InformationDetail>
				</Space>
				<Space>
					<InformationTitle>Cidade</InformationTitle>
					<InformationDetail>{data.recipient.city}</InformationDetail>
				</Space>
				<More>Ver detalhes</More>
			</Information>
		</Container>
	);
}
