import {AsyncStorage} from 'react-native'

const CHAVE_BARALHOS = 'Baralhos:baralhos1'
const CHAVE_PERGUNTAS = 'Baralhos:perguntas1'

export function recuperarBaralhos(){
	return AsyncStorage.getItem(CHAVE_BARALHOS)
		.then(JSON.parse)
		.then((dados) => {
			if(dados === null){
				dados = {baralhos: []}
				AsyncStorage.setItem(CHAVE_BARALHOS, JSON.stringify(dados))
			}
			return dados
		})
}

export function recuperarPerguntas(){
	return AsyncStorage.getItem(CHAVE_PERGUNTAS)
		.then(JSON.parse)
		.then((dados) => {
			if(dados === null){
				dados = {perguntas: []}
				AsyncStorage.setItem(CHAVE_PERGUNTAS, JSON.stringify(dados))
			}
			return dados
		})
}

export function submeterBaralho(baralho){
	return recuperarBaralhos()
		.then(dados => {
			dados.baralhos = [...dados.baralhos, baralho]
			AsyncStorage.setItem(CHAVE_BARALHOS, JSON.stringify(dados))
			return baralho
		})
}

export function submeterPergunta(pergunta){
	return recuperarPerguntas()
		.then(dados => {
			dados.perguntas = [...dados.perguntas, pergunta]
			AsyncStorage.setItem(CHAVE_PERGUNTAS, JSON.stringify(dados))
			return pergunta
		})
}
