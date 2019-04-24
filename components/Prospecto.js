import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity,
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
	SITUACAO_FECHADO
} from '../helpers/constants'
import { alterarProspecto, alterarAdministracao } from '../actions'
import { connect } from 'react-redux'
import styles from './ProspectoStyle';

class Prospecto extends React.Component {

	removerProspecto() {
		const { prospecto, alterarProspecto } = this.props
		prospecto.situacao_id = SITUACAO_REMOVIDO
		alterarProspecto(prospecto)
		Alert.alert('Removido', 'Prospecto removido!')
	}

	fecharProspecto() {
		const { prospecto, alterarProspecto } = this.props
		prospecto.situacao_id = SITUACAO_FECHADO
		alterarProspecto(prospecto)
		Alert.alert('Sucesso', 'Prospecto fechou!')
	}

	chamarOTelefoneDoCelular() {
		const { prospecto, alterarAdministracao, alterarProspecto } = this.props
		let { administracao } = this.props
		administracao.ligueiParaAlguem = true
		administracao.prospectoSelecionado = prospecto
		alterarAdministracao(administracao)
		prospecto.ligueiParaAlguem = true
		alterarProspecto(prospecto)
		call({ number: prospecto.telefone, prompt: false }).catch(console.error)
	}

	render() {
		const { prospecto, navigation } = this.props
		return (
			<View>

			<Card containerStyle={styles.containerCard} key={prospecto.id}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					{
						prospecto.data &&
						<View style={styles.date}>
							<Badge value={`${prospecto.data} - ${prospecto.hora}`} badgeStyle={styles.badgeDate}>
								{/* <Text style={styles.text}>{prospecto.local}</Text> */}
							</Badge>
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
							<TouchableOpacity
								style={styles.button}
								onPress={() => { this.chamarOTelefoneDoCelular() }}
								>
								<Text style={styles.textButton}>Ligar</Text>
							</TouchableOpacity>

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
							<Text style={{ justifyContent: 'center' }}>Apresentação feita?</Text>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
									>
									<Text style={styles.textButton}>Sim</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, { marginLeft: 5 }]}
									onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_ACOMPANHAR }) }}
									>
									<Text style={styles.textButton}>Não</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
					{
						(prospecto.situacao_id === SITUACAO_ACOMPANHAR || prospecto.situacao_id === SITUACAO_FECHAMENTO) &&
						<View style={styles.footerAcompanhar}>
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
				</View>
			</Card>

				
		</View>
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
		alterarProspecto: (prospecto) => dispatch(alterarProspecto(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Prospecto)
