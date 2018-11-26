import React from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {pegarContatos} from '../actions'
import {Permissions, Contacts} from 'expo' 
import {adicionarContatos} from '../actions'
import {NavigationActions} from 'react-navigation'

class SelecionarContatosScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

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
							const pendente = 1
							data.data.map(contato => {
								if(contato.phoneNumbers && contato.phoneNumbers.length){
									let contatoNovo = {}
									contatoNovo.selecionado = false
									contatoNovo.situacao = pendente 
									contatoNovo.id = Date.now() + contato.id
									contatoNovo.nome = contato.name
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
		const {adicionarContatos, navigation} = this.props

		adicionarContatos(contatosParaSelecionar.filter(contato => contato.selecionado))
		navigation.navigate('Contatos')
	}

	render() {
		const { carregando } = this.state
		let { contatosParaSelecionar } = this.state
		const { contatos } = this.props

		return (
			<View style={styles.container}>

				<View style={{height: 40, backgroundColor: 'gray', justifyContent: 'center', padding: 10}}>
					<Text>Importar Contatos</Text>
				</View>

				{
					carregando && 
					<View style={styles.container}>
						<ActivityIndicator size="large"/>
						<Text>Carregando ... </Text>
					</View>
				}

				{
					!carregando && contatosParaSelecionar && 
					<ScrollView>
						<List>
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
										onPressRightIcon={()=>{this.selecionarContato(indice)}}
									/>})
							}
						</List>
					</ScrollView>
				}

				{
					!carregando && contatosParaSelecionar &&
						<View style={{height: 60, backgroundColor: 'steelblue', justifyContent: 'center'}}>
							<Button
								title='Importar'
								onPress={()=>{this.adicionarContatos()}}
							/>
						</View>
				}

			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

function mapStateToProps({contatos}){
	return {contatos}
}

function mapDispatchToProps(dispatch){
	return {
		adicionarContatos: (contatos) => dispatch(adicionarContatos(contatos)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelecionarContatosScreen)
