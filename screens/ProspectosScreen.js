import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	NetInfo,
} from 'react-native';
import { Icon, Card, CheckBox } from 'react-native-elements'
import { Drawer, Header, Title, Left, Body, Right, Fab, Button } from 'native-base'
import ActionButton from 'react-native-action-button';
import SideBar from '../components/SideBar'
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
import { 
	alterarProspectoNoAsyncStorage, 
	alterarAdministracao,
	alterarUsuarioNoAsyncStorage,
	pegarProspectosNoAsyncStorage,
	pegarUsuarioNoAsyncStorage,
	adicionarProspectosAoAsyncStorage,
} from '../actions'
import {
	sincronizarNaAPI,
} from '../helpers/api'

class ProspectosScreen extends React.Component {

	state = {
		carregando: true,
		quer: false,
		naoQuer: false,
		pendente: false,
		active: false,
		sincronizando: false,
	}

	closeDrawer = () => {
		this.drawer._root.close()
	};
	openDrawer = () => {
		this.drawer._root.open()
	};

	componentDidMount(){
		this.props.navigation.setParams({
			sincronizar: this.sincronizar
		})
		this.props
			.pegarProspectosNoAsyncStorage()
			.then(() => this.setState({carregando: false}))
		this.props
			.pegarUsuarioNoAsyncStorage()
	}

	novoProspecto = () => {
		this.props.navigation.navigate('NovoProspecto')
		this.setState( state => ({ active: state.active = false}))
	}
	importarProspecto = () => {
		this.props.navigation.navigate('ImportarProspectos')
		this.setState( state => ({ active: state.active = false}))
	}

	alterarProspecto = (tipo) => {
		const { 
			alterarProspectoNoAsyncStorage, 
			alterarAdministracao,
			administracao,
		} = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		if(tipo === 'remover'){
			prospecto.situacao_id = SITUACAO_REMOVIDO
		}
		prospecto.ligueiParaAlguem = false
		alterarProspectoNoAsyncStorage(prospecto)

		if(tipo === 'remover'){
			Alert.alert('Removido', 'Prospecto removido!')
		}else{

			Alert.alert('Pendente', 'Prospecto pendete!')
		}
	}

