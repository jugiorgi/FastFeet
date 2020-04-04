import styled from 'styled-components/native';

export const Container = styled.View`
	margin: 10px auto;
	height: 200px;
	width: 90%;
	border-radius: 4px;
	border: 1px solid #0000001a;
`;

export const Status = styled.View`
	height: 70%;
	padding: 20px;
`;

export const Title = styled.View`
	display: flex;
	align-items: center;
	flex-direction: row;
	height: 30%;
`;

export const DeliveryId = styled.Text`
	margin-left: 15px;
	font-size: 16px;
	font-weight: bold;
	color: #7d40e7;
`;

export const Body = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 10px;
	margin: 0 20px;
	margin-top: 10px;
`;

export const Circle = styled.View`
	z-index: 1;
	border: 1px solid #7d40e7;
	background: ${(props) => (props.paint ? '#7d40e7' : '#FFF')};
	height: 10px;
	width: 10px;
	border-radius: 10px;
`;

export const Line = styled.View`
	background: #7d40e7;
	height: 2px;
	width: 140px;
`;

export const Details = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const BodyDescription = styled.Text`
	color: #999999;
	font-size: 12px;
`;

export const Information = styled.View`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: row;
	height: 30%;
	background: #7d40e71a;
`;

export const Space = styled.View``;

export const InformationTitle = styled.Text`
	color: #999999;
	font-size: 12px;
`;

export const InformationDetail = styled.Text`
	color: #444444;
	font-size: 14px;
	font-weight: bold;
`;

export const More = styled.Text`
	font-weight: bold;
	font-size: 14px;
	color: #7d40e7;
`;
