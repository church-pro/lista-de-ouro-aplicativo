import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity,
	Linking
} from 'react-native';
import { Card, Icon, Badge } from 'react-native-elements'
import { white, lightdark, gold, dark } from '../helpers/colors'
import call from 'react-native-phone-call'
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

class Prospecto extends React.Component {

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
		Linking.openURL(`https://api.whatsapp.com/send?phone=55${prospecto.telefone}`).catch((err) => console.error(err))
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
					{
						prospecto.rating &&
						<View style={[styles.rating, style = { alignItems: 'center' }]}>
							<Icon name='star' type="font-awesome" size={14} color={gold} />
							<Text style={{ color: gold }}> {prospecto.rating} </Text>
						</View>
					}
				</View>
				<View style={styles.name_phone}>
					<View style={styles.content}>
						<Text style={[styles.text, style = { fontWeight: 'bold' }]}>{prospecto.nome}</Text>
					</View>

					<View style={styles.content}>
						<Text style={[styles.text, style = { marginTop: 5 }]}>{prospecto.telefone}</Text>
					</View>

					<View style={[styles.content, style={marginTop: 5}]}>
						<Icon name="phone" size={18} containerStyle={{marginRight: 8}} color={white}  onPress={() => { this.chamarOTelefoneDoCelular() }} />
						<Icon name="whatsapp" size={18} color={white} type='font-awesome' onPress={() => { this.whatsapp() }} />
					</View>
				</View>

				<View style={styles.subFooter}>
					{
						prospecto.situacao_id === SITUACAO_QUALIFICAR &&
						<View style={styles.footerQualificar}>
							<Icon
								name='trash'
								type='font-awesome'
								color={lightdark}
								onPress={() => { Alert.alert('Remover', 'Você deseja remover este prospecto?', [{ text: 'Não' }, { text: 'Sim', onPress: () => { this.removerProspecto() } }]) }}
							/>
							<TouchableOpacity
								style={styles.button}
								onPress={() => { navigation.navigate('QualificarProspecto', { prospecto_id: prospecto.id }) }}
							>
								<Text style={styles.textButton}>Qualificar</Text>
							</TouchableOpacity>
						</View>
					}
					{
						prospecto.situacao_id === SITUACAO_CONVIDAR &&
						<View style={styles.footerConvidar}>
							<Icon
								name='trash'
								type='font-awesome'
								color={lightdark}
								onPress={() => {
									Alert.alert('Remover', 'Você deseja remover este prospecto?',
										[{ text: 'Não' },
										{ text: 'Sim', onPress: () => { this.removerProspecto() } }])
								}
								}
							/>

							<TouchableOpacity
								style={styles.button}
								onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_APRESENTAR }) }}
							>
								<Text style={styles.textButton}>Marcar Apresentação</Text>
							</TouchableOpacity>

						</View>
					}
					{
						prospecto.situacao_id === SITUACAO_APRESENTAR &&
						<View style={styles.footerAPN}>
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ alignSelf: "center", marginRight: 5 }}>Apresentação feita?</Text>
								<TouchableOpacity
									style={styles.button}
									onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
								>
									<Text style={styles.textButton}>Sim</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, { marginLeft: 5 }]}
									onPress={() => {
										{
											Alert.alert(prospecto.nome, 'O que você deseja fazer com este prospecto?',
												[
													{ text: 'Excluir', onPress: () => { this.removerProspecto() } },
													{ text: 'Remarcar', onPress: () => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_ACOMPANHAR }) } },
													{ text: 'Cancelar' },
												])
										}
									}
									}
								// navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_ACOMPANHAR }) }}
								>
									<Text style={styles.textButton}>Não</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
					{prospecto.situacao_id === SITUACAO_ACOMPANHAR &&

						<View style={styles.footerAcompanhar}>
							<Icon
								name='trash'
								type='font-awesome'
								color={lightdark}
								onPress={() => {
									Alert.alert('Remover', 'Você deseja remover este prospecto?',
										[{ text: 'Não' },
										{ text: 'Sim', onPress: () => { this.removerProspecto() } }])
								}
								}
							/>
							<TouchableOpacity
								style={styles.button}
								onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_FECHAMENTO }) }}
							>
								<Text style={styles.textButton}>Remarcar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}
								onPress={() => { Alert.alert('Fechar', 'Você deseja fechar este prospecto?', [{ text: 'Não' }, { text: 'Sim', onPress: () => { this.fecharProspecto() } }]) }}
							>
								<Text style={styles.textButton}>Fechamento</Text>
							</TouchableOpacity>
						</View>
					}
					{prospecto.situacao_id == SITUACAO_FECHAMENTO &&
						<View style={styles.footerFechamento}>
							<Icon
								name='trash'
								type='font-awesome'
								color={lightdark}
								onPress={() => {
									Alert.alert('Remover', 'Você deseja remover este prospecto?',
										[{ text: 'Não' },
										{ text: 'Sim', onPress: () => { this.removerProspecto() } }])
								}
								}
							/>
							<View
								style={{ backgroundColor: gold, borderRadius: 9, borderWidth: 0, 
									padding: 5
								}}
							>
								<Text style={styles.textButton}>Pago</Text>
							</View>
						</View>
					}
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

export default connect(mapStateToProps, mapDispatchToProps)(Prospecto)