	marcarDataEHora = () => {
		const { 
			alterarProspectoNoAsyncStorage, 
			alterarAdministracao,
			administracao,
			navigation,
		} = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		prospecto.ligueiParaAlguem = false
		alterarProspectoNoAsyncStorage(prospecto)

		this.setState({
			quer: false,
			naoQuer: false,
			pendente: false,
		})

		navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_APRESENTAR })
	}

	sincronizar = () => {
		try{
			NetInfo.isConnected
				.fetch()
				.then(isConnected => {
					if(isConnected){
						const {
							usuario,
							navigation,
							adicionarProspectosAoAsyncStorage,
							alterarUsuarioNoAsyncStorage,
						} = this.props
						if(usuario.email){
							this.setState({carregando: true})
							sincronizarNaAPI(usuario)
								.then(retorno => {
									let alertTitulo = ''
									let alertCorpo = ''
									if(retorno.ok){
										if(retorno.resultado.prospectos){
											const prospectosParaAdicionar = retorno.resultado.prospectos
												.map(prospecto => {
													prospecto.id = prospecto._id	
													prospecto.rating = null
													prospecto.situacao_id = 1
													prospecto.online = true
													delete prospecto._id
													return prospecto
												})
											adicionarProspectosAoAsyncStorage(prospectosParaAdicionar)
										}
										alertTitulo = 'Sincronização'
										alertCorpo = 'Sincronizado com sucesso!'
										this.setState({carregando: false})
										Alert.alert(alertTitulo, alertCorpo)
									}else{
										alertTitulo = 'Aviso'
										alertCorpo = 'Usuário/Senha não conferem!'
										alterarUsuarioNoAsyncStorage({})
											.then(() =>  {
												this.setState({carregando: false})
												Alert.alert(alertTitulo, alertCorpo)
											})
									}
								})
						}else{
							navigation.navigate('Login', {sincronizar: this.sincronizar})
						}
					}else{
						Alert.alert('Internet', 'Verifique sua internet!')
					}
				})
		} catch(err) {
			Alert.alert('Error', err)
		}
	}

	static navigationOptions = () => {
		return {
			header: null,
		}
	}

	render() {
		const { 
			prospectos, 
			administracao, 
			navigation,
		} = this.props
		const { 
			carregando,
			quer, 
			naoQuer, 
			pendente,
		} = this.state
		let Tabs = null

		if(!carregando){
			const ListaDeProspectosQualificar = (props) => (
				<View style={{flex: 1}}>
					<ListaDeProspectos 
						title={'Qualificar'} 
						prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_QUALIFICAR)} 
						navigation={navigation} 
					/>

					 <ActionButton buttonColor={gold} buttonTextStyle={{color: dark}} spacing={15} offsetX={20} offsetY={20} >
						<ActionButton.Item size={40} buttonColor={gold}  
							onPress={() => {
								this.props.navigation.navigate('Prospecto')
							}}
						>
							<Icon name='add' color={dark}/>
						</ActionButton.Item>
						<ActionButton.Item size={40} buttonColor={gold}  
							onPress={() => {
								this.props.navigation.navigate('ImportarProspectos')
							}}>
							<Icon name='address-book' type='font-awesome' color={dark}/>
						</ActionButton.Item>
					</ActionButton>
					
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
			Tabs = createMaterialTopTabNavigator(
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
		}

		return (
			<Drawer
                    ref={(ref) => { this.drawer = ref; }}
					content={<SideBar closeDrawer={this.closeDrawer} navigator={this.navigator} />}
                    onClose={() => this.closeDrawer()}
			>
			<Header  style={{backgroundColor: dark, borderBottomWidth: 0, paddingTop: 0, paddingLeft: 10}} iosBarStyle="light-content">
				<Left style={{flex: 0}}>
					<TouchableOpacity 
						style={{backgroundColor: 'transparent', margin: 0, borderWidth: 0}}
						onPress={() => this.openDrawer()}>
						<Icon type="font-awesome" name="bars" color={white}/>
					</TouchableOpacity>
				</Left>
				<Body style={{flex: 1}}>
					<Title style={{textAlign: 'center', alignSelf: 'center', justifyContent: "center", color: white, fontWeight: '200', fontSize: 16 }}>LISTA DE OURO</Title>
				</Body>
				<Right style={{flex: 0}}>
					<TouchableOpacity 
						style={{backgroundColor: 'transparent', borderWidth: 0}}
						onPress={() => this.sincronizar()}>
						<Icon name='retweet' type='font-awesome' color={white} />
					</TouchableOpacity>
				</Right>
			</Header>

			<View style={{flex: 1, backgroundColor: lightdark}}>

				{
					carregando && 
					<View style={{flex: 1, justifyContent: 'center'}}>
						<ActivityIndicator 
							size="large"
							color={gold}
						/>
					</View>
				}

				{
					!carregando &&
						!administracao.ligueiParaAlguem &&
						<Tabs />
				}

				{
					!carregando &&
						administracao.ligueiParaAlguem &&
						<Card containerStyle={{backgroundColor: dark, borderColor: gold, borderRadius: 6}}>
							<Text style={{color: white, textAlign: 'center', fontWeight: 'bold',
							paddingBottom: 8}}
							>
								Prospecto mostrou interesse?
							</Text>
							<View style={{backgroundColor: lightdark, height: 180, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
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
									checkedColor={gold}
									textStyle={{color: white}}
									containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
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
									checkedColor={gold}
									textStyle={{color: white}}
									containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
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
									checkedColor={gold}
									textStyle={{color: white}}
									containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
								/>
							</View>

							<View style={{backgroundColor: dark, height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
								{
									this.state.quer && 
									<TouchableOpacity
										style={[styles.button, style={height: 40, borderRadius: 0, backgroundColor: gold}]}
										onPress={() => {this.marcarDataEHora()}}>
										<Text style={styles.textButton}>Marcar Apresentação</Text>
									</TouchableOpacity>
								}
								{
									this.state.naoQuer && 
									<TouchableOpacity
										style={[styles.button, style={height: 40, borderRadius: 0, backgroundColor: gold}]}
										onPress={() => {this.alterarProspecto('remover')}}>
										<Text style={styles.textButton}>Remover</Text>
									</TouchableOpacity>
								}
								{
									this.state.pendente && 
									<TouchableOpacity
										style={[styles.button, style={height: 40, borderRadius: 0, backgroundColor: gold}]}
										onPress={() => {this.alterarProspecto()}}>
										<Text style={styles.textButton}>Deixar Pendente</Text>
									</TouchableOpacity>
								}
							</View>

						</Card>
				}
			</View>
			</Drawer>
		)
	}
}

function mapStateToProps({ prospectos, usuario, administracao, }){
	return {
		prospectos,
		usuario,
		administracao,
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
		pegarProspectosNoAsyncStorage: () => dispatch(pegarProspectosNoAsyncStorage()),
		pegarUsuarioNoAsyncStorage: () => dispatch(pegarUsuarioNoAsyncStorage()),
		adicionarProspectosAoAsyncStorage: (prospectos) => dispatch(adicionarProspectosAoAsyncStorage(prospectos)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectosScreen)
