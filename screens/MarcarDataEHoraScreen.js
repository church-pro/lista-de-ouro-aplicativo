import React from 'react';
import {
	View,
	Text,
	Keyboard,
} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements'
import { white, red } from '../helpers/colors'
import { connect } from 'react-redux'
import DateTimerPicker from 'react-native-modal-datetime-picker'
import { alterarProspecto } from '../actions'

class MarcarDataEHoraScreen extends React.Component {

	alterarProspecto(){
		const { prospecto, alterarProspecto, navigation, situacao_id } = this.props
		prospecto.data = this.state.dataParaOAgendamento
		prospecto.hora = this.state.horaParaOAgendamento
		prospecto.local = this.state.local
		prospecto.situacao_id = situacao_id
		alterarProspecto(prospecto)
		navigation.goBack()
	}

	constructor(props){
		super(props)
		this.alterarProspecto = this.alterarProspecto.bind(this)
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
		return {
			title: 'Marcar APN',
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
	esconderPegadorDeData = () => this.setState({selecionarDataMostrando: false})
	ajudadorDoPegadorDeData = (date) => {
		Keyboard.dismiss()
		let dataParaOAgendamento =  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
		this.setState({dataParaOAgendamento})
		this.esconderPegadorDeData()
	}

	mostrarPegadorDeHora = () => this.setState({selecionarHoraMostrando: true})
	esconderPegadorDeHora = () => this.setState({selecionarHoraMostrando: false})
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
			<View style={{flex: 1,}}>
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
	</View>
		)
	}

}

function mapStateToProps({prospectos}, {navigation}){
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id),
		situacao_id: navigation.state.params.situacao_id
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarProspecto: (prospecto) => dispatch(alterarProspecto(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarcarDataEHoraScreen)
