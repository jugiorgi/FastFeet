import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
	flex: 1;
	background: #fff;
	width: 100%;
	height: 100%;
`;

export const FormInput = styled.TextInput.attrs({
	placeholderTextColor: '#999999',
	textAlignVertical: 'top',
	numberOfLines: 40,
})`
	margin: -60px auto;
	border-width: 1px;
	border-radius: 5px;
	background: #fff;
	border: 1px solid #0000001a;
	height: 60%;
	max-width: 90%;
	min-width: 90%;
	padding: 20px;
	font-size: 18px;
	color: #999999;
	text-align: left;
`;

export const SubmitButton = styled(Button)`
	margin: auto;
	margin-top: 100px;
	width: 90%;
`;
