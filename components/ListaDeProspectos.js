import React from 'react';
import {
	Text,
	View,
	FlatList,
	RefreshControl,
	NetInfo,
	Alert
} from 'react-native';
import Prospecto from '../components/Prospecto'
import {
	sincronizarNaAPI,
	recuperarHistoricoNaoSincronizado,
	limparHistoricos,
} from '../helpers/api'
import { 
	alterarProspectoNoAsyncStorage, 
	alterarAdministracao,
	alterarUsuarioNoAsyncStorage,
	pegarProspectosNoAsyncStorage,
	pegarUsuarioNoAsyncStorage,
	adicionarProspectosAoAsyncStorage,
} from '../actions'
import { connect } from 'react-redux'

class ListaDeProspectos extends React.Component {

	state = {
		refreshing: false,
		sincronizando: false,
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
							let dados = {
								email: usuario.email,
								senha: usuario.senha,
							}
							recuperarHistoricoNaoSincronizado()
								.then(historicos => {
									//dados.historicos = historicos
									dados.historicos = []

									sincronizarNaAPI(dados)
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
												limparHistoricos()
												alertTitulo = 'Sincronização'
												alertCorpo = 'Sincronizado com sucesso!'
												this.setState({refreshing: false})
												Alert.alert(alertTitulo, alertCorpo)
											}else{
												alertTitulo = 'Aviso'
												alertCorpo = 'Usuário/Senha não conferem!'
												alterarUsuarioNoAsyncStorage({})
													.then(() =>  {
														this.setState({refreshing: false})
														Alert.alert(alertTitulo, alertCorpo)
													})
											}
										})
										.catch(err => console.log('err: ', err))
								})
						}else{
							navigation.navigate('Login')
						}
					}else{
						Alert.alert('Internet', 'Verifique sua internet!')
					}
				})
		} catch(err) {
			Alert.alert('Error', err)
		}
	}

	_handleRefresh = () => {
		this.setState({refreshing: true})
		this.sincronizar()
	}

	_keyExtractor = (item, index) => item.id;

	_renderItem = ({ item }) => (
		<Prospecto
			key={item.id}
			prospecto={item}
			navigation={this.props.navigation}
		/>
	)

	render() {
		const { title, prospectos, navigation } = this.props
		return (
			<View style={{ flex: 1 }}>
				<Text style={{ textAlign: 'center', color: '#AAA', padding: 10, }}>{title}</Text>
				{
					prospectos &&
					<FlatList
						data={prospectos}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						navigation={navigation}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._handleRefresh}
							/>
						}
					/>
				}
			</View>
		)
	}

}

function mapStateToProps({ prospectos, usuario, administracao,}){
	return {
		// prospectos,
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

export default connect(mapStateToProps, mapDispatchToProps)(ListaDeProspectos)