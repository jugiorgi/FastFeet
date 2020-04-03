import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

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
					},
					{
						resetOnBlur: true,
						tabBarOptions: {
							keyboardHidesTabBar: true,
							activeTintColor: '#FFF',
							inactiveTintColor: 'rgba(255,255,255,0.6)',
							style: {
								backgroundColor: '#7d40e7',
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
