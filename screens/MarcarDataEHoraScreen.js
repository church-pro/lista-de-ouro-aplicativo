import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements'
import { white, red } from '../helpers/colors'
import { connect } from 'react-redux'

class MarcarDataEHoraScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Marcar data e hora',
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
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Data"
						label="DATA"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="calendar"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
					/>
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Horário"
						label="HORA"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="clock-o"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
					/>
					<Input
						containerStyle={{ width: '90%' }}
						placeholder="Onde ocorrerá?"
						label="LOCAL"
						labelStyle={{ marginTop: 16 }}
						leftIcon={
							<Icon
								name="map-marker"
								type="font-awesome"
								color="#86939e"
								size={25}
							/>
						}
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

export default connect(mapStateToProps, null)(MarcarDataEHoraScreen)
