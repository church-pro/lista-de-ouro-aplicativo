import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity,
	Linking,
	Animated,
} from 'react-native';
import { Card, Icon, Badge } from 'react-native-elements'
import { white, lightdark, gold, dark, gray, yellow, red } from '../helpers/colors'
import call from 'react-native-phone-call'
import email from 'react-native-email'
import {
	SITUACAO_TELEFONAR,
	SITUACAO_CONVIDAR,
	SITUACAO_APRESENTAR,
	SITUACAO_ACOMPANHAR,
	SITUACAO_FECHAMENTO,
	SITUACAO_REMOVIDO,
} from '../helpers/constants'
import { alterarProspectoNoAsyncStorage, alterarAdministracao } from '../actions'
import { connect } from 'react-redux'
import styles from './ProspectoStyle';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import Swipeable from 'react-native-swipeable';

class Prospecto2 extends React.Component {

	swipeable = null
	handleUserBeganScrollingParentView() {
		this.swipeable.recenter();
	  }

	removerProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage } = this.props
		prospecto.situacao_id = SITUACAO_REMOVIDO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Removido', 'Prospecto removido!')
	}

	fecharProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage } = this.props
		prospecto.situacao_id = SITUACAO_FECHAMENTO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Sucesso', 'Prospecto pagou!')
	}

	chamarOTelefoneDoCelular() {
		const { prospecto, alterarAdministracao, alterarProspectoNoAsyncStorage } = this.props
		let { administracao } = this.props
		administracao.ligueiParaAlguem = true
		administracao.prospectoSelecionado = prospecto
		alterarAdministracao(administracao)
		prospecto.ligueiParaAlguem = true
		alterarProspectoNoAsyncStorage(prospecto)
		call({ number: prospecto.telefone, prompt: false }).catch(console.error)
	}
	whatsapp() {
		const { prospecto } = this.props
		Linking.openURL(`https://api.whatsapp.com/send?phone=55${prospecto.ddd}${prospecto.telefone}`).catch((err) => console.error(err))
	}
	handleEmail = () => {
		const { prospecto } = this.props
		const to = prospecto.email // string or array of email addresses
		email(to, {
			// Optional additional arguments
			// cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
			// bcc: 'mee@mee.com', // string or array of email addresses
			subject: '',
			body: 'Lista de Ouro App'
		}).catch(console.error)
	}


	render() {
		const { prospecto, navigation } = this.props

		const rightButtons = [
			
			<TouchableOpacity
				onPress={() => { navigation.navigate('Prospecto', { prospecto_id: prospecto.id }) }}
				style={{
					flex: 1,
					width: 75,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: gold,
				}}
			>
				<Icon name="pencil" size={22} color={white} type='font-awesome' />
			</TouchableOpacity>,
			<TouchableOpacity
				style={{
					flex: 1,
					width: 75,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: red,
				}}
				onPress={() => { this.removerProspecto() }} >
				<Icon name="trash" size={22} color={white} type='font-awesome' />
			</TouchableOpacity>
		]
		return (
			<Card containerStyle={styles.containerCard} key={prospecto.id}>
				<Swipeable
					rightButtons={rightButtons}
					onRef={ref => this.swipeable = ref}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						{
							prospecto.data && prospecto.situacao_id !== SITUACAO_FECHAMENTO &&
							<View style={styles.date}>
								<View style={{
									borderRadius: 9, backgroundColor: gold, borderWidth: 0,
									paddingHorizontal: 4, paddingVertical: 2
								}}>
									<Text style={{ color: white, fontSize: 12 }}>
										{prospecto.data} - {prospecto.hora} {prospecto.local && `-`} {prospecto.local}
									</Text>
								</View>
							</View>
						}
					</View>

					<View style={styles.name_phone}>
						<TouchableOpacity
							onPress={() => { navigation.navigate('QualificarProspecto', { prospecto_id: prospecto.id }) }}
						>

							<View style={styles.content}>
								<View style={{ alignItems: 'center' }}>
									<Icon
										name="star"
										size={34}
										color={gold}
										type='font-awesome'
										containerStyle={{ marginRight: 6 }}
									/>
									<Text style={{ position: "absolute", left: 11.5, top: 9, color: dark, fontWeight: 'bold' }}>{prospecto.rating}</Text>
								</View>

								<Text style={[styles.text, style = { fontWeight: 'bold' }]}>{prospecto.nome}</Text>
								{prospecto.online &&
									<View
										style={{
											backgroundColor: gold,
											padding: 3, marginLeft: 5, borderRadius: 4,
											flexDirection: "row", alignItems: "center"
										}}>
									</View>
								}
							</View>
						</TouchableOpacity>


						<View style={{ flexDirection: 'row' }}>
							{
								prospecto.situacao_id === SITUACAO_TELEFONAR &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
									<TouchableOpacity
										onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_APRESENTAR }) }}
									>
										<Icon name='calendar' type='font-awesome' color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>

							}
							{
								prospecto.situacao_id === SITUACAO_APRESENTAR &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
									<TouchableOpacity
										onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
									>
										<Icon name='list' type='font-awesome' color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>
							}
							{prospecto && prospecto.mail &&

								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
									<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.handleEmail() }} >
										<Icon name="envelope" size={18} color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>
							}
							<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4 }}>
								<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.chamarOTelefoneDoCelular() }} >
									<Icon name="phone" size={22} containerStyle={{ marginRight: 6 }} color={gray} />
								</TouchableOpacity>
							</View>
							<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
								<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.whatsapp() }} >
									<Icon name="whatsapp" size={22} color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
								</TouchableOpacity>
							</View>

						</View>
					</View>
				</Swipeable>

			</Card>
		)
	}
}

function mapStateToProps({ administracao }) {
	return {
		administracao
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Prospecto2)
