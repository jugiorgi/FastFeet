import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
	flex: 1;
	margin: auto;
`;

export const FormInput = styled.View`
	padding: 10px;
	margin-top: -80px;
	height: 40%;
	max-width: 90%;
	min-width: 90%;
	border-radius: 5px;
	background: #fff;
	border: 1px solid #0000001a;

	text-align: left;
`;

export const SubmitButton = styled(Button)``;
