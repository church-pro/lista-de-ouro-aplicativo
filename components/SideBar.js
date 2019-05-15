import React from 'react'
import { Button } from 'native-base'
import { View, Text, Image } from 'react-native'
import styles from './ProspectoStyle'

class SideBar extends React.Component {

    render() {
        return (

                <View style={styles.sideMenu}>
                    <Image style={styles.imgLogo} source={require('../assets/images/logo.png')} />

                    <Button style={{ backgroundColor: 'transparent', height: 80 }}>
                        <Text style={styles.textMenu}>
                            Alterar perfil
                        </Text>
                    </Button>
                    <Button style={{ backgroundColor: 'transparent', height: 80 }}>
                        <Text style={styles.textMenu}>
                            Sair
                        </Text>
                    </Button>
                </View>
        );
    }
};

export default SideBar