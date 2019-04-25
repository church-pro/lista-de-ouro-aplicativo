import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Icon, Card, CheckBox } from 'react-native-elements'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { LABEL_LISTA_DE_OURO } from '../helpers/constants'
import { white, gold, dark, lightdark } from '../helpers/colors'
import ListaDeProspectos from '../components/ListaDeProspectos'
import { connect } from 'react-redux'
import { 
	SITUACAO_QUALIFICAR, 
	SITUACAO_CONVIDAR, 
	SITUACAO_APRESENTAR, 
	SITUACAO_ACOMPANHAR, 
	SITUACAO_FECHAMENTO, 
	SITUACAO_REMOVIDO, 
} from '../helpers/constants'
import styles from '../components/ProspectoStyle';
import { alterarProspecto, alterarAdministracao } from '../actions'
import { Fab, Container, Button } from 'native-base';

class ProspectosScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: LABEL_LISTA_DE_OURO,
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
				color: white,
			},
			headerRightContainerStyle:{
				padding: 10,
			},
			headerRight: (
				<Button
				onPress={() => navigation.navigate('ImportarProspectos')}
				style={{paddingTop: 0, paddingBottom: 0, paddingHorizontal: 10, 
					backgroundColor: 'transparent', borderColor: 'transparent', alignSelf: 'center'}}
				>

				<Icon
					name='plus'
					type='font-awesome'
					color={white}
					/>
				</Button>
			),
		}
	}

	state = {
		quer: false,
		naoQuer: false,
		pendente: false,
		active: false
	}

	alterarProspecto(tipo) {
		const { alterarProspecto, alterarAdministracao, administracao } = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		if(tipo === 'remover'){
			prospecto.situacao_id = SITUACAO_REMOVIDO
		}
		prospecto.ligueiParaAlguem = false
		alterarProspecto(prospecto)

		this.setState({
			quer: false,
			naoQuer: false,
			pendente: false,
		})

		if(tipo === 'remover'){
			Alert.alert('Removido', 'Prospecto removido!')
		}else{

			Alert.alert('Pendente', 'Prospecto pendete!')
		}
	}

	marcarDataEHora(){
		const { alterarProspecto, alterarAdministracao, administracao, navigation } = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		prospecto.ligueiParaAlguem = false
		alterarProspecto(prospecto)

		this.setState({
			quer: false,
			naoQuer: false,
			pendente: false,
		})

		navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_APRESENTAR })
	}

	render() {
		const { prospectos, administracao, navigation } = this.props
		const { quer, naoQuer, pendente } = this.state

		const ListaDeProspectosQualificar = (props) => (
			<View style={{flex: 1}}>

				<ListaDeProspectos 
					title={'Qualificar'} 
					prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_QUALIFICAR)} 
					navigation={navigation} 
				/>
				<Fab 
					direction="left" 
					position="bottomRight" style={{ backgroundColor: gold }}
					active={this.state.active}
					onPress={() => this.setState({active: !this.state.active})}
				>
					<Icon name = "add" />

					<Button style = {{ backgroundColor: gold }}
						onPress={() => { navigation.navigate('NovoProspecto') }}
					>
						<Text>Novo</Text>
					</Button>
					<Button style = {{ backgroundColor: gold }}
						onPress={() => navigation.navigate('ImportarProspectos')}
					>
						<Text>Importar</Text>
					</Button>
				</Fab>
			</View>

			)
		const ListaDeProspectosConvidar = (props) => (
			<ListaDeProspectos 
				title={'Convidar'} 
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_CONVIDAR)} 
				navigation={navigation} 
			/>)
		const ListaDeProspectosApresentar = (props) => (
			<ListaDeProspectos
				title={'Apresentar'} 
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_APRESENTAR)} 
				navigation={navigation} 
			/>)
		const ListaDeProspectosAcompanhar = (props) => (
			<ListaDeProspectos 
				title={'Acompanhar'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_ACOMPANHAR)} 
				navigation={navigation} 
			/>)
		const ListaDeProspectosFechamento = (props) => (
			<ListaDeProspectos 
				title={'Fechamento'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_FECHAMENTO)} 
				navigation={navigation}
			/>)
		const Tabs = createMaterialTopTabNavigator(
			{
				Qualificar: {
					screen: ListaDeProspectosQualificar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='star' type='font-awesome' color={tintColor} />
						),
					}
				},
				Convidar: {
					screen: ListaDeProspectosConvidar, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='phone' type='font-awesome' color={tintColor} />
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
							<Icon name='info-circle' type='font-awesome' color={tintColor} />
						),
					}
				},
				Fechamento: {
					screen: ListaDeProspectosFechamento, 
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='trophy' type='font-awesome' color={tintColor} />
						),
					}
				},
			},
			{
				tabBarOptions: {
					showIcon: true,
					showLabel: false,
					activeTintColor: gold,
					inactiveTintColor: '#eee',
					style: {
						backgroundColor: dark,
					},
					indicatorStyle: {
						backgroundColor: gold,
					},
				}
			}
		)

		return (
			<View style={{flex: 1, backgroundColor: lightdark}}>
				{
					!administracao.ligueiParaAlguem &&
					<Tabs />
				}
				{
					administracao.ligueiParaAlguem &&
						<Card>
							<Text>Prospecto mostrou interesse?</Text>
							<View style={{backgroundColor: '#eee', height: 180, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
								<CheckBox
									title='Quer'
									checked={this.state.quer}
									onPress={() => this.setState({
										quer: true,
										naoQuer: false,
										pendente: false,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									containerStyle={{backgroundColor: '#eee'}}
								/>
								<CheckBox
									title='Não quer'
									checked={this.state.naoQuer}
									onPress={() => this.setState({
										quer: false,
										naoQuer: true,
										pendente: false,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									containerStyle={{backgroundColor: '#eee'}}
								/>
								<CheckBox
									title='Ligar depois'
									checked={this.state.pendente}
									onPress={() => this.setState({
										quer: false,
										naoQuer: false,
										pendente: true,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									containerStyle={{backgroundColor: '#eee'}}
								/>
							</View>

							<View style={{backgroundColor: '#eee', height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
								{
									this.state.quer && 
									<TouchableOpacity
										style={styles.button}
										onPress={() => {this.marcarDataEHora()}}>
										<Text style={styles.textButton}>Marcar Apresentação</Text>
									</TouchableOpacity>
								}
								{
									this.state.naoQuer && 
									<TouchableOpacity
										style={styles.button}
										onPress={() => {this.alterarProspecto('remover')}}>
										<Text style={styles.textButton}>Remover</Text>
									</TouchableOpacity>
								}
								{
									this.state.pendente && 
									<TouchableOpacity
										style={styles.button}
										onPress={() => {this.alterarProspecto()}}>
										<Text style={styles.textButton}>Deixar Pendente</Text>
									</TouchableOpacity>
								}
							</View>

						</Card>
				}
			</View>
		)
	}
}

function mapStateToProps({ prospectos, administracao }){
	return {
		prospectos,
		administracao,
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarProspecto: (prospecto) => dispatch(alterarProspecto(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectosScreen)
