import React from 'react'
import { Button } from 'native-base'
import { Alert, View, Text, Image } from 'react-native'
import styles from './ProspectoStyle'
import { connect } from 'react-redux'
import { 
	alterarUsuarioNoAsyncStorage,
} from '../actions'
import {
	sendNotificationImmediately,
	scheduleNotification,
	cancelarTodasNotificacoes,
} from '../helpers/helper'

class SideBar extends React.Component {

	sair = () => {
		const {
			alterarUsuarioNoAsyncStorage,
			navigation,
		} = this.props
		const usuario = {}
		alterarUsuarioNoAsyncStorage(usuario)
			.then(() => {
				this.props.closeDrawer()
				Alert.alert('Sair', 'Você deslogou!')
			})
	}

    render() {
        return (
                <View style={styles.sideMenu}>
                    <Image style={styles.imgLogo} source={require('../assets/images/logo.png')} />
					<Button 
						style={{ backgroundColor: 'transparent', height: 80 }}
						onPress={() => sendNotificationImmediately()}	
					>
						<Text style={styles.textMenu}>
                            agora
                        </Text>
                    </Button>
					<Button 
						style={{ backgroundColor: 'transparent', height: 80 }}
						onPress={() => scheduleNotification()}	
					>
						<Text style={styles.textMenu}>
                            5 segundos 
                        </Text>
                    </Button>
    					<Button 
						style={{ backgroundColor: 'transparent', height: 80 }}
						onPress={() => cancelarTodasNotificacoes()}	
					>
						<Text style={styles.textMenu}>
                            Cancelar 
                        </Text>
                    </Button>
    
     
					<Button 
						style={{ backgroundColor: 'transparent', height: 80 }}
						onPress={() => this.sair()}	
					>
                        <Text style={styles.textMenu}>
                            Sair
                        </Text>
                    </Button>
                </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario))
	}
}

export default connect(null, mapDispatchToProps)(SideBar)
