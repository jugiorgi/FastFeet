import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
`;

export const AboveComponent = styled.View`
	height: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

export const Avatar = styled.Image`
	height: 80px;
	width: 80px;
	border-radius: 40px;
`;

export const WelcomeText = styled.View`
	margin-left: -60px;
`;

export const Title = styled.Text`
	color: #666666;
	font-size: 16px;
`;

export const Name = styled.Text`
	color: #444444;
	font-size: 20px;
	font-weight: bold;
`;

export const Logout = styled.TouchableOpacity``;

export const Menu = styled.View`
	height: 5%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

export const MenuTitle = styled.Text`
	color: #444444;
	font-size: 20px;
	font-weight: bold;
`;

export const DeliveryHeader = styled.View`
	display: flex;
	flex-direction: row;
`;

export const Pending = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-right: 15px;
	text-decoration-line: ${(props) => (props.pending ? 'underline' : 'none')};
	text-decoration-style: solid;
	text-decoration-color: #7d40e7;
	color: ${(props) => (props.pending ? '#7D40E7' : '#999999')};
`;

export const HandedOut = styled.Text`
	font-size: 16px;
	font-weight: bold;
	text-decoration-line: ${(props) => (props.handedOut ? 'underline' : 'none')};
	text-decoration-style: solid;
	text-decoration-color: #7d40e7;
	color: ${(props) => (props.handedOut ? '#7D40E7' : '#999999')};
`;

export const List = styled.FlatList.attrs({
	showVerticalScrollIndicator: false,
})`
	margin-top: 20px;
	width: 100%;
`;
