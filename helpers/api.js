import { AsyncStorage } from 'react-native'                                                                                                                                                              
const CHAVE_PROSPECTOS = 'ListaDeOuro:prospectos'

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
