import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import { Rating, Card, Icon } from 'react-native-elements'
import { white, red } from '../helpers/colors'
import { connect } from 'react-redux'

class QualificarProspectoScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Qualificar',
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
			},
			headerLeftContainerStyle:{
				padding: 10,
			},
			headerRightContainerStyle:{
				padding: 10,
			},
			headerRight: (
				<Icon
					name='check'
					type='font-awesome'
					color={white}
					onPress={() => {}}
				/>
			),
		}
	}

	render() {
		const { prospecto } = this.props

		return (
			<View style={{flex: 1,}}>
				<Card>
					<Text>{prospecto.name}</Text>
					<Rating 
						type="star"
						fractions={1}
						imageSize={40}
						style={{ paddingVertical: 10 }}
					/>
				</Card>
			</View>
		)
	}

}

function mapStateToProps({prospectos}, {navigation}){
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
}

export default connect(mapStateToProps, null)(QualificarProspectoScreen)
