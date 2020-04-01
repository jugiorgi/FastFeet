import React from 'react';
import PropTypes from 'prop-types';

import { Component, Scroll } from './styles';

export default function ModalComponent({ problem }) {
	return (
		<Component>
			<div className="modal">
				<div className="modal-content">
					<strong>VISUALIZAR PROBLEMA</strong>
					<Scroll>
						<p>{problem}</p>
					</Scroll>
				</div>
			</div>
		</Component>
	);
}

ModalComponent.propTypes = {
	problem: PropTypes.string.isRequired,
};
