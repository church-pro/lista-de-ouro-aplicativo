import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { AirbnbRating } from 'react-native-ratings'
import { white, red } from '../helpers/colors'
import { connect } from 'react-redux'
import { alterarProspecto } from '../actions'
import { SITUACAO_CONVIDAR } from '../helpers/constants'

class QualificarProspectoScreen extends React.Component {

	alterarProspecto(){
		const { prospecto, alterarProspecto, navigation } = this.props
		prospecto.rating = this.state.rating
		prospecto.situacao_id = SITUACAO_CONVIDAR
		alterarProspecto(prospecto)
		navigation.goBack()
	}

	constructor(props){
		super(props)
		this.alterarProspecto = this.alterarProspecto.bind(this)
	}

	componentDidMount(){
		this.props.navigation.setParams({
			alterarProspecto: this.alterarProspecto
		})
	}

	state = {
		rating: 0,
	}

	static navigationOptions = ({ navigation, }) => {
		const { params = {} } = navigation.state
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
					onPress={() => params.alterarProspecto()}
				/>
			),
		}
	}

	render() {
		const { prospecto } = this.props

		return (
			<View style={{flex: 1,}}>
				<Card>
					<Text>{prospecto.nome}</Text>
					<AirbnbRating 
						showRating={false}
						defaultRating={this.state.rating}
						onFinishRating={(valor) => this.setState({rating: valor})}
					/>
				</Card>
			</View>
		)
	}

}

function mapStateToProps({prospectos}, {navigation}){
	const prospecto_id = navigation.state.params.prospecto_id + ''
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarProspecto: (prospecto) => dispatch(alterarProspecto(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QualificarProspectoScreen)
