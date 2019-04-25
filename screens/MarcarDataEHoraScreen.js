import React from 'react';
import {
	View,
	Text,
	Keyboard,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements'
import { white, red } from '../helpers/colors'
import { connect } from 'react-redux'
import DateTimerPicker from 'react-native-modal-datetime-picker'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { SITUACAO_APRESENTAR, SITUACAO_ACOMPANHAR, SITUACAO_FECHAMENTO } from '../helpers/constants'

class MarcarDataEHoraScreen extends React.Component {

	alterarProspecto = () => {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation, situacao_id } = this.props
		if(this.state.dataParaOAgendamento === null ||
			this.state.horaParaOAgendamento === null){
			Alert.alert('Erro', 'Selecione a data e hora')
		}else{
			prospecto.data = this.state.dataParaOAgendamento
			prospecto.hora = this.state.horaParaOAgendamento
			if(this.state.local){
				prospecto.local = this.state.local
			}
			prospecto.situacao_id = situacao_id
			alterarProspectoNoAsyncStorage(prospecto)
			let textoMarcouUmaApresentacao = ''
			switch(situacao_id){
				case SITUACAO_APRESENTAR:
					textoMarcouUmaApresentacao = 'Você marcou uma apresentação, agora seu prospecto está na etapa "Apresentar"'
					break;
				case SITUACAO_ACOMPANHAR:
					textoMarcouUmaApresentacao = 'Você remarcou, agora seu prospecto está na etapa "Acompanhar"'
					break;
				case SITUACAO_FECHAMENTO:
					textoMarcouUmaApresentacao = 'Você remarcou, agora seu prospecto está na etapa "Fechamento"'
					break;
			}
			Alert.alert('Sucesso', textoMarcouUmaApresentacao)
			if(situacao_id === SITUACAO_ACOMPANHAR){
				navigation.navigate('Prospectos')
			}else{
				navigation.goBack()
			}
		}
	}

	componentDidMount(){
		this.props.navigation.setParams({
			alterarProspecto: this.alterarProspecto
		})
	}

	state = {
		selecionarDataMostrando: false,
		selecionarHoraMostrando: false,
		dataParaOAgendamento: null,
		horaParaOAgendamento: null,
		local: '',
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			title: 'Marcar Data e Hora',
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
				color: white,
			},
			headerTintColor: white,
			headerLeftContainerStyle:{
				padding: 10,
			},
			headerRightContainerStyle:{
				padding: 10,
			},
			headerRight: (
				<Icon
					name='check'
					type='font-awesome'
					color={white}
					onPress={() => params.alterarProspecto()}
				/>
			),
		}
	}

	mostrarPegadorDeData = () => this.setState({selecionarDataMostrando: true})
	esconderPegadorDeData = () => { Keyboard.dismiss(); return this.setState({selecionarDataMostrando: false}) }
	ajudadorDoPegadorDeData = (date) => {
		Keyboard.dismiss()
		let dataParaOAgendamento =  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
		this.setState({dataParaOAgendamento})
		this.esconderPegadorDeData()
	}

	mostrarPegadorDeHora = () => this.setState({selecionarHoraMostrando: true})
	esconderPegadorDeHora = () => { Keyboard.dismiss(); return this.setState({selecionarHoraMostrando: false}) }
	ajudadorDoPegadorDeHora = (date) => {
		Keyboard.dismiss()
		let minutes = date.getMinutes() + ''
		minutes = minutes.padStart(2, '0')
		let horaParaOAgendamento = date.getHours() + ':' + minutes
		this.setState({horaParaOAgendamento})
		this.esconderPegadorDeHora()
	}

	render() {
		const { prospecto } = this.props

		return (
			<KeyboardAvoidingView style={{flex: 1,}} behavior="padding" enabled>
				<Card>
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Data"
						label="DATA"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="calendar"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
						onFocus={() => {this.mostrarPegadorDeData()}}
						value={this.state.dataParaOAgendamento}
					/>
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Horário"
						label="HORA"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="clock-o"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
						onFocus={() => {this.mostrarPegadorDeHora()}}
						value={this.state.horaParaOAgendamento}
					/>
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Onde ocorrerá?"
						label="LOCAL"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="map-marker"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
						value={this.local}
						onChangeText={(text) => this.setState({local: text})}
					/>
					<DateTimerPicker
						isVisible={this.state.selecionarDataMostrando}
						onConfirm={this.ajudadorDoPegadorDeData}
						onCancel={this.esconderPegadorDeData}
						mode={'date'}
					/>

				<DateTimerPicker
					isVisible={this.state.selecionarHoraMostrando}
					onConfirm={this.ajudadorDoPegadorDeHora}
					onCancel={this.esconderPegadorDeHora}
					mode={'time'}
				/>
			</Card>
		</KeyboardAvoidingView>
		)
	}

}

function mapStateToProps({ prospectos }, {navigation}){
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id),
		situacao_id: navigation.state.params.situacao_id
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarcarDataEHoraScreen)
