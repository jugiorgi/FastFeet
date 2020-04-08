import styled from 'styled-components/native';

export const DeliveryDetails = styled.SafeAreaView`
	margin: 10px auto;
	background: #fff;
	width: 100%;
	height: 100%;
`;

export const DeliveryInformation = styled.View`
	margin: 10px auto;
	padding: 10px;
	margin-top: -80px;
	height: 30%;
	max-width: 90%;
	min-width: 90%;
	border-radius: 5px;
	background: #fff;
	border: 1px solid #0000001a;
`;

export const DeliverySituation = styled.View`
	margin: 10px auto;
	padding: 10px;
	margin-top: 20px;
	height: 25%;
	max-width: 90%;
	min-width: 90%;
	background: #fff;
	border-radius: 5px;
	border: 1px solid #0000001a;
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const HeaderTitle = styled.Text`
	margin-left: 10px;
	color: #7d40e7;
	font-size: 16px;
	font-weight: bold;
`;

export const Title = styled.Text`
	margin-left: 5px;
	margin-top: 15px;
	font-size: 16px;
	font-weight: bold;
	color: #999999;
`;

export const Information = styled.Text`
	margin-left: 5px;
	color: #666666;
`;

export const Dates = styled.View`
	margin: 0 -25px;
	flex-direction: row;
	justify-content: space-around;
`;

export const Space = styled.View``;

export const DeliveryActions = styled.View`
	margin: 10px auto;
	margin-top: 20px;
	height: 15%;
	max-width: 90%;
	min-width: 90%;
	background: #f8f9fd;
	border-radius: 5px;
	border: 1px solid #0000001a;

	flex-direction: row;
	justify-content: space-around;
`;

export const Action = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`;

export const Description = styled.Text`
	color: #999999;
	text-align: center;
`;
