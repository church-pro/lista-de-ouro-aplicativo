import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
} from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { white } from '../helpers/colors'

class QualificarScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}

	render() {
		const { prospectos } = this.props
		return (
			<View style={{flex: 1 }}>
				<Text style={{ textAlign: 'center', color: '#AAA', padding: 10,}}>QUALIFICAR</Text>			
				<ScrollView>
					{
						prospectos && 
						prospectos.map(prospecto => (
							<Card key={prospecto.id}>
								<View style={{flexDirection: 'row', marginLeft: -15}}>
									<View style={{width: 40}}>
										<Icon name='user' type='font-awesome' size={20} />
									</View>
									<View>
										<Text>{prospecto.name}</Text>
									</View>
								</View>

								<View style={{flexDirection: 'row', marginLeft: -15}}>
									<View style={{width: 40}}>
										<Icon name='phone' type='font-awesome' size={20} />
									</View>
									<View>
										<Text>{prospecto.phone}</Text>
									</View>
								</View>

								<View style={{flexDirection: 'row', marginLeft: -15}}>
									<View style={{width: 40}}>
										<Icon name='envelope' type='font-awesome' size={20} />
									</View>
									<View>
										<Text>Adicionar E-mail</Text>
									</View>
								</View>

								<View style={{flexDirection: 'row', backgroundColor: '#eee', height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
									<Icon
										name='trash'
										type='font-awesome'
										color='#000'
										onPress={() => alert('hello')} />
	
									<Button 
										title='Qualificar'
										buttonStyle={{height: 30, marginTop: 5, marginRight: -10,}}
										textStyle={{color: white,}}
										color='gray'
									/>
								</View>
							</Card>
						))
					}
				</ScrollView>
			</View>
		)
	}

}

function mapStateToProps({prospectos}){
	return {
		prospectos,
	}
}

export default connect(mapStateToProps, null)(QualificarScreen)
