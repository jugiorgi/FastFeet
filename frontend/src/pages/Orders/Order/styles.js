import styled from 'styled-components';
import { darken, lighten } from 'polished';

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
		vertical-align: center;

		img {
			height: 30px;
			width: 30px;
			border-radius: 50%;
			align-self: center;
		}

		span {
			margin-left: 10px;
			vertical-align: baseline;
		}

		div {
			margin-top: auto;
			display: flex;
			align-items: center;
			justify-content: center;

			.modal-content {
				flex-direction: column;

				div {
					align-items: start;
				}

				img {
					margin-top: 10px;
					height: auto;
					width: 80%;
					background: none;
					border-radius: 0;
				}
			}
		}

		button {
			border: 0;
			background: 0;
		}

		.deliveryman {
			justify-content: start;
			margin-left: 30%;
			width: 150px;
		}
	}
`;

export const Status = styled.div`
	background: ${props => props.color};
	border-radius: 5px;
	color: ${props => darken(0.4, props.color)};
	font-weight: bold;
	align-self: center;
	padding: 3px;
	width: 110px;

	p {
		margin-left: 5px;
	}

	&::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: ${props => darken(0.5, props.color)};
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

		a {
			width: 100%;
			color: #5f5f5f;
			font-size: 12px;
			text-align: start;
			display: flex;
			align-items: center;
		}
	}

	&::before {
		content: '';
		position: absolute;
		left: calc(50% - 7px);
		top: -7px;
		width: 0;
		height: 0;
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
