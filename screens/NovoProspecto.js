import React from 'react';
import {
    KeyboardAvoidingView,
} from 'react-native';
import { Button, Card, Icon, Input } from 'react-native-elements'
import { white, lightdark, dark, gold } from '../helpers/colors'
import {
	adicionarProspectosAoAsyncStorage,	
} from '../actions'
import { connect } from 'react-redux'

class NovoProspecto extends React.Component {

    state = {
        nome: '',
        telefone: '',
        email: '',
    }

	ajudadorDeSubmissao = () => {
		const {
			nome,
			telefone,
			email,
		} = this.state

		mostrarMensagemDeErro = false
		if(nome === ''){
			mostrarMensagemDeErro = true
		}

		if(telefone === ''){
			mostrarMensagemDeErro = true
		}

		if(mostrarMensagemDeErro){
			Alert.alert('Erro', 'Campos invalidos')
		}else{
			const dados = {
				nome,
				telefone,
				email,
			}
			this.props.adicionarProspectosAoAsyncStorage([dados])
			this.props.navigation.navigate('Prospectos')
		}
	}

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Novo Prospecto',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                alignSelf: 'center',
                color: white,
            },
            headerTintColor: white,
            headerLeftContainerStyle: {
                padding: 10,
            },
            headerRightContainerStyle: {
                padding: 10,
            },
        }
    }

    render() {
		const {
			nome,
			telefone,
			email,
		} = this.state
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: lightdark }} behavior="padding" enabled>
                <Card containerStyle={{ backgroundColor: dark, borderColor: gold, borderRadius: 6 }}>
                    <Input
                        keyboardAppearance='dark'
                        placeholder=""
                        placeholderTextColor={'#ddd'}
                        label="NOME"
                        inputStyle={{ color: white, marginLeft: 5 }}
                        labelStyle={{ marginTop: 5 }}
                        leftIcon={
                            <Icon
                                name="user"
                                type="font-awesome"
                                color={gold}
                                size={20}
                            />
                        }
						value={nome}
						onChangeText={texto => this.setState({nome:texto})}
					/>

                    <Input
                        keyboardType='phone-pad'
                        keyboardAppearance='dark'
                        placeholder=""
                        placeholderTextColor={'#ddd'}
                        label="NÚMERO"
                        inputStyle={{ color: white, marginLeft: 5 }}
                        labelStyle={{ marginTop: 16 }}
                        leftIcon={
                            <Icon
                                name="phone"
                                type="font-awesome"
                                color={gold}
                                size={20}
                            />
                        }
						value={telefone}
						onChangeText={texto => this.setState({telefone:texto})}
                    />
                    <Input
                        keyboardType='email-address'
                        keyboardAppearance='dark'
                        placeholder=""
                        placeholderTextColor={'#ddd'}
                        label="EMAIL"
                        inputStyle={{ color: white, marginLeft: 5 }}
                        labelStyle={{ marginTop: 16 }}
                        leftIcon={
                            <Icon
                                name="envelope"
                                type="font-awesome"
                                color={gold}
                                size={20}
                            />
                        }
						value={email}
						onChangeText={texto => this.setState({email:texto})}
                    />

                </Card>

                <Button
                    title='Salvar'
                    buttonStyle={{ backgroundColor: gold, height: 50, margin: 15 }}
                    textStyle={{ color: white, }}
                />

            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
		adicionarProspectosAoAsyncStorage: prospecto => dispatch(adicionarProspectosAoAsyncStorage(prospecto)),
	}
}

export default const(null, mapDispatchToProps)(NovoProspecto)
