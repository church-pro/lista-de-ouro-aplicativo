import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity,
	Linking
} from 'react-native';
import { Card, Icon, Badge } from 'react-native-elements'
import { white, lightdark, gold, dark, gray, yellow } from '../helpers/colors'
import call from 'react-native-phone-call'
import email from 'react-native-email'
import {
	SITUACAO_QUALIFICAR,
	SITUACAO_CONVIDAR,
	SITUACAO_APRESENTAR,
	SITUACAO_ACOMPANHAR,
	SITUACAO_FECHAMENTO,
	SITUACAO_REMOVIDO,
} from '../helpers/constants'
import { alterarProspectoNoAsyncStorage, alterarAdministracao } from '../actions'
import { connect } from 'react-redux'
import styles from './ProspectoStyle';

class Prospecto2 extends React.Component {

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
		return (
			<Card containerStyle={styles.containerCard} key={prospecto.id}>
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
								<View style={{ marginLeft: 5, backgroundColor: gold, padding: 3, flexDirection: "row", borderRadius: 4, alignItems: "center" }}>
									{/* <Icon name="globe" type='font-awesome' color={white} size={16} containerStyle={{ marginRight: 4 }} />
								<Text style={{ color: white }}>web</Text> */}
								</View>
							}
						</View>
					</TouchableOpacity>

					<View style={{ flexDirection: 'row' }}>
						{prospecto.email &&

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
