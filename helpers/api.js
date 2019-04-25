import { AsyncStorage } from 'react-native'                                                                                                                                                              
const CHAVE_PROSPECTOS = 'ListaDeOuro:prospectos001'
const CHAVE_HISTORICO = 'ListaDeOuro:historico001'

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
