import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
	flex: 1;
	background: #fff;
	justify-content: center;
	align-items: center;
	padding: 0 30px;
	height: 100%;
	width: 100%;
`;

export const Deliveryman = styled.View`
	width: 90%;
	justify-content: flex-start;
`;

export const Avatar = styled.Image`
	margin-bottom: 50px;
	height: 180px;
	width: 180px;
	border-radius: 90px;
	border: 1px solid #333;
`;

export const Title = styled.Text`
	margin-top: 20px;
	font-size: 14px;
	color: #666666;
`;

export const Description = styled.Text`
	font-size: 24px;
	font-weight: bold;
	color: #444444;
`;

export const SubmitButton = styled(Button)`
	margin-top: 40px;
	width: 90%;
`;
