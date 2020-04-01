import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
	height: 64px;
	background: #fff;
	padding: 0 30px;
	box-shadow: 0 1px ${darken(0.1, '#F5F5F5')};
`;

export const Content = styled.div`
	height: 64px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	nav {
		display: flex;
		align-items: center;

		img {
			width: 135px;
			margin-right: 20px;
			padding-right: 20px;
			border-right: 1px solid #eee;
		}

		a + a {
			margin-left: 20px;
		}

		a {
			font-weight: bold;
			color: #999999;
		}

		a:hover {
			color: #444444;
		}
	}

	aside {
		display: flex;
		align-items: center;
	}
`;

export const Profile = styled.div`
	display: flex;
	margin-left: 20px;
	padding-left: 20px;

	div {
		text-align: center;
		margin-right: 10px;

		strong {
			display: block;
			color: #333;
		}

		button {
			display: block;
			background: none;
			border: none;
			margin-top: 2px;
			font-size: 12px;
			color: #de3b3b;
		}
	}
`;
