import React from 'react';
import PropTypes from 'prop-types';

import dateFormat from '~/util/dateFormat';

import { Component, ModalHeader, ModalDates, ModalSignature } from './styles';

export default function ModalComponent({ order }) {
	return (
		<Component>
			<div className="modal">
				<div className="modal-content">
					<ModalHeader>
						<strong>Informações da encomenda</strong>
						<p>
							{order.recipient.street}, {order.recipient.number}
							{order.recipient.complement ? `, ${order.recipient.complement}` : ''}
						</p>
						<p>
							{order.recipient.city} - {order.recipient.state}
						</p>
						<p>{order.recipient.zip_code}</p>
					</ModalHeader>

					<ModalDates>
						<strong>Datas</strong>
						<div>
							<p>Retirada: </p>
							{order.start_date
								? dateFormat(order.start_date)
								: 'A encomenda ainda não foi retirada'}
						</div>
						<div>
							<p>Retirada: </p>
							{order.end_date
								? dateFormat(order.end_date)
								: 'A encomenda ainda não foi entregue'}
						</div>
					</ModalDates>

					<ModalSignature>
						<strong>Assinatura do destinatário</strong>
						{order.signature ? (
							<img src={order.signature.url} alt="signature" />
						) : (
							'O destinatário não assinou'
						)}
					</ModalSignature>
				</div>
			</div>
		</Component>
	);
}

ModalComponent.propTypes = {
	order: PropTypes.shape({
		recipient: PropTypes.shape({
			street: PropTypes.string,
			number: PropTypes.string,
			city: PropTypes.string,
			state: PropTypes.string,
			complement: PropTypes.string,
			zip_code: PropTypes.string,
		}),
		signature: PropTypes.shape({
			url: PropTypes.string,
		}),
		start_date: PropTypes.string,
		end_date: PropTypes.string,
	}).isRequired,
};
