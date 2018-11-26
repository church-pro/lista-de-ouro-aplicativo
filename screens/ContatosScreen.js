import React from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { pegarContatos, alterarContato, adicionarItemAgenda } from '../actions'
import { setarNotificacaoLocal } from '../helpers/helper'
import call from 'react-native-phone-call'
import DateTimerPicker from 'react-native-modal-datetime-picker'

class ContatosScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		carregando: true,
		ligueiParaAlguem: false,
		contatoSelecionado: null,
		contatoSelecionadoIndice: null,
		selecionarDataMostrando: false,
		selecionarHoraMostrando: false,
		dataParaOAgendamento: null,
		horaParaOAgendamento: null,
	}

	componentDidMount(){
		this.props.pegarContatos([])
		this.setState({
			carregando: false
		})
	}	

	navegarParaImportarContatos(){
		this.props.navigation.navigate(
			'SelecionarContatos',
		)}

	chamarOTelefoneDoCelular(contato, indice){
		call({number:contato.telefone,prompt: false}).catch(console.error)
		this.setState({
			ligueiParaAlguem: true,
			contatoSelecionado: contato,
			contatoSelecionadoIndice: indice,
		})
	}

	mudarSituacaoDoContato(situacao){
		let { contatoSelecionado, contatoSelecionadoIndice } = this.state
		let { contatos, alterarContato } = this.props

		contatoSelecionado.situacao = situacao

		alterarContato(contatoSelecionado)

		const quer = 3
		if(situacao === quer){
			this.mostrarPegadorDeData()
		}else{
			this.setState({
				ligueiParaAlguem: false,
				contatoSelecionado: null,
				contatoSelecionadoIndice: null,
			})
		}
	}

	mostrarPegadorDeData = () => this.setState({selecionarDataMostrando: true})
	esconderPegadorDeData = () => this.setState({selecionarDataMostrando: false})
	ajudadorDoPegadorDeData = (date) => {
		let dataParaOAgendamento =  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
		this.setState({dataParaOAgendamento})
		this.esconderPegadorDeData()
		this.mostrarPegadorDeHora()
	}

	mostrarPegadorDeHora = () => this.setState({selecionarHoraMostrando: true})
	esconderPegadorDeHora = () => this.setState({selecionarHoraMostrando: false})
	ajudadorDoPegadorDeHora = (date) => {
		let horaParaOAgendamento = date.getHours() + ':' + date.getMinutes()
		this.setState({horaParaOAgendamento})
		this.esconderPegadorDeHora()
		this.mostrarConfirmacao()
	}

	mostrarConfirmacao = () => this.setState({mostrarConfirmacao: true})
	esconderConfirmacao = () => this.setState({mostrarConfirmacao: false})
	alterarDataEHoraDoAgendamento = () => {
		this.setState({dataParaOAgendamento: null})
		this.setState({horaParaOAgendamento: null})
		this.esconderConfirmacao()
		this.mostrarPegadorDeData()
	}
	agendarReuniao = () => {
		const { horaParaOAgendamento, dataParaOAgendamento, contatoSelecionado } = this.state
		const { adicionarItemAgenda } = this.props

		const tipoReuniao = 1
		const tipoMensagem = 2
		const tipoLigar = 3

		let itemReuniao = {}
		itemReuniao.data = dataParaOAgendamento
		itemReuniao.hora = horaParaOAgendamento
		itemReuniao.contato_id = contatoSelecionado.id
		itemReuniao.tipo = tipoReuniao
		itemReuniao.id = Date.now() + contatoSelecionado.id + tipoReuniao
		adicionarItemAgenda(itemReuniao)
		let notificacaoReuniao = {}
		notificacaoReuniao.titulo = 'APN'
		notificacaoReuniao.corpo = 'Não esqueca da apn'
		let dataExplode = itemReuniao.data.split('/')
		notificacaoReuniao.data = dataExplode[2]+'-'+dataExplode[1]+'-'+dataExplode[0] + 'T' + itemReuniao.hora
		setarNotificacaoLocal(notificacaoReuniao)
		

		let itemMensagem = {}
		itemMensagem.data = dataParaOAgendamento
		itemMensagem.hora = horaParaOAgendamento
		itemMensagem.contato_id = contatoSelecionado.id
		itemMensagem.tipo = tipoMensagem
		itemMensagem.id = Date.now() + contatoSelecionado.id + tipoMensagem
		adicionarItemAgenda(itemMensagem)
		let notificacaoMensagem = {}
		notificacaoMensagem.titulo = 'MSN'
		notificacaoMensagem.corpo = 'Não esqueca de manda mensagem para fulano lembrando da apn'
		notificacaoMensagem.data = dataExplode[2]+'-'+dataExplode[1]+'-'+dataExplode[0] + 'T' + itemReuniao.hora
		setarNotificacaoLocal(notificacaoMensagem)
	

		let itemLigar = {}
		itemLigar.data = dataParaOAgendamento
		itemLigar.hora = horaParaOAgendamento
		itemLigar.contato_id = contatoSelecionado.id
		itemLigar.tipo = tipoLigar
		itemLigar.id = Date.now() + contatoSelecionado.id + tipoLigar
		adicionarItemAgenda(itemLigar)
		let notificacaoLigar = {}
		notificacaoLigar.titulo = 'Ligar'
		notificacaoLigar.corpo = 'Ligue para fulando para lembrar da apn'
		notificacaoLigar.data = dataExplode[2]+'-'+dataExplode[1]+'-'+dataExplode[0] + 'T' + itemReuniao.hora
		setarNotificacaoLocal(notificacaoLigar)

		this.setState({
			ligueiParaAlguem: false,
			contatoSelecionado: null,
			contatoSelecionadoIndice: null,
			dataParaOAgendamento: null,
			horaParaOAgendamento: null,
		})
		this.esconderConfirmacao()
	}

	render() {
		const { contatos } = this.props
		const { carregando, ligueiParaAlguem, contatoSelecionado, selecionarDataMostrando, selecionarHoraMostrando, dataParaOAgendamento, horaParaOAgendamento, mostrarConfirmacao} = this.state
		const [pendente, naoQuer, quer] = [1,2,3]

		return (
			<View style={styles.container}>

				<View style={{height: 40, backgroundColor: 'gray', justifyContent: 'center', padding: 10}}>
					<Text>Contatos</Text>
				</View>
				{
					carregando && 
					<View>
						<ActivityIndicator size="large"/>
						<Text>Carregando ... </Text>
					</View>
				}

				{
					!mostrarConfirmacao && !ligueiParaAlguem && !carregando && contatos && 
					<ScrollView style={styles.container}>
						<List>
							{
								contatos.map((contato, indice) => (
									<ListItem 
										key={contato.id} 
										title={contato.nome}
										subtitle={contato.telefone}
										rightIcon={{name:'phone'}}
										onPressRightIcon={()=>{this.chamarOTelefoneDoCelular(contato, indice)}}
									/>))
							}
						</List>
					</ScrollView>
				}

				{
					!mostrarConfirmacao && !ligueiParaAlguem && !carregando && contatos &&
						<View style={{height: 60, backgroundColor: 'steelblue', justifyContent: 'center'}}>
							<Button
								title='Importar Contatos'
								onPress={()=>{this.navegarParaImportarContatos()}}
							/>
						</View>
				}

				{
					!mostrarConfirmacao && ligueiParaAlguem &&
						<View>
							<Text>
								Liguei para {contatoSelecionado.nome}
							</Text>

							<View style={{height: 60, backgroundColor: 'steelblue', justifyContent: 'center'}}>
								<Button
									title='Ligar Depois'
									style={{marginTop: 20}}
									onPress={()=>{this.mudarSituacaoDoContato(pendente)}}
								/>
							</View>


							<View style={{height: 60, backgroundColor: 'red', justifyContent: 'center'}}>
								<Button
									title='Não quer'
									onPress={()=>{this.mudarSituacaoDoContato(naoQuer)}}
								/>
							</View>

							<View style={{height: 60, backgroundColor: 'green', justifyContent: 'center'}}>
								<Button
									title='Quer'
									style={{marginTop: 20}}
									onPress={()=>{this.mudarSituacaoDoContato(quer)}}
								/>
							</View>

							<DateTimerPicker
								isVisible={selecionarDataMostrando}
								onConfirm={this.ajudadorDoPegadorDeData}
								onCancel={this.esconderPegadorDeData}
								mode={'date'}
							/>

						<DateTimerPicker
							isVisible={selecionarHoraMostrando}
							onConfirm={this.ajudadorDoPegadorDeHora}
							onCancel={this.esconderPegadorDeHora}
							mode={'time'}
						/>

				</View>
				}

				{
					mostrarConfirmacao &&
						<View>
							<Text>
								Contato: {contatoSelecionado.nome}
							</Text>
							<Text>
								Data: {dataParaOAgendamento}
							</Text>
							<Text>
								Hora: {horaParaOAgendamento}
							</Text>

							<View style={{height: 60, backgroundColor: 'red', justifyContent: 'center'}}>
								<Button
									title='Alterar'
									style={{marginTop: 20}}
									onPress={()=>{this.alterarDataEHoraDoAgendamento()}}
								/>
							</View>

							<View style={{height: 60, backgroundColor: 'green', justifyContent: 'center'}}>
								<Button
									title='Confirmar'
									style={{marginTop: 20}}
									onPress={()=>{this.agendarReuniao()}}
								/>
							</View>
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
	const pendente = 1
	return {
		contatos: contatos && contatos.filter(contato => contato.situacao === pendente)
	}
}

function mapDispatchToProps(dispatch){
	return {
		pegarContatos: (contatos) => dispatch(pegarContatos(contatos)),
		alterarContato: (contato) => dispatch(alterarContato(contato)),
		adicionarItemAgenda: (item) => dispatch(adicionarItemAgenda(item)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContatosScreen)
