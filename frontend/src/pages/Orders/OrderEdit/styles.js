import styled from 'styled-components';

export const AboveForms = styled.div`
	margin-top: 20px;
	display: block;
	margin-left: 10%;
	margin-right: 10%;
	display: flex;
	justify-content: space-between;

	h1 {
		font-size: 24px;
		font-weight: bold;
	}

	div {
		margin-top: 20px;
		display: flex;
		align-items: center;

		button {
			background: #cccccc;
			color: #fff;
			height: 30px;
			width: 100px;
			border: 0;
			border-radius: 4px;
			text-align: center;
			display: flex;
			align-items: center;
			padding: 5px 10px;

			span {
				margin-left: 5px;
			}
		}

		.save {
			margin-left: 10px;
			background: #7d40e7;
		}
	}
`;

export const FormContent = styled.div`
	display: flex;
	margin: auto;
	margin-top: 20px;
	padding: 30px;
	width: 80%;
	height: auto;
	background: #fff;
	border-radius: 5px;

	.form {
		width: 100%;

		label {
			font: 14px 'Roboto', sans-serif;
			font-weight: bold;
		}

		.select:before,
		.select:after {
			content: '';
			display: table;
		}

		.select:after {
			clear: both;
		}

		.destinatario {
			position: relative;
			border-width: 2px;
			width: 48%;
			height: 80px;
			float: left;
		}

		.entregador {
			position: relative;
			border-width: 2px;
			width: 48%;
			height: 80px;
			float: right;
		}
	}

	.produto {
		input {
			width: 100%;
			margin-top: 10px;
			background-color: hsl(0, 0%, 100%);
			border-color: hsl(0, 0%, 80%);
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			height: 38px;
			padding: 10px;
		}
	}
`;
