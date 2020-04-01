import React, { useState, useRef, useEffect } from 'react';
import { MdImage } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import { Container, Photo } from './styles';

export default function AvatarInput() {
	const { defaultValue, registerField } = useField('avatar');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);

	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'avatar_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref, registerField]);

	async function handleChange(e) {
		const data = new FormData();

		data.append('file', e.target.files[0]);

		const response = await api.post('files', data);

		const { id, url } = response.data;

		setFile(id);
		setPreview(url);
	}

	return (
		<Container>
			<label htmlFor="avatar">
				{preview ? (
					<Photo>
						<img
							src={preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'}
							alt="Avatar"
						/>
					</Photo>
				) : (
					<Photo>
						<div className="deliverymanAvatar">
							<MdImage size={50} color="#dddddd" />
						</div>
						<div>
							<label>Adicionar foto</label>
						</div>
					</Photo>
				)}

				<input
					type="file"
					id="avatar"
					accept="image/*"
					data-file={file}
					onChange={handleChange}
					ref={ref}
				/>
			</label>
		</Container>
	);
}
