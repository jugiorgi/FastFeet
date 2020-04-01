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
	}

	.nome {
		display: flex;

		input {
			width: 100%;
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: hsl(0, 0%, 100%);
			border-color: hsl(0, 0%, 80%);
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			height: 38px;
			padding: 10px;
		}

		#name {
			width: 49%;
			position: left;
		}

		#mail {
			width: 49%;
			position: right;
			margin-left: 2%;
		}
	}

	.rua {
		display: flex;

		input {
			width: 100%;
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: hsl(0, 0%, 100%);
			border-color: hsl(0, 0%, 80%);
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			height: 38px;
			padding: 10px;
		}

		#street {
			width: 56%;
			position: left;
		}

		#number {
			width: 20%;
			position: center;
			margin-left: 2%;
		}

		#complement {
			width: 20%;
			position: right;
			margin-left: 2%;
		}
	}

	.cidade {
		display: flex;

		input {
			width: 100%;
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: hsl(0, 0%, 100%);
			border-color: hsl(0, 0%, 80%);
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			height: 38px;
			padding: 10px;
		}

		#city {
			width: 32%;
			position: left;
		}

		#state {
			width: 32%;
			position: center;
			margin-left: 2%;
		}

		#zip_code {
			width: 32%;
			position: right;
			margin-left: 2%;
		}
	}
`;
