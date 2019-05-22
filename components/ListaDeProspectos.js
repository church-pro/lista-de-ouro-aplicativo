import React from 'react';
import {
	Text,
	View,
	FlatList,
} from 'react-native';
import Prospecto from '../components/Prospecto'

class ListaDeProspectos extends React.Component {

	_keyExtractor = (item, index) => item.id;

	_renderItem = ({item}) => (
		<Prospecto 
			key={item.id} 
			prospecto={item} 
			navigation={this.props.navigation}
		/>
	)

	render() {
		const { title, prospectos, navigation } = this.props
		return (
			<View style={{flex: 1 }}>
				<Text style={{ textAlign: 'center', color: '#AAA', padding: 10,}}>{title}</Text>			
				{
					prospectos &&
						<FlatList
							data={prospectos}
							renderItem={this._renderItem}
							keyExtractor={this._keyExtractor}
							navigation={navigation}
						/>
				}
			</View>
		)
	}

}

export default ListaDeProspectos
