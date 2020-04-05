import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Orders/Dashboard';
import Details from './pages/Orders/Details';
import NewProblem from './pages/Orders/NewProblem';
import Problems from './pages/Orders/Problems';
import Confirm from './pages/Orders/Confirm';
import Profile from './pages/Profile';

export default (signedIn = false) =>
	createAppContainer(
		createSwitchNavigator(
			{
				Sign: createSwitchNavigator({
					SignIn,
				}),
				App: createBottomTabNavigator(
					{
						New: {
							screen: createStackNavigator(
								{
									Dashboard,
									Details,
									NewProblem,
									Problems,
									Confirm,
								},
								{
									defaultNavigationOptions: {
										headerTransparent: true,
										headerTitle: '',
										headerTitleAlign: 'center',
										headerTintColor: '#fff',
										headerLeftContainerStyle: {
											marginLeft: 20,
										},
									},
								}
							),
							navigationOptions: {
								tabBarLabel: 'Encomendas',
								tabBarIcon: <Icon name="reorder" size={20} color="#7d40e7" />,
							},
						},
						Profile,
					},
					{
						resetOnBlur: true,
						tabBarOptions: {
							keyboardHidesTabBar: true,
							activeTintColor: '#7d40e7',
							inactiveTintColor: '#999999',
							style: {
								borderTopColor: '#999999',
								backgroundColor: '#FFF',
							},
						},
					}
				),
			},
			{
				initialRouteName: signedIn ? 'App' : 'Sign',
			}
		)
	);
