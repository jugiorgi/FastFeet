import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
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
						Dashboard,
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
