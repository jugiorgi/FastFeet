import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';

export const Background = styled.View`
	flex: 1;
	background: #7d40e7;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
	enabled: Platform.OS === 'ios',
	behavior: 'padding',
})`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 0 30px;
	height: 100%;
	width: 100%;
`;

export const Image = styled.Image`
	margin-bottom: 40px;
	height: 70px;
	width: 100%;
`;

export const FormInput = styled.TextInput`
	height: 46px;
	width: 100%;
	padding: 10px;
	border-radius: 4px;
	color: #999999;
	background: #fff;
`;

export const SubmitButton = styled(Button)`
	margin-top: 20px;
	width: 100%;
`;
