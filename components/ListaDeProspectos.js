import React from 'react';
import {
	Text,
	View,
	ScrollView,
} from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements'
import { white } from '../helpers/colors'
import Prospecto from '../components/Prospecto'

class ListaDeProspectos extends React.Component {

	render() {
		const { title, prospectos, navigation } = this.props
		return (
			<View style={{flex: 1 }}>
				<Text style={{ textAlign: 'center', color: '#AAA', padding: 10,}}>{title}</Text>			
				<ScrollView>
					{
						prospectos && 
						prospectos.map(prospecto => 
							<Prospecto 
								key={prospecto.id} 
								prospecto={prospecto} 
								navigation={navigation}
							/>
						)
					}
				</ScrollView>
			</View>
		)
	}

}

export default ListaDeProspectos
