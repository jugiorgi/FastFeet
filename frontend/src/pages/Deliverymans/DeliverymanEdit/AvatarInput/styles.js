import styled from 'styled-components';

export const Container = styled.div`
	align-self: center;
	margin-bottom: 30px;

	label {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		img {
			height: 150px;
			width: 150px;
			border-radius: 50%;
			border: 1px solid #dddddd;
			background: #eee;
		}

		input {
			display: none;
		}
	}

	.deliverymanAvatar {
		margin-top: 20%;
	}
`;

export const Photo = styled.div`
	height: 150px;
	width: 150px;
	margin: auto;
	border-radius: 50%;
	border: 1px dashed #dddddd;
	margin-bottom: 50px;
	color: #dddddd;
	text-align: center;

	div {
		margin: auto;
	}
`;
