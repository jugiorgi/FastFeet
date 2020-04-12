import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import api from '~/services/api';
import Background from '~/components/Background';
import {
	Container,
	CameraContent,
	BodyContent,
	SubmitButton,
	TakePhotoButton,
} from './styles';

export default function Confirm({ navigation }) {
	const order_id = navigation.getParam('id');
	const [camera, setCamera] = useState(null);
	const [path, setPath] = useState('');

	async function takePicture() {
		try {
			if (camera) {
				const options = {
					quality: 0.5,
					base64: true,
					forceUpOrientation: true,
					fixOrientation: true,
				};
				const data = await camera.takePictureAsync(options);
				setPath(data.uri);
			}
		} catch (error) {
			Alert.alert('Não foi possível a captura da imagem', 'Tente novamente');
		}
	}

	async function handleSubmit() {
		try {
			const data = new FormData();

			data.append('file', {
				uri: path,
				name: 'teste.png',
				type: 'image/jpg',
			});

			const response = await api.post('/files', data);

			if (response.data.id) {
				await api.put(`order/${order_id}`, {
					signature_id: response.data.id,
				});

				navigation.navigate('Details');
			}
		} catch (error) {
			Alert.alert(
				'Não foi possível enviar a confirmação da entrega da encomenda',
				'Tente novamente'
			);
		}
	}

	return (
		<>
			<Background />
			<Container>
				<CameraContent>
					<RNCamera
						ref={(ref) => setCamera(ref)}
						style={{ flex: 1 }}
						captureAudio={false}
					/>
				</CameraContent>
				<BodyContent>
					<TakePhotoButton onPress={takePicture}>
						<Icon name="camera-alt" size={30} color="#FFF" />
					</TakePhotoButton>
					<SubmitButton color="#7D40E7" onPress={handleSubmit}>
						Enviar
					</SubmitButton>
				</BodyContent>
			</Container>
		</>
	);
}

Confirm.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Confirmar entrega',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Details');
			}}
		>
			<Icon name="chevron-left" size={30} color="#fff" />
		</TouchableOpacity>
	),
});
