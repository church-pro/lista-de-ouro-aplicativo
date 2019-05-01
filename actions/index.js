import {
	recuperarProspectos,
	submeterProspectos,
	modificarProspecto,
	submeterHistoricos,
} from '../helpers/api'
import{
	pegarDataEHoraAtual,
} from '../helpers/helper'

export const PEGAR_PROSPECTOS = 'PEGAR_PROSPECTOS'
export const ADICIONAR_PROSPECTOS = 'ADICIONAR_PROSPECTOS'
export const ALTERAR_PROSPECTO = 'ALTERAR_PROSPECTO'
export const PEGAR_ADMINISTRACAO = 'PEGAR_ADMINISTRACAO'
export const ALTERAR_ADMINISTRACAO = 'ALTERAR_ADMINISTRACAO'
export const PEGAR_ITEMS_AGENDA = 'PEGAR_ITEMS_AGENDA'
export const ADICIONAR_ITEM_AGENDA = 'ADICIONAR_ITEM_AGENDA'

export function pegarProspectos(prospectos){ 
	return {
		type: PEGAR_PROSPECTOS,
		prospectos,
	}
}

export function adicionarProspectos(prospectos){ 
	return {
		type: ADICIONAR_PROSPECTOS,
		prospectos,
	}
}

export function alterarProspecto(prospecto){ 
	return {
		type: ALTERAR_PROSPECTO,
		prospecto,
	}
}

export function pegarAdministracao(administracao){ 
	return {
		type: PEGAR_ADMINISTRACAO,
		administracao,
	}
}

export function alterarAdministracao(administracao){ 
	return {
		type: ALTERAR_ADMINISTRACAO,
		administracao,
	}
}

export function pegarItemsAgenda(items){
	return {
		type: PEGAR_ITEMS_AGENDA,
		items,
	}
}

export function adicionarItemAgenda(item){
	return {
		type: ADICIONAR_ITEM_AGENDA,
		item,
	}
}

export const pegarProspectosNoAsyncStorage = () => dispatch => {
	return recuperarProspectos()
		.then(prospectosNaAsyncStorage => {
			dispatch(pegarProspectos(prospectosNaAsyncStorage.prospectos))
			return prospectosNaAsyncStorage.prospectos 
		})
}

export const adicionarProspectosAoAsyncStorage = (prospectos) => dispatch => {
	const historicos = 
		prospectos
		.map(prospecto => {
			const historico = {
				sincronizado: false,
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				dados: {
					prospecto_id: prospecto.id,
					prospecto,
				},
			}
			return historico
		})
	submeterHistoricos(historicos)
	submeterProspectos(prospectos)
		.then(prospectos => dispatch(adicionarProspectos(prospectos)))
}

export const alterarProspectoNoAsyncStorage = (prospecto) => dispatch => {
	const historico = {
		sincronizado: false,
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		dados: {
			prospecto_id: prospecto.id,
			situacao_id: prospecto.situacao_id,
		}
	}
	submeterHistoricos([historico])
	modificarProspecto(prospecto)
		.then(prospecto => dispatch(alterarProspecto(prospecto)))
}
