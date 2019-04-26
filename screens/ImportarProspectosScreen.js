import React from 'react';
import {
	ScrollView,
	TouchableOpacity,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {Permissions, Contacts} from 'expo' 
import { 
	adicionarProspectosAoAsyncStorage,
} from '../actions'
import { white, red, lightdark } from '../helpers/colors'
import { SITUACAO_QUALIFICAR } from '../helpers/constants'
import styles from '../components/ProspectoStyle';

class ImportarProspectosScreen extends React.Component {
	static navigationOptions = {
		title: 'Importar Prospectos',
		headerTintColor: white,
	}

	state = {
		carregando: true,
		contatosParaSelecionar: null,
	}

	componentDidMount(){
		let contatosParaSelecionar = []
		Permissions.askAsync(Permissions.CONTACTS)
			.then(({status}) => {
				if(status === 'granted'){
					Contacts.getContactsAsync()
						.then(data => {
							data.data.map(contato => {
								if(contato.phoneNumbers && contato.phoneNumbers.length){
									let contatoNovo = {}
									delete contatoNovo.selecionado
									contatoNovo.situacao_id = SITUACAO_QUALIFICAR 
									contatoNovo.id = Date.now() + contato.id
									contatoNovo.nome = contato.name
									contatoNovo.rating = null
									contatoNovo.email = null
									let contador = 1
									contato.phoneNumbers.map(telefone => {
										if(contador === 1){
											contatoNovo.telefone = telefone.number
											contatosParaSelecionar.push(contatoNovo)
											contador++
										}
									})
								}
							})
							if(contatosParaSelecionar.length){
								this.setState({
									contatosParaSelecionar: contatosParaSelecionar,
									carregando: false
								})
							}
						})
				}
			})
	}	

	selecionarContato(indice){
		let {contatosParaSelecionar} = this.state
		let contatoDoIndice = contatosParaSelecionar[indice]
		contatoDoIndice.selecionado = !contatoDoIndice.selecionado
		contatosParaSelecionar[indice] = contatoDoIndice
		this.setState({contatosParaSelecionar})
	}

	adicionarContatos(){
		const {contatosParaSelecionar} = this.state
		const {adicionarProspectosAoAsyncStorage, navigation} = this.props

		adicionarProspectosAoAsyncStorage(contatosParaSelecionar.filter(contato => contato.selecionado))
		navigation.goBack()
	}

	render() {
		const { carregando } = this.state
		let { contatosParaSelecionar } = this.state

		return (
			<View style={styles.container}>

				{
					carregando && 
					<View style={{flex: 1, justifyContent: 'center'}}>
						<ActivityIndicator 
							size="large"
							color='#000'
						/>
					</View>
				}

				{
					!carregando && contatosParaSelecionar && 
					<ScrollView>
							{
								contatosParaSelecionar.map((contato, indice) => {
									let iconeDoBotao = {
										name: 'check',
										color: '#DDD',
									}
									if(contato.selecionado){
										iconeDoBotao = {
											name: 'check',
											color: '#000',
										}
									}
									return <ListItem 
										key={contato.id} 
										title={contato.nome}
										subtitle={contato.telefone}
										rightIcon={iconeDoBotao}
										onPress={()=>{this.selecionarContato(indice)}}
									/>})
							}
					</ScrollView>
				}

				{
					!carregando && contatosParaSelecionar &&
						<View style={{height: 60, backgroundColor: lightdark, justifyContent: 'center'}}>
							<TouchableOpacity style={styles.button}
								onPress={()=>{this.adicionarContatos()}}
							>
							<Text style={[styles.textButton, {fontSize: 17, fontWeight: "bold"}]}>Importar</Text>
							</TouchableOpacity>
						</View>
				}

			</View>
		);
	}

}


function mapDispatchToProps(dispatch){
	return {
		adicionarProspectosAoAsyncStorage: (contatos) => dispatch(adicionarProspectosAoAsyncStorage(contatos)),
	}
}

export default connect(null, mapDispatchToProps)(ImportarProspectosScreen)
