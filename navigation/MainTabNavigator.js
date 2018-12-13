import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import ProspectosScreen from '../screens/ProspectosScreen';
import { white, red } from '../helpers/colors'

const ProspectosStack = createStackNavigator(
	{
		Prospectos: ProspectosScreen,
	}, 
	{
		initialRouteName: 'Prospectos',
		navigationOptions: {
			headerStyle: {
				backgroundColor: red,
			},
			headerTintColor: white,
		},
	}
)

const tabs = createMaterialTopTabNavigator(
	{
		ProspectosStack
	}
)

export default ProspectosStack
