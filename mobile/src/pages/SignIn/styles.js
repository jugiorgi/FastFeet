import styled from 'styled-components/native';
import { Platform } from 'react-native';

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
`;

export const Form = styled.TextInput``;

export const FormInput = styled.View``;

export const SubmitButton = styled.TouchableOpacity`
	height: 46px;
	background: #3b9eff;
	border-radius: 4px;

	align-items: center;
	justify-content: center;
`;
