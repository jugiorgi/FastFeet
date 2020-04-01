import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	margin-top: 20px;
	display: block;
	margin-left: 10%;
	margin-right: 10%;

	h1 {
		font-size: 24px;
		font-weight: bold;
	}
`;

export const Content = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	div {
		display: flex;
		width: 250px;
		height: 35px;
		padding: 5px 10px;
		background: #fff;
		border-radius: 5px;
		border: 1px solid ${darken(0.05, '#eee')};
		position: relative;
		top: 2px;

		button {
			background: none;
			border: none;
		}
	}

	input {
		width: 200px;
		height: 30px;
		padding: 5px;
		border: 0;
		border-radius: 5px;
		position: absolute;
		right: 0;
		top: 0;
	}

	a {
		display: flex;
		align-items: center;
		padding: 5px 10px;
		background: #7d40e7;
		border: 0;
		border-radius: 5px;
		color: white;
		text-transform: uppercase;
		font-weight: bold;
		height: 35px;

		&:hover {
			background: ${darken(0.05, '#7D40E7')};
		}
	}
`;
