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
import ListaDeProspectos from '../components/ListaDeProspectos'
import { connect } from 'react-redux'

class LogoTitle extends React.Component {
	render() { return (<Text>{LABEL_LISTA_DE_OURO}</Text>) }
}

class ProspectosScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
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
					onPress={() => navigation.navigate('ImportarProspectos')}
				/>
			),
		}
	}

	render() {
		const { prospectos, navigation } = this.props
		const ListaDeProspectosQualificar = (props) => (<ListaDeProspectos title={'Qualificar'} prospectos={prospectos.filter(prospecto => prospecto.situacao_id === 1)} navigation={navigation} />)
		const ListaDeProspectosConvidar = (props) => (<ListaDeProspectos title={'Convidar'}  prospectos={prospectos.filter(prospecto => prospecto.situacao_id === 2)} navigation={navigation}/>)
		const ListaDeProspectosApresentar = (props) => (<ListaDeProspectos title={'Apresentar'}  prospectos={prospectos.filter(prospecto => prospecto.situacao_id === 3)} navigation={navigation}/>)
		const ListaDeProspectosAcompanhar = (props) => (<ListaDeProspectos title={'Acompanhar'}  prospectos={prospectos.filter(prospecto => prospecto.situacao_id === 4)} navigation={navigation}/>)
		const ListaDeProspectosFechamento = (props) => (<ListaDeProspectos title={'Fechamento'}  prospectos={prospectos.filter(prospecto => prospecto.situacao_id === 5)} navigation={navigation}/>)
		const Tabs = createMaterialTopTabNavigator(
			{
				Qualificar: {
					screen: ListaDeProspectosQualificar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='ticket' type='font-awesome' color={tintColor} />
						),
					}
				},
				Convidar: {
					screen: ListaDeProspectosConvidar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='envelope' type='font-awesome' color={tintColor} />
						),
					}
				},
				Apresentar: {
					screen: ListaDeProspectosApresentar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='calendar' type='font-awesome' color={tintColor} />
						),
					}
				},
				Acompanhar: {
					screen: ListaDeProspectosAcompanhar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='retweet' type='font-awesome' color={tintColor} />
						),
					}
				},
				Fechamento: {
					screen: ListaDeProspectosFechamento, 
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
		return (<Tabs />)
	}

}

function mapStateToProps({prospectos}){
	return {
		prospectos,
	}
}

export default connect(mapStateToProps, null)(ProspectosScreen)
