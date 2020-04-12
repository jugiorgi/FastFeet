import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
	flex: 1;
	background: #fff;
	width: 100%;
	height: 100%;
`;

export const CameraContent = styled.View`
	margin: -60px auto;
	background: #fff;
	height: 95%;
	width: 90%;
`;

export const BodyContent = styled.View`
	margin: 100px auto;
	width: 90%;
	height: 5%;
	justify-content: center;
	align-items: center;
`;

export const TakePhotoButton = styled.TouchableOpacity`
	margin-top: -30%;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	border-radius: 30px;
	background: rgba(255, 255, 255, 0.5);
`;

export const SubmitButton = styled(Button)`
	margin: 20px auto;
	width: 100%;
`;
