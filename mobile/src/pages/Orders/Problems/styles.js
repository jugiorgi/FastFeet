import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background: #fff;
	width: 100%;
	height: 100%;
`;

export const DeliveryTitle = styled.Text`
	margin: -100px auto;
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`;

export const List = styled.FlatList.attrs({
	showVerticalScrollIndicator: false,
})`
	margin-top: 120px;
	width: 100%;
`;
