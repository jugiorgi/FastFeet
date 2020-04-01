import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
	height: 100%;
	background: #7d40e7;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	background: #fff;
	border-radius: 3px;
	width: 100%;
	max-width: 360px;
	height: 500px;
	text-align: center;
	padding: 40px;

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		label {
			height: 19px;
			text-align: left;
			letter-spacing: 0;
			color: #444444;
			opacity: 1;
			margin: 0 0 15px;
			padding: 0 15px;
			font-weight: bold;
		}

		input {
			background: #ffffff;
			width: 280px;
			height: 45px;
			border: 1px solid #dddddd;
			border-radius: 4px;
			opacity: 1;
			margin: 0 0 15px;
			padding: 0 15px;
		}

		span {
			color: #f64c75;
			align-self: flex-start;
			margin: 0 0 10px;
		}

		div {
			display: flex;
			justify-content: space-between;
			align-items: center;

			input {
				width: 30px;
				margin: 0;
				padding: 0;
			}

			label {
				margin: 0;
				padding: 0;
				width: 300px;
				font-weight: normal;
				margin-left: 8px;
			}
		}

		button {
			background: #7d40e7;
			margin-top: 10px;
			width: 280px;
			height: 45px;
			border-radius: 4px;
			opacity: 1;
			color: #ffffff;
			border: 0;
			font-size: 16px;
			font-weight: bold;
			transition: background 0.2%;

			&:hover {
				background: ${darken(0.05, '#7D40E7')};
			}
		}
	}
`;
