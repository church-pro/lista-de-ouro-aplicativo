import React from 'react';
import {
	View,
	Text,
	Keyboard,
	Alert,
	TextInput,
} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { white, dark, gold, lightdark } from '../helpers/colors'
import { connect } from 'react-redux'
import DateTimerPicker from 'react-native-modal-datetime-picker'
import DatePicker from 'react-native-datepicker'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { SITUACAO_APRESENTAR, SITUACAO_ACOMPANHAR, SITUACAO_FECHAMENTO } from '../helpers/constants'

class MarcarDataEHoraScreen extends React.Component {

	alterarProspecto = () => {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation, situacao_id } = this.props
		if (this.state.dataParaOAgendamento === null ||
			this.state.horaParaOAgendamento === null) {
			Alert.alert('Erro', 'Selecione a data e hora')
		} else {
			prospecto.data = this.state.dataParaOAgendamento
			prospecto.hora = this.state.horaParaOAgendamento
			if (this.state.local) {
				prospecto.local = this.state.local
			}
			prospecto.situacao_id = situacao_id
			alterarProspectoNoAsyncStorage(prospecto)
			let textoMarcouUmaApresentacao = ''
			switch (situacao_id) {
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
			if (situacao_id === SITUACAO_ACOMPANHAR) {
				navigation.navigate('Prospectos')
			} else {
				navigation.goBack()
			}
		}
	}

	componentDidMount() {
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
		date: new Date(),
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
			headerLeftContainerStyle: {
				padding: 10,
			},
			headerRightContainerStyle: {
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

	// mostrarPegadorDeData = () => this.setState({ selecionarDataMostrando: true })
	// esconderPegadorDeData = () => { Keyboard.dismiss(); return this.setState({ selecionarDataMostrando: false }) }
	// ajudadorDoPegadorDeData = (date) => {
	// 	Keyboard.dismiss()
	// 	let dataParaOAgendamento = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
	// 	this.setState({ dataParaOAgendamento })
	// 	this.esconderPegadorDeData()
	// }

	// mostrarPegadorDeHora = () => this.setState({ selecionarHoraMostrando: true })
	// esconderPegadorDeHora = () => { Keyboard.dismiss(); return this.setState({ selecionarHoraMostrando: false }) }
	// ajudadorDoPegadorDeHora = (date) => {
	// 	Keyboard.dismiss()
	// 	let minutes = date.getMinutes() + ''
	// 	minutes = minutes.padStart(2, '0')
	// 	let horaParaOAgendamento = date.getHours() + ':' + minutes
	// 	this.setState({ horaParaOAgendamento })
	// 	this.esconderPegadorDeHora()
	// }

	render() {
		const { prospecto } = this.props

		return (
			<KeyboardAwareScrollView
				contentContainerStyle={{ flex: 1, backgroundColor: lightdark }}
				style={{ backgroundColor: lightdark }}
				enableOnAndroid enableAutomaticScroll={true} extraScrollHeight={60} >
				<Card containerStyle={{ backgroundColor: dark, borderColor: gold, borderRadius: 6 }}>

					<View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#86939e' }}>
						<Text style={{ fontSize: 16, color: '#86939e', fontWeight: "bold", marginTop: 16 }}>DATA</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Icon
								name="calendar"
								type="font-awesome"
								color={gold}
								size={22}
								containerStyle={{ marginLeft: 10 }}
							/>
							<DatePicker
								style={{ flex: 1 }}
								date={this.state.dataParaOAgendamento}
								mode="date"
								placeholder=" "
								format="DD-MM-YYYY"
								minDate={this.state.date}
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										alignItems: 'flex-start',
									},
									dateText: {
										color: white,
										fontSize: 18,
										marginLeft: 5,
									}
								}}
								onDateChange={(date) => {
									this.setState({ dataParaOAgendamento: date })
								}}
							/>
						</View>
					</View>
					<View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#86939e' }}>
						<Text style={{ fontSize: 16, color: '#86939e', fontWeight: "bold", marginTop: 16 }}>HORA</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Icon
								name="clock-o"
								type="font-awesome"
								color={gold}
								size={22}
								containerStyle={{ marginLeft: 10 }}
							/>
							<DatePicker
								style={{ flex: 1 }}
								date={this.state.horaParaOAgendamento}
								mode="time"
								placeholder=" "
								is24Hour={true}
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										alignItems: 'flex-start',
									},
									dateText: {
										color: white,
										fontSize: 18,
										marginLeft: 5,
									}
								}}
								onDateChange={(date) => {
									this.setState({ horaParaOAgendamento: date })
								}}
							/>
						</View>
					</View>

					<View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#86939e' }}>
						<Text style={{ fontSize: 16, color: '#86939e', fontWeight: "bold", marginTop: 16 }}>LOCAL</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
							<Icon
								name="map-marker"
								type="font-awesome"
								color={gold}
								size={22}
								containerStyle={{ marginLeft: 13 }}
							/>
							<TextInput 
								keyboardAppearance='dark'
								placeholder=""
								style={{color: white, fontSize: 18, marginLeft: 5, minHeight: 40, flex: 1}}
								value={this.local}
								onChangeText={(text) => this.setState({ local: text })}
							/>
						</View>
					</View>
					{/* <Input
						placeholder=""
						placeholderTextColor={'#ddd'}
						label="DATA"
						inputStyle={{ color: white, marginLeft: 5 }}
						labelStyle={{ marginTop: 5 }}
						leftIcon={
							<Icon
								name="calendar"
								type="font-awesome"
								color={gold}
								size={22}
							/>
						}
						onFocus={() => { this.mostrarPegadorDeData() }}
						value={this.state.dataParaOAgendamento}
					/>
					<Input
						placeholder=""
						placeholderTextColor={'#ddd'}
						label="HORA"
						inputStyle={{ color: white, marginLeft: 5 }}
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="clock-o"
								type="font-awesome"
								color={gold}
								size={22}
							/>
						}
						onFocus={() => { this.mostrarPegadorDeHora() }}
						value={this.state.horaParaOAgendamento}
					/> */}

					{/* <Input
						keyboardAppearance='dark'
						placeholder=""
						placeholderTextColor={'#ddd'}
						label="LOCAL"
						inputStyle={{ color: white, marginLeft: 5 }}
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="map-marker"
								type="font-awesome"
								color={gold}
								size={22}
							/>
						}
						value={this.local}
						onChangeText={(text) => this.setState({ local: text })}
					/> */}
					{/* <DateTimerPicker
						isVisible={this.state.selecionarDataMostrando}
						onConfirm={this.ajudadorDoPegadorDeData}
						onCancel={this.esconderPegadorDeData}
						mode={'date'}
						style={{ color: white }}
					/>

					<DateTimerPicker
						isVisible={this.state.selecionarHoraMostrando}
						onConfirm={this.ajudadorDoPegadorDeHora}
						onCancel={this.esconderPegadorDeHora}
						mode={'time'}
					/> */}
				</Card>
			</KeyboardAwareScrollView>
		)
	}

}

function mapStateToProps({ prospectos }, { navigation }) {
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id),
		situacao_id: navigation.state.params.situacao_id
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarcarDataEHoraScreen)
