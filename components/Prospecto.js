import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Card, Icon, Button, Rating } from 'react-native-elements'
import { gray, white, green, red, lightdark } from '../helpers/colors'
import call from 'react-native-phone-call'
import { SITUACAO_QUALIFICAR, SITUACAO_CONVIDAR, SITUACAO_APRESENTAR, SITUACAO_ACOMPANHAR, SITUACAO_FECHAMENTO } from '../helpers/constants'
import styles from './ProspectoStyle';

class Prospecto extends React.Component {

	chamarOTelefoneDoCelular() {
		const { prospecto } = this.props
		call({ number: prospecto.telefone, prompt: false }).catch(console.error)
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
								readOnly
								startingValue={prospecto.rating}
								imageSize={16}
								ratingColor={lightdark}
							/>
						</View>
					}
					{
						prospecto.data &&
						<View>
							<View style={{ flexDirection: 'row', marginLeft: -15 }}>
								<View style={{ width: 40 }}>
									<Icon name='calendar' type='font-awesome' size={20} color='#aaa' />
								</View>
								<View>
									<Text style={{ color: '#ddd' }}>{prospecto.data}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginLeft: -15 }}>
								<View style={{ width: 40 }}>
									<Icon name='clock-o' type='font-awesome' size={20} color='#aaa' />
								</View>
								<View>
									<Text style={{ color: '#ddd' }}>{prospecto.hora}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginLeft: -15 }}>
								<View style={{ width: 40 }}>
									<Icon name='map-marker' type='font-awesome' size={20} color='#aaa' />
								</View>
								<View>
									<Text style={{ color: '#ddd' }}>{prospecto.local}</Text>
								</View>
							</View>
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
									onPress={() => alert('huiashduiasd')}
								/>
								<Button
									title='Qualificar'
									buttonStyle={{ backgroundColor: lightdark, height: 30 }}
									textStyle={{ color: white, }}
									onPress={() => { navigation.navigate('QualificarProspecto', { prospecto_id: prospecto.id }) }}
								/>
							</View>
						}
						{
							prospecto.situacao_id === SITUACAO_CONVIDAR &&
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
								<Button
									title='Ligar'
									buttonStyle={{ backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10, }}
									textStyle={{ color: white, }}
									onPress={() => { this.chamarOTelefoneDoCelular() }}
								/>

								<Button
									title='Marcar Apresentação'
									buttonStyle={{ backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10, }}
									textStyle={{ color: white, }}
									onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_APRESENTAR }) }}
								/>
							</View>
						}
						{
							prospecto.situacao_id === SITUACAO_APRESENTAR &&
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
								<Text style={{ justifyContent: 'center' }}>Apresentação feita?</Text>
								<View style={{ flexDirection: 'row' }}>
									<Button
										title='Sim'
										buttonStyle={{ backgroundColor: green, height: 30, marginTop: 5, marginRight: 25 }}
										textStyle={{ color: white, }}
										onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
									/>
									<Button
										title='Não'
										buttonStyle={{ backgroundColor: red, height: 30, marginTop: 5, marginRight: 10, }}
										textStyle={{ color: white, }}
										onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_ACOMPANHAR }) }}
									/>
								</View>
							</View>
						}
						{
							prospecto.situacao_id === SITUACAO_ACOMPANHAR &&
							<View style={{ flexDirection: 'row' }}>
								<Button
									title='Remarcar'
									buttonStyle={{ backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10, }}
									textStyle={{ color: white, }}
									onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_FECHAMENTO }) }}
								/>
							</View>
						}
						{
							prospecto.situacao_id === SITUACAO_FECHAMENTO &&
							<View style={{ flexDirection: 'row' }}>
								<Button
									title='Remarcar'
									buttonStyle={{ backgroundColor: gray, height: 30, marginTop: 5, marginRight: 25, }}
									textStyle={{ color: white, }}
									onPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_FECHAMENTO }) }}
								/>
								<Button
									title='Fechamento'
									buttonStyle={{ backgroundColor: green, height: 30, marginTop: 5, marginRight: 10, }}
									textStyle={{ color: white, }}
									onPress={() => { alert('Parabens!') }}
								/>
							</View>
						}

					</View>
				</Card>
			</View>
		)
	}
}

export default Prospecto
