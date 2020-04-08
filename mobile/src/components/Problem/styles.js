import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	margin: 10px auto;
	padding: 20px;
	width: 90%;
	min-height: 80px;
	height: auto;
	background: #fff;
	border-radius: 4px;
	border: 1px solid #0000001a;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Description = styled.Text`
	font-size: 16px;
	color: #999999;
`;

export const Date = styled.Text`
	font-size: 12px;
	color: #c1c1c1;
`;
