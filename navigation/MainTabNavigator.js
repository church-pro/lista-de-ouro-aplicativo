import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ContatosScreen from '../screens/ContatosScreen';
import SelecionarContatosScreen from '../screens/SelecionarContatosScreen';
import TarefasScreen from '../screens/TarefasScreen';

const ContatosStack = createStackNavigator({
	Contatos: ContatosScreen,
	SelecionarContatos: SelecionarContatosScreen,
});

ContatosStack.navigationOptions = {
	tabBarLabel: 'Contatos',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? 'ios-contacts'
					: 'md-contacts'
			}
		/>
	),
};

const TarefasStack = createStackNavigator({
	Tarefas: TarefasScreen,
});

TarefasStack.navigationOptions = {
	tabBarLabel: 'Tarefas',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
		/>
	),
};

export default createBottomTabNavigator({
	ContatosStack,
	TarefasStack,
});
