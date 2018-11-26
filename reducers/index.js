import { combineReducers } from 'redux'
import { PEGAR_CONTATOS, ADICIONAR_CONTATOS, ALTERAR_CONTATO, PEGAR_ITEMS_AGENDA, ADICIONAR_ITEM_AGENDA } from '../actions'

function contatos(state = [], action){
	switch(action.type){
		case PEGAR_CONTATOS:
			return [...state, ...action.contatos]
		case ADICIONAR_CONTATOS:
			return [...state, ...action.contatos]
		case ALTERAR_CONTATO:
			const estadoAtualizado = state.map(contato => {
				if(contato.id === action.contato.id){
					return action.contato
				}else{
					return contato
				}
			})
			return [...estadoAtualizado]
		default:
			return state
	}
}

function agenda(state = [], action){
	switch(action.type){
		case PEGAR_ITEMS_AGENDA:
			return [...state, ...action.items]
		case ADICIONAR_ITEM_AGENDA:
			return [...state, action.item]
		default:
			return state
	}
}

export default combineReducers({
	contatos,
	agenda,
})
