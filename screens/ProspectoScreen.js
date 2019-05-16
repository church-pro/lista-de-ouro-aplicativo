import React from 'react';
import {
    KeyboardAvoidingView,
	Alert,
} from 'react-native';
import { Button, Card, Icon, Input } from 'react-native-elements'
import { white, lightdark, dark, gold } from '../helpers/colors'
import {
	alterarProspectoNoAsyncStorage,	
} from '../actions'
import { connect } from 'react-redux'

class ProspectoScreen extends React.Component {

    state = {
        nome: '',
		ddd: '',
        telefone: '',
        email: '',
    }

	componentDidMount = () => {
		const {
			prospectoSelecionado,
		} = this.props

		if(prospectoSelecionado){
			this.setState({
				nome: prospectoSelecionado.nome,
				ddd: prospectoSelecionado.ddd,
				telefone: prospectoSelecionado.telefone,
				email: prospectoSelecionado.email ? prospectoSelecionado.email : '',
			})
		}
	}

	ajudadorDeSubmissao = () => {
		const {
			nome,
			ddd,
			telefone,
			email,
		} = this.state
		let {
			prospectoSelecionado,
		} = this.props

		let camposComErro = ''
		mostrarMensagemDeErro = false
		if(nome === ''){
			mostrarMensagemDeErro = true
			if(camposComErro === ''){
				camposComErro = 'Nome'
			}
		}

		if(ddd === '' || ddd.length !== 2){
			mostrarMensagemDeErro = true
			if(camposComErro !== ''){
				camposComErro += ', '
			}
			camposComErro += 'DDD'
		}

		if(telefone === '' || telefone.length !== 9){
			mostrarMensagemDeErro = true
			if(camposComErro !== ''){
				camposComErro += ', '
			}
			camposComErro += 'Telefone'
		}

		if(mostrarMensagemDeErro){
			Alert.alert('Erro', `Campos invalidos: ${camposComErro}`)
		}else{
			let prospecto = {}
			if(prospectoSelecionado){
				prospecto = prospectoSelecionado	
			}else{
				prospecto.novo = true
				prospecto.id = Date.now() + ''
				prospecto.rating = null
				prospecto.online = false
				prospecto.situacao_id = 1
			}
			prospecto.nome = nome
			prospecto.ddd = ddd
			prospecto.telefone = telefone
			prospecto.email = email
			this.props.alterarProspectoNoAsyncStorage(prospecto)
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
			ddd,
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
                        label="DDD"
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
						value={ddd}
						onChangeText={texto => this.setState({ddd:texto})}
                    />
                    <Input
                        keyboardType='phone-pad'
                        keyboardAppearance='dark'
                        placeholder=""
                        placeholderTextColor={'#ddd'}
                        label="TELEFONE"
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
					onPress={()=>{this.ajudadorDeSubmissao()}}
				/>

            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = ({ prospectos }, { navigation }) => {
	let prospectoSelecionado = null
	let prospecto_id = null
	if(navigation.state.params){
		prospecto_id = navigation.state.params.prospecto_id
	}
	if(prospecto_id){
		prospectoSelecionado = prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
	return {
		prospectoSelecionado,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		alterarProspectoNoAsyncStorage: prospecto => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectoScreen)
