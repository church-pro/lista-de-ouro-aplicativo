import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity
} from 'react-native';
import { Card, Icon, Button, Rating } from 'react-native-elements'
import { gray, white, green, red, lightdark } from '../helpers/colors'
import call from 'react-native-phone-call'
import { SITUACAO_QUALIFICAR, SITUACAO_CONVIDAR, SITUACAO_APRESENTAR, SITUACAO_ACOMPANHAR, SITUACAO_FECHAMENTO, SITUACAO_REMOVIDO, SITUACAO_FECHADO } from '../helpers/constants'
import { alterarProspecto } from '../actions'
import { connect } from 'react-redux'
import styles from './ProspectoStyle';

class Prospecto extends React.Component {

	chamarOTelefoneDoCelular() {
		const { prospecto } = this.props
		call({ number: prospecto.telefone, prompt: false }).catch(console.error)
	}

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

	render() {
		const { prospecto, navigation } = this.props
		return (
			<View style={{ flex: 1 }}>

				<Card key={prospecto.id}>

					<View style={styles.name_phone}>
						<View style={styles.name}>
							<Icon name='user' type='font-awesome' size={20} color='#aaa' />
							<Text style={styles.text}>{prospecto.nome}</Text>
						</View>

						<View style={styles.phone}>
							<Icon name='phone' type='font-awesome' size={19} color='#aaa' />
							<Text style={styles.text}>{prospecto.telefone}</Text>
						</View>
					</View>

					{
						prospecto.email &&
						<View>
							<View style={styles.mail}>
								<Icon name='envelope' type='font-awesome' size={18} color='#aaa' />
								<Text style={styles.text}>Adicionar E-mail</Text>
							</View>
						</View>
					}
					{
						prospecto.rating &&
						<View style={styles.rating}>
							<Rating
								type="custom"
								imageSize={10}
								readonly
								startingValue={prospecto.rating}
								imageSize={17}
								ratingColor={lightdark}
							/>
						</View>
					}
					{
						prospecto.data &&
						<View>
							<View style={styles.date}>
								<Icon name='calendar' type='font-awesome' size={19} color='#aaa' />
								<Text style={styles.text}>{prospecto.data}</Text>
							</View>
							<View style={styles.hour}>
								<Icon name='clock-o' type='font-awesome' size={20} color='#aaa' />
								<Text style={styles.text}>{prospecto.hora}</Text>
							</View>
							{
								prospecto.local &&
								<View style={styles.place}>
									<Icon name='map-marker' type='font-awesome' size={20} color='#aaa' />
									<Text style={styles.text}>{prospecto.local}</Text>
								</View>
							}
						</View>
					}

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
							prospecto.situacao_id === SITUACAO_ACOMPANHAR &&
							<View style={styles.footerAcompanhar}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_FECHAMENTO }) }}
								>
									<Text style={styles.textButton}>Remarcar</Text>
								</TouchableOpacity>
							</View>
						}
						{
							prospecto.situacao_id === SITUACAO_FECHAMENTO &&
							<View style={styles.footerFechamento}>
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

function mapDispatchToProps(dispatch) {
	return {
		alterarProspecto: (prospecto) => dispatch(alterarProspecto(prospecto)),
	}
}

export default connect(null, mapDispatchToProps)(Prospecto)
