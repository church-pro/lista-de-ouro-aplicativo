import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { LABEL_LISTA_DE_OURO } from '../helpers/constants'
import { white, red } from '../helpers/colors'
import QualificarScreen from './QualificarScreen'

class LogoTitle extends React.Component {
	render() { return (<Text>{LABEL_LISTA_DE_OURO}</Text>) }
}

const Tabs = createMaterialTopTabNavigator(
	{
		Qualificar: {
			screen: QualificarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='ticket' type='font-awesome' color={tintColor} />
				),
			}
		},
		Convidar: {
			screen: QualificarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='envelope' type='font-awesome' color={tintColor} />
				),
			}
		},
		Apresentar: {
			screen: QualificarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='calendar' type='font-awesome' color={tintColor} />
				),
			}
		},
		Acompanhar: {
			screen: QualificarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='retweet' type='font-awesome' color={tintColor} />
				),
			}
		},
		Fechamento: {
			screen: QualificarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='star' type='font-awesome' color={tintColor} />
				),
			}
		},
	},
	{
		tabBarOptions: {
			showIcon: true,
			showLabel: false,
			activeTintColor: white,
			inactiveTintColor: '#eee',
			style: {
				backgroundColor: red,
			},
			indicatorStyle: {
				backgroundColor: white,
			},
		}
	}
)

class ProspectosScreen extends React.Component {
	static navigationOptions = {
		title: LABEL_LISTA_DE_OURO,
		headerTitleStyle: {
			flex: 1,
			textAlign: 'center',
			alignSelf: 'center',
		},
		headerLeftContainerStyle:{
			padding: 10,
		},
		headerLeft: (
			<Icon
				name='arrow-left'
				type='font-awesome'
				color={white}
				onPress={() => alert('hello')} />
		),
		headerRightContainerStyle:{
			padding: 10,
		},
		headerRight: (
			<Icon
				name='plus'
				type='font-awesome'
				color={white}
				onPress={() => alert('hello')} />
		)
	}

	render() {
		return (<Tabs />)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default ProspectosScreen
