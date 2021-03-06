import styled from 'styled-components';
import { lighten } from 'polished';

export const Table = styled.table`
	width: 80%;
	padding: 0;
	margin: auto;
	border: none;
	border-collapse: separate;
	border-spacing: 0 10px;
	text-align: center;
	margin-bottom: 12%;

	th {
		background: #f5f5f5;
	}

	tr {
		height: 50px;
		margin-top: 30px;
		text-align: center;
		background: #fff;
	}

	td {
		width: auto;

		button {
			border: 0;
			background: 0;
		}
	}
`;

export const Action = styled.div`
	position: relative;
`;

export const ActionList = styled.div`
	visibility: ${props => (props.visible ? 'initial' : 'hidden')};

	display: flex;
	flex-direction: column;
	position: absolute;
	width: 120px;
	left: calc(50% - 60px);
	top: calc(100% + 5px);
	background: #fff;
	border: 1px solid #eee;
	border-radius: 4px;

	button {
		width: 100%;
		padding: 5px 10px;
		color: #5f5f5f;
		font-size: 12px;
		text-align: start;
		display: flex;
		align-items: center;

		& + button {
			margin-top: 2px;
			border-top: 1px solid #eee;
		}

		span {
			color: #5f5f5f;
			margin-left: 4px;
		}
	}

	&::before {
		content: '';
		position: absolute;
		left: calc(50% - 7px);
		top: -7px;
		width: 0;
		height: 0;
		color: #5f5f5f;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-bottom: 7px solid #eee;
	}
`;

export const Footer = styled.div`
	position: fixed;
	right: 0;
	height: 15%;
	bottom: 0;
	width: 100%;
	background: #f5f5f5;
	padding: 10px;

	.MuiPagination-ul {
		justify-content: center;
	}

	.MuiPaginationItem-root {
		color: #7d40e7;
		background-color: #dddbff;
		border: 1px solid #7d40e7;
	}

	.MuiPaginationItem-outlinedPrimary.Mui-selected {
		color: #fff;
		border: 1px solid #7d40e7;
		background-color: ${lighten(0.2, '#7D40E7')};
	}
`;
