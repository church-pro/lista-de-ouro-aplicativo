import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Card, Icon, Button, Rating } from 'react-native-elements'
import { gray, white, green, red } from '../helpers/colors'

class Prospecto extends React.Component {

	render() {
		const { prospecto, navigation } = this.props
		return (
			<View style={{flex: 1 }}>
				<Card key={prospecto.id}>
					<View style={{flexDirection: 'row', marginLeft: -15}}>
						<View style={{width: 40}}>
							<Icon name='user' type='font-awesome' size={20} color='#aaa' />
						</View>
						<View>
							<Text style={{color: '#aaa'}}>{prospecto.name}</Text>
						</View>
					</View>

					<View style={{flexDirection: 'row', marginLeft: -15}}>
						<View style={{width: 40}}>
							<Icon name='phone' type='font-awesome' size={20} color='#aaa' />
						</View>
						<View>
							<Text style={{color: '#aaa'}}>{prospecto.phone}</Text>
						</View>
					</View>

					<View style={{flexDirection: 'row', marginLeft: -15}}>
						<View style={{width: 40}}>
							<Icon name='envelope' type='font-awesome' size={20} color='#aaa' />
						</View>
						<View>
							<Text style={{color: '#ddd'}}>Adicionar E-mail</Text>
						</View>
					</View>

					{
						prospecto.rating &&
							<View style={{flexDirection: 'row', marginLeft: -15}}>
								<View style={{width: 40}}>
									<Rating 
										type="star"
										imageSize={10}
										readOnly
										startingValue={prospecto.rating}
										style={{ paddingVertical: 10 }}
									/>
								</View>
							</View>
					}

					<View style={{flexDirection: 'row', backgroundColor: '#eee', height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
						{
							prospecto.situacao_id === 1 &&
							<View style={{flexDirection: 'row'}}>
								<Icon
									name='trash'
									type='font-awesome'
									color='#aaa'
									onPress={() => alert('huiashduiasd')}
								/>
								<Button 
									title='Qualificar'
									buttonStyle={{backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10,}}
									textStyle={{color: white,}}
									onPress={() => { navigation.navigate('QualificarProspecto', {prospecto_id: prospecto.id}) }} 
								/>
							</View>
						}
						{
							prospecto.situacao_id === 2 &&
								<View style={{flexDirection: 'row'}}>
									<Button 
										title='Marcar Apresentação'
										buttonStyle={{backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10,}}
										textStyle={{color: white,}}
										onPress={() => { navigation.navigate('MarcarDataEHora', {prospecto_id: prospecto.id}) }} 
									/>
								</View>
						}
						{
							prospecto.situacao_id === 3 &&
								<View style={{flexDirection: 'row', justifyContent: 'center'}}>
									<Text style={{justifyContent: 'center'}}>Apresentação feita?</Text>
									<Button 
										title='Sim'
										buttonStyle={{backgroundColor: green, height: 30, marginTop: 5, marginRight: 25}}
										textStyle={{color: white,}}
										onPress={() => { navigation.navigate('Perguntas', {prospecto_id: prospecto.id}) }} 
									/>
									<Button 
										title='Não'
										buttonStyle={{backgroundColor: red, height: 30, marginTop: 5, marginRight: 10,}}
										textStyle={{color: white,}}
										onPress={() => { navigation.navigate('MarcarDataEHora', {prospecto_id: prospecto.id}) }} 
									/>
								</View>
						}
						{
							prospecto.situacao_id === 4 &&
								<View style={{flexDirection: 'row'}}>
									<Button 
										title='Remarcar'
										buttonStyle={{backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10,}}
										textStyle={{color: white,}}
										onPress={() => { navigation.navigate('MarcarDataEHora', {prospecto_id: prospecto.id}) }} 
									/>
								</View>
						}
						{
							prospecto.situacao_id === 5 &&
								<View style={{flexDirection: 'row'}}>
									<Button 
										title='Remarcar'
										buttonStyle={{backgroundColor: gray, height: 30, marginTop: 5, marginRight: 25,}}
										textStyle={{color: white,}}
										onPress={() => { navigation.navigate('MarcarDataEHora', {prospecto_id: prospecto.id}) }} 
									/>
									<Button 
										title='Fechamento'
										buttonStyle={{backgroundColor: green, height: 30, marginTop: 5, marginRight: 10,}}
										textStyle={{color: white,}}
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
