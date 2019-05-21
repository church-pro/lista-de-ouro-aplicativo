import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Alert, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { dark, white, gray, gold, lightdark } from '../helpers/colors';
import logo from '../assets/images/logo-word.png'
import { Icon } from 'native-base';
import {
	alterarUsuarioNoAsyncStorage,
} from '../actions'
import { connect } from 'react-redux'

class LoginScreen extends React.Component {

	static navigationOptions = {
		headerTintColor: white,
		header: null,
	}

	state = {
		email: '',
		senha: '',
	}

	ajudadorDeSubmissao = () => {
		const {
			email,
			senha,
		} = this.state

		mostrarMensagemDeErro = false
		if (email === '') {
			mostrarMensagemDeErro = true
		}

		if (senha === '') {
			mostrarMensagemDeErro = true
		}

		if (mostrarMensagemDeErro) {
			Alert.alert('Erro', 'Campos invalidos')
		} else {
			const dados = {
				email,
				senha,
			}
			this.props.alterarUsuarioNoAsyncStorage(dados)
				.then(() => {
					this.props.navigation.navigate('Prospectos')
					this.props.navigation.state.params.sincronizar()
				})
		}
	}

	render() {
		const {
			email,
			senha,
		} = this.state
		const { goBack } = this.props.navigation;
		return (

			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				style={{ backgroundColor: dark }}
				enableOnAndroid enableAutomaticScroll={true}
				extraScrollHeight={Platform.OS === 'ios' ? 30 : 80} >

				<View>
					<View style={{ padding: 14 }}>
						<TouchableOpacity onPress={() => goBack()}>
							<Icon name="arrow-left" style={{ color: white, fontSize: 22 }} type='FontAwesome' />
						</TouchableOpacity>
					</View>

					<Image source={logo} style={styles.logo} />
				</View>

				<View style={styles.containerLogin}>
					<View>
						<View style={{ flexDirection: 'row' }}>
							<Icon name='envelope' type='FontAwesome'
								style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
							/>
							<Text style={{ color: gold }}>Email</Text>
						</View>
						<TextInput style={styles.inputText}
							keyboardAppearance='dark'
							autoCapitalize="none"
							placeholderTextColor="#d3d3d3"
							selectionColor="#fff"
							keyboardType="email-address"
							value={email}
							onChangeText={texto => this.setState({ email: texto })}
						/>
					</View>
					<View style={{ marginTop: 18 }}>
						<View style={{ flexDirection: 'row' }}>
							<Icon name='lock' type='FontAwesome'
								style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
							/>
							<Text style={{ color: gold }}>Senha</Text>
						</View>
						<TextInput style={styles.inputText}
							keyboardAppearance='dark'
							autoCapitalize="none"
							placeholderTextColor="#d3d3d3"
							selectionColor="#fff"
							keyboardType='default'
							secureTextEntry={true}
							value={senha}
							onChangeText={texto => this.setState({ senha: texto })}
						/>
					</View>
				</View>

				<View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.ajudadorDeSubmissao()}>
						<Text style={styles.textButton}>Logar</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.containerButton}>

					<TouchableOpacity
						style={[styles.button, style = { backgroundColor: 'transparent' }]}
						onPress={() => this.props.navigation.navigate('Registro')}>
						<Text style={[styles.textButton, style = { color: white, fontWeight: '200' }]}>Crie sua conta</Text>
					</TouchableOpacity>
				</View>

				{/* </View> */}
			</KeyboardAwareScrollView>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
	}
}

export default connect(null, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: dark,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	logo: {
		alignSelf: 'center',
		width: 200,
		height: 115,
	},
	containerLogin: {
		height: 210,
		margin: 12,
		backgroundColor: lightdark,
		borderRadius: 10,
		justifyContent: 'center',
		padding: 14,
	},
	inputText: {
		paddingVertical: 5,
		fontSize: 16,
		color: white,
		borderRadius: 6,
		fontWeight: '400',
		borderBottomWidth: 1,
		borderBottomColor: white,

	},
	containerButton: {
		marginBottom: 6,
	},
	button: {
		backgroundColor: gold,
		height: 45,
		borderRadius: 10,
		justifyContent: 'center',
		marginHorizontal: 12,
	},
	textButton: {
		fontSize: 16,
		color: dark,
		textAlign: 'center',
	},
})

