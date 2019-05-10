import { AsyncStorage } from 'react-native'                                                                                                                                                              
const CHAVE_PROSPECTOS = 'ListaDeOuro:prospectos009'
const CHAVE_HISTORICO = 'ListaDeOuro:historico005'
const CHAVE_USUARIO = 'ListaDeOuro:usuario005'

let api = 'http://192.168.0.14:8080'
const headers = {
	'Content-Type': 'application/json'
}

export const teste = () => 
	fetch(`${api}/`)
		.then(resultado => resultado.json())
		.then(json => json)

export const sincronizarNaAPI = (dados) =>
	fetch(
		`${api}/no/sincronizar`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export function recuperarProspectos(){        
	return AsyncStorage.getItem(CHAVE_PROSPECTOS)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {prospectos: []}      
				AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function submeterProspectos(prospectos){
	return recuperarProspectos()              
		.then(dados => {                      
			dados.prospectos = [...dados.prospectos, ...prospectos]
			AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			return prospectos                 
		})                                    
}

export function modificarProspecto(prospecto){
	return recuperarProspectos()              
		.then(dados => {                      
			const prospectosAlterados = 
				dados.prospectos.map(prospectoNoAsyncStorage => {
					if(prospectoNoAsyncStorage.id === prospecto.id){
						return prospecto
					}else{
						return prospectoNoAsyncStorage
					}
				})
			dados.prospectos = prospectosAlterados
			AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			return prospecto
		})                                    
}

export function recuperarHistorico(){        
	return AsyncStorage.getItem(CHAVE_HISTORICO)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {historico: []}      
				AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function submeterHistoricos(historicos){
	return recuperarHistorico()              
		.then(dados => {                      
			dados.historico = [...dados.historico, ...historicos]
			AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(dados))
			return historicos                 
		})                                    
}

export function recuperarUsuario(){        
	return AsyncStorage.getItem(CHAVE_USUARIO)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {usuario: {}}      
				AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function submeterUsuario(usuario){
	return recuperarUsuario()              
		.then(dados => {                      
			dados.usuario = usuario
			AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
			return usuario                 
		})
}
