export const PEGAR_CONTATOS = 'PEGAR_CONTATOS'
export const ADICIONAR_CONTATOS = 'ADICIONAR_CONTATOS'
export const ALTERAR_CONTATO = 'ALTERAR_CONTATO'
export const PEGAR_ITEMS_AGENDA = 'PEGAR_ITEMS_AGENDA'
export const ADICIONAR_ITEM_AGENDA = 'ADICIONAR_ITEM_AGENDA'

export function pegarContatos(contatos){ 
	return {
		type: PEGAR_CONTATOS,
		contatos,
	}
}

export function adicionarContatos(contatos){ 
	return {
		type: ADICIONAR_CONTATOS,
		contatos,
	}
}

export function alterarContato(contato){ 
	return {
		type: ALTERAR_CONTATO,
		contato,
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
