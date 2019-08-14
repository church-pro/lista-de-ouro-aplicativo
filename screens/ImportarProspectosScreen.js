import React from 'react';
import {
	Alert,
	ScrollView,
	TouchableOpacity,
	Text,
	View,
	ActivityIndicator,
	FlatList,
	TextInput
} from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { Permissions, Contacts } from 'expo'
import {
	adicionarProspectosAoAsyncStorage,
} from '../actions'
import { white, gold, lightdark, gray, dark } from '../helpers/colors'
import { SITUACAO_CONVIDAR } from '../helpers/constants'
import styles from '../components/ProspectoStyle';

class MyListItem extends React.PureComponent {
	_onPress = () => {
		this.props.onPressItem(this.props.id);
	};

	render() {
		const textColor = this.props.selected ? gold : white;
		return (
			<TouchableOpacity style={{
				padding: 12,
				borderBottomWidth: 1,
				borderColor: gray,
				backgroundColor: 'transparent'
			}}
				onPress={this._onPress}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text style={{ color: white }}>{this.props.title}</Text>
						<Text style={{ color: gray }}>{this.props.subTitle}</Text>

					</View>
					<View style={{ justifyContent: 'center' }}>
						<Icon name="check" color={textColor} />
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

class MultiSelectList extends React.PureComponent {
	state = { selected: (new Map(): Map<string, boolean>) };

	componentDidMount() {
		this.setState({ selected: this.props.selected })
	}

	_keyExtractor = (item, index) => item.id;

	_onPressItem = (id: string) => {
		this.props._onPressItem(id)
		// updater functions are preferred for transactional updates
		this.setState((state) => {
			// copy the map rather than modifying state.
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id)); // toggle
			return { selected };
		});
	};

	_renderItem = ({ item }) => (
		<MyListItem
			id={item.id}
			onPressItem={this._onPressItem}
			selected={!!this.state.selected.get(item.id)}
			title={item.title}
			subTitle={item.subTitle}
		/>
	);

	render() {
		return (
			<FlatList
				data={this.props.data}
				extraData={this.state}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				removeClippedSubviews={false}
			/>
		);
	}
}

class ImportarProspectosScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Importar Prospectos',
			headerTintColor: white,
			headerRight: (
				<TouchableOpacity style={{ marginRight: 9 }} onPress={() => { navigation.navigate('Prospecto') }}>
					<Icon name="user-plus" color={white} type="font-awesome" />
				</TouchableOpacity>
			)
		}
	}

	state = {
		carregando: true,
		busca: '',
		contatosParaSelecionar: null,
		selected: (new Map(): Map<string, boolean>)
	}

	_onPressItem = (id: string) => {
		// updater functions are preferred for transactional updates
		this.setState((state) => {
			// copy the map rather than modifying state.
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id)); // toggle
			return { selected };
		});
	};

	componentDidMount() {
		let contatosParaSelecionar = []
		Permissions.askAsync(Permissions.CONTACTS)
			.then(({ status }) => {
				if (status === 'granted') {
					Contacts.getContactsAsync()
						.then(data => {
							data.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
							data.data.map(contato => {
								if (contato.phoneNumbers && contato.phoneNumbers.length) {
									let contatoNovo = {}
									delete contatoNovo.selecionado
									contatoNovo.situacao_id = SITUACAO_CONVIDAR
									contatoNovo.id = Date.now() + contato.id
									contatoNovo.nome = contato.name
									contatoNovo.rating = null
									contatoNovo.email = null
									contatoNovo.online = false
									let contador = 1
									contato.phoneNumbers.map(item => {
										if (contador === 1) {
											let ddd = 61
											let telefoneTexto = item.number.toString()
											telefoneTexto = telefoneTexto.replace('-', '')
											telefoneTexto = telefoneTexto.replace(' ', '')
											telefoneTexto = telefoneTexto.replace('+', '')
											telefoneTexto = telefoneTexto.replace('(', '')
											telefoneTexto = telefoneTexto.replace(')', '')
											let telefone = telefoneTexto
											const tamanhoDoNumero = telefoneTexto.length
											if (tamanhoDoNumero > 9) {
												telefone = telefoneTexto.substr(tamanhoDoNumero - 9)
												if (parseInt(telefone.substr(0, 1)) !== 9) {
													telefone = telefoneTexto.substr(tamanhoDoNumero - 8)
												}
											}
											if (tamanhoDoNumero >= 11) {
												let valorParaReduzir = 11
												if (parseInt(telefoneTexto.substr(0, 1)) === 0) {
													valorParaReduzir = 10
												}
												ddd = telefoneTexto.substr(tamanhoDoNumero - valorParaReduzir, 2)
												if (parseInt(ddd).toString().length !== 2) {
													ddd = '61'
												}
											}
											contatoNovo.ddd = ddd
											contatoNovo.telefone = telefone
											contatoNovo.title = `${contatoNovo.nome}`
											contatoNovo.subTitle = `(${contatoNovo.ddd}) ${contatoNovo.telefone}`
											contatosParaSelecionar.push(contatoNovo)
											contador++
										}
									})
								}
							})
							if (contatosParaSelecionar.length) {
								this.setState({
									contatosParaSelecionar,
									carregando: false
								})
							}
						})
				}
			})
	}

	selecionarContato(indice) {
		let {
			contatosParaSelecionar,
		} = this.state
		let contatoDoIndice = contatosParaSelecionar[indice]
		contatoDoIndice.selecionado = !contatoDoIndice.selecionado
		contatosParaSelecionar[indice] = contatoDoIndice
		this.setState({ contatosParaSelecionar })
	}

	adicionarContatos() {
		const {
			contatosParaSelecionar,
			selected,
			carregando,
		} = this.state
		const {
			adicionarProspectosAoAsyncStorage,
			navigation,
		} = this.props
		this.setState({ carregando: true })
		adicionarProspectosAoAsyncStorage(
			contatosParaSelecionar.filter(contato => selected.get(contato.id))
		).then(() => {
			this.setState({ carregando: false })
			Alert.alert('Importação', 'Importação concluida com sucesso!')
			navigation.goBack()
		})
	}

	render() {
		const { carregando } = this.state
		let {
			contatosParaSelecionar,
			selected,
			busca
		} = this.state

		if (busca != '') {

			contatosParaSelecionar = contatosParaSelecionar.filter(item => {
				const itemData = item.nome
				const textData = busca

				return itemData.indexOf(textData) > -1
			})
		}

		return (
			<View style={styles.container}>

				{
					carregando &&
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<ActivityIndicator
							size="large"
							color={gold}
						/>
					</View>
				}

				{
					!carregando && contatosParaSelecionar &&
					<View style={{ height: 40, borderWidth: 1, borderColor: gray, borderRadius: 6, marginHorizontal: 10, marginTop: 10 }}>
						<TextInput
							placeholder="Buscar"
							placeholderTextColor={gray}
							style={{ flex: 1, paddingHorizontal: 5, color: white }}
							onChangeText={texto => this.setState({ busca: texto })}
							value={busca}
							autoCorrect={false}
						/>
					</View>
				}

				{
					!carregando && contatosParaSelecionar &&
					<MultiSelectList
						data={contatosParaSelecionar}
						selected={selected}
						_onPressItem={this._onPressItem}
					>
					</MultiSelectList>
				}

				{
					!carregando && contatosParaSelecionar &&
					<View style={{ height: 70, backgroundColor: dark, justifyContent: 'center' }}>
						<TouchableOpacity style={styles.buttonImport}
							onPress={() => { this.adicionarContatos() }}
						>
							<Text style={styles.textButtonImport}>Importar</Text>
						</TouchableOpacity>
					</View>
				}

			</View>
		);
	}

}


function mapDispatchToProps(dispatch) {
	return {
		adicionarProspectosAoAsyncStorage: (contatos) => dispatch(adicionarProspectosAoAsyncStorage(contatos)),
	}
}

export default connect(null, mapDispatchToProps)(ImportarProspectosScreen)
