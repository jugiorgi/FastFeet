import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dateFormat from '~/utils/dateFormat';

import Background from '~/components/Background';
import {
	DeliveryDetails,
	DeliveryInformation,
	DeliverySituation,
	Header,
	HeaderTitle,
	Title,
	Information,
	Dates,
	Space,
	DeliveryActions,
	Action,
	Description,
} from './styles';

export default function Details({ navigation }) {
	const [state, setState] = useState('');
	const order = navigation.getParam('data');

	useEffect(() => {
		if (!order.start_date && !order.end_date) {
			setState('Pendente');
		} else if (order.start_date && !order.end_date) {
			setState('Retirada');
		} else if (order.start_date && order.end_date) {
			setState('Entregue');
		} else {
			setState('Cancelada');
		}
	}, [state, order.start_date, order.end_date]);

	return (
		<>
			<Background />
			<DeliveryDetails>
				<DeliveryInformation>
					<Header>
						<Icon name="local-shipping" size={30} color="#7D40E7" />
						<HeaderTitle>Informações da entrega</HeaderTitle>
					</Header>

					<Title>DESTINATÁRIO</Title>
					<Information>{order.recipient.name}</Information>

					<Title>ENDEREÇO DE ENTREGA</Title>
					<Information>
						{`${order.recipient.street}, ${order.recipient.number}`}
						{order.recipient.complement ? `, ${order.recipient.complement}` : ''}
						{`, ${order.recipient.city} - ${order.recipient.state}, ${order.recipient.zip_code}`}
					</Information>

					<Title>PRODUTO</Title>
					<Information>{order.product}</Information>
				</DeliveryInformation>
				<DeliverySituation>
					<Header>
						<Icon name="local-shipping" size={30} color="#7D40E7" />
						<HeaderTitle>Situação da entrega</HeaderTitle>
					</Header>

					<Title>STATUS</Title>
					<Information>{state}</Information>

					<Dates>
						<Space>
							<Title>DATA DE RETIRADA</Title>
							<Information>
								{order.start_date ? dateFormat(order.start_date) : '--/--/--'}
							</Information>
						</Space>

						<Space>
							<Title>DATA DE ENTREGA</Title>
							<Information>
								{order.end_date ? dateFormat(order.end_date) : '--/--/--'}
							</Information>
						</Space>
					</Dates>
				</DeliverySituation>

				<DeliveryActions>
					<Action
						onPress={() => navigation.navigate('NewProblem', { id: order.id })}
					>
						<Icon name="highlight-off" size={30} color="#E74040" />
						<Description>{`Informar \nProblemas`}</Description>
					</Action>
					<Action onPress={() => navigation.navigate('Problems', { id: order.id })}>
						<Icon name="info-outline" size={30} color="#E7BA40" />
						<Description>{`Visualizar \nProblemas`} </Description>
					</Action>
					<Action onPress={() => navigation.navigate('Confirm', { id: order.id })}>
						<Icon name="alarm-on" size={30} color="#7D40E7" />
						<Description>{`Confirmar \nEntrega`} </Description>
					</Action>
				</DeliveryActions>
			</DeliveryDetails>
		</>
	);
}

Details.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Detalhes da encomenda',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Dashboard');
			}}
		>
			<Icon name="chevron-left" size={30} color="#fff" />
		</TouchableOpacity>
	),
});
