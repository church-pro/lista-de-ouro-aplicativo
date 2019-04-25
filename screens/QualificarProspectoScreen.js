import React from 'react';
import {
	View,
	Text,
	Alert,
} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { AirbnbRating } from 'react-native-ratings'
import { white, red, lightdark, dark, gray, gold } from '../helpers/colors'
import { connect } from 'react-redux'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { SITUACAO_CONVIDAR } from '../helpers/constants'

class QualificarProspectoScreen extends React.Component {

	alterarProspecto = () => {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
		prospecto.rating = this.state.rating
		prospecto.situacao_id = SITUACAO_CONVIDAR
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Qualificado', 'Agora seu prospecto está na etapa "Convidar"')
		navigation.goBack()
	}

	componentDidMount() {
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
			// title: 'Qualificar',
			headerStyle: {
				backgroundColor: white,
				borderBottomColor: white,
			},
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
			},
			headerLeftContainerStyle: {
				padding: 10,
			},
			headerRightContainerStyle: {
				padding: 10,
			},
			headerTintColor: dark,
			headerRight: (
				<Icon
					name='check'
					type='font-awesome'
					color={dark}
					onPress={() => params.alterarProspecto()}
				/>
			),
		}
	}


	render() {
		const { prospecto } = this.props

		return (
			<View style={{ flex: 1, backgroundColor: white, justifyContent: "flex-start" }}>
				{/* <Card> */}
				<Text style={{ textAlign: "center", paddingVertical: 25, color: gray, fontSize: 18 }}>
					Qualifique o prospecto de acordo com o nível de interesse
				</Text>

				<View>
					<Text style={{ textAlign: "center", fontSize: 27, color: dark, paddingVertical: 50 }}>
						{prospecto.nome}
					</Text>

					<AirbnbRating
						showRating={false}
						defaultRating={this.state.rating}
						onFinishRating={(valor) => this.setState({ rating: valor })}
					/>
				</View>

				{/* </Card> */}
			</View>
		)
	}
}

function mapStateToProps({ prospectos }, { navigation }) {
	const prospecto_id = navigation.state.params.prospecto_id + ''
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QualificarProspectoScreen)
