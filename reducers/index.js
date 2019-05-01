import { combineReducers } from 'redux'
import { 
	PEGAR_PROSPECTOS, 
	ADICIONAR_PROSPECTOS, 
	ALTERAR_PROSPECTO, 
	PEGAR_ITEMS_AGENDA, 
	ADICIONAR_ITEM_AGENDA,
	PEGAR_ADMINISTRACAO,
	ALTERAR_ADMINISTRACAO,
} from '../actions'

function prospectos(state = [], action){
	switch(action.type){
		case PEGAR_PROSPECTOS:
			return [...state, ...action.prospectos]
		case ADICIONAR_PROSPECTOS:
			return [...state, ...action.prospectos]
		case ALTERAR_PROSPECTO:
			const estadoAtualizado = state.map(prospecto => {
				if(prospecto.id === action.prospecto.id){
					return action.prospecto
				}else{
					return prospecto
				}
			})
			return [...estadoAtualizado]
		default:
			return state
	}
}

const estadoDaAdministracao = {
	ligueiParaAlguem: false,
	prospectoSelecionado: null,
}

function administracao(state = estadoDaAdministracao, action){
	switch(action.type){
		case PEGAR_ADMINISTRACAO:
			return {
				...state
			}
		case ALTERAR_ADMINISTRACAO:
			return {
				...action.administracao
			}
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
	prospectos,
	administracao,
	agenda,
})
