import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import { Button, Card, Icon, Input, CheckBox } from 'react-native-elements'
import { white, red, gray, green } from '../helpers/colors'
import { connect } from 'react-redux'

class PerguntasScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Resultado',
		}
	}

	state = {
		foiFeitoOPreCadastro: false,
		naoFoiFeitoOPreCadastro: false,
		foiFechado: false,
		naoFoiFechado: false,
	}

	render() {
		const { prospecto, navigation } = this.props
		const { foiFeitoOPreCadastro, naoFoiFeitoOPreCadastro, foiFechado, naoFoiFechado } = this.state

		return (
			<View style={{flex: 1,}}>
				<Card>
					<Text>Foi feito o pré-cadastro?</Text>
					<View style={{flexDirection: 'row', backgroundColor: '#eee', height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
						<CheckBox
							title='Sim'
							checked={this.state.foiFeitoOPreCadastro}
							onPress={() => this.setState({
								foiFeitoOPreCadastro: true,
								naoFoiFeitoOPreCadastro: false,
							})}
							checkedIcon='dot-circle-o'
							uncheckedIcon='circle-o'
							containerStyle={{backgroundColor: '#eee'}}
						/>
						<CheckBox
							title='Não'
							checked={this.state.naoFoiFeitoOPreCadastro}
							onPress={() => this.setState({
								foiFeitoOPreCadastro: false,
								naoFoiFeitoOPreCadastro: true,
							})}
							checkedIcon='dot-circle-o'
							uncheckedIcon='circle-o'
							containerStyle={{backgroundColor: '#eee'}}
						/>
					</View>
				</Card>
				{
					foiFeitoOPreCadastro &&
						<Card>
							<Text>O prospecto fechou?</Text>
							<View style={{flexDirection: 'row', backgroundColor: '#eee', height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15}}>
								<CheckBox
									title='Sim'
									checked={this.state.foiFechado}
									onPress={() => this.setState({
										foiFechado: true,
										naoFoiFechado: false,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									containerStyle={{backgroundColor: '#eee'}}
								/>
								<CheckBox
									title='Não'
									checked={this.state.naoFoiFechado}
									onPress={() => this.setState({
										foiFechado: false,
										naoFoiFechado: true,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									containerStyle={{backgroundColor: '#eee'}}
								/>
							</View>
						</Card>

				}
				{
					foiFeitoOPreCadastro && foiFechado &&
						<Button 
							title='Prospecto fez fechamento'
							buttonStyle={{backgroundColor: green, height: 30, marginTop: 5, marginRight: 25}}
							textStyle={{color: white,}}
							onPress={() => { alert('Parabens!') }} 
						/>
				}
				{
					foiFeitoOPreCadastro && !foiFechado && naoFoiFechado &&
						<Button 
							title='Remarcar'
							buttonStyle={{backgroundColor: gray, height: 30, marginTop: 5, marginRight: 10,}}
							textStyle={{color: white,}}
							onPress={() => { navigation.navigate('MarcarDataEHora', {prospecto_id: prospecto.id}) }} 
						/>
				}
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

export default connect(mapStateToProps, null)(PerguntasScreen)
