import styled from 'styled-components';

export const Component = styled.div`
	.modal {
		position: fixed;
		z-index: 1;
		padding-top: 100px;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		position: relative;
		background-color: #fefefe;
		margin: auto;
		padding: 10px;
		border: 1px solid #888;
		height: auto;
		width: 400px;
		border-radius: 4px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		-webkit-animation-name: animatetop;
		-webkit-animation-duration: 0.4s;
		animation-name: animatetop;
		animation-duration: 0.4s;
		font-size: 16px;
		justify-content: flex-start;
		align-items: baseline;
	}

	@-webkit-keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}

	@keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
`;

export const ModalDetails = styled.div`
	margin-left: 0;
	padding: 15px;
	display: flex;
	position: relative;
	flex-direction: column;
`;

export const ModalHeader = styled.div`
	flex-direction: column;
	border-bottom: 1px solid #eee;
	width: 100%;
	padding: 5px;

	strong {
		margin: 10 0px;
	}
`;

export const ModalDates = styled.div`
	flex-direction: column;
	border-bottom: 1px solid #eee;
	width: 100%;
	padding: 5px 10px;

	strong {
		margin: 10 0px;
	}

	p {
		font-weight: bold;
		margin-right: 10px;
	}
`;

export const ModalSignature = styled.div`
	flex-direction: column;

	strong {
		padding: 5px;
	}
`;
