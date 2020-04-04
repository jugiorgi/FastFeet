import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, color, ...rest }) {
	return (
		<Container color={color} {...rest}>
			{loading ? (
				<ActivityIndicator size="small" color="#FFF" />
			) : (
				<Text>{children}</Text>
			)}
		</Container>
	);
}

Button.propTypes = {
	children: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	color: PropTypes.string.isRequired,
};

Button.defaultProps = {
	loading: false,
};
