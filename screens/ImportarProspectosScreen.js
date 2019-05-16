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
import { white, gold, lightdark, gray, dark } from '../helpers/colors'
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
									contatoNovo.online = false
									let contador = 1
									contato.phoneNumbers.map(item => {
										if(contador === 1){
											let ddd = 61
											let telefoneTexto = item.number.toString()
											telefoneTexto = telefoneTexto.replace('-', '')
											telefoneTexto = telefoneTexto.replace(' ', '')
											telefoneTexto = telefoneTexto.replace('+', '')
											telefoneTexto = telefoneTexto.replace('(', '')
											telefoneTexto = telefoneTexto.replace(')', '')
											let telefone = telefoneTexto
											const tamanhoDoNumero = telefoneTexto.length
											if(tamanhoDoNumero > 9){
												telefone = telefoneTexto.substr(tamanhoDoNumero - 9)
												if(parseInt(telefone.substr(0, 1)) !== 9){
													telefone = telefoneTexto.substr(tamanhoDoNumero - 8)
												}
											}
											if(tamanhoDoNumero >= 11){
												let valorParaReduzir = 11
												if(parseInt(telefoneTexto.substr(0, 1)) === 0){
													valorParaReduzir = 10
												}
												ddd = telefoneTexto.substr(tamanhoDoNumero - valorParaReduzir, 2)
												if(parseInt(ddd).toString().length !== 2){
													ddd = '61'
												}
											}
											contatoNovo.ddd = ddd
											contatoNovo.telefone = telefone
											contatosParaSelecionar.push(contatoNovo)
											contador++
										}
									})
								}
							})
							if(contatosParaSelecionar.length){
								this.setState({
									contatosParaSelecionar,
									carregando: false
								})
							}
						})
				}
			})
	}	

	selecionarContato(indice){
		let {
			contatosParaSelecionar,
		} = this.state
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
							color={gold}
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
										color: gray,
									}
									if(contato.selecionado){
										iconeDoBotao = {
											name: 'check',
											color: gold,
										}
									}
									const dddTelefone = `(${contato.ddd}) ${contato.telefone}`
									return <ListItem 
										containerStyle={{backgroundColor: lightdark}}
										titleStyle={{color: white}}
										subtitleStyle={{color: gray}}
										key={contato.id} 
										title={contato.nome}
										subtitle={dddTelefone}
										rightIcon={iconeDoBotao}
										onPress={()=>{this.selecionarContato(indice)}}
									/>})
							}
					</ScrollView>
				}

				{
					!carregando && contatosParaSelecionar &&
						<View style={{height: 70, backgroundColor: dark, justifyContent: 'center'}}>
							<TouchableOpacity style={styles.buttonImport}
								onPress={()=>{this.adicionarContatos()}}
							>
							<Text style={styles.textButtonImport}>Importar</Text>
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
