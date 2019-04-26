import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { dark, white, gray, gold, lightdark } from '../helpers/colors';
import logo from '../assets/images/logo-word.png'
import { Icon } from 'native-base';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Image source={logo} style={styles.logo} />

                {/* <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center' }}  behavior="padding" enabled> */}
                <View style={styles.containerLogin}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='envelope' type='FontAwesome'
                                style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
                            />
                            <Text style={{ color: gold }}>Email</Text>
                        </View>
                        <TextInput style={styles.inputText}
                            keyboardAppearance='dark'
                            autoCapitalize="none"
                            placeholderTextColor="#d3d3d3"
                            selectionColor="#fff"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{ marginTop: 18 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='lock' type='FontAwesome'
                                style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
                            />
                            <Text style={{ color: gold }}>Senha</Text>
                        </View>
                        <TextInput style={styles.inputText}
                            keyboardAppearance='dark'
                            autoCapitalize="none"
                            placeholderTextColor="#d3d3d3"
                            selectionColor="#fff"
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                    </View>

                </View>

                {/* </KeyboardAvoidingView> */}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: dark,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    logo: {
        alignSelf: 'center',
        width: 205,
        height: 120,
    },
    containerLogin: {
        height: 240,
        margin: 12,
        backgroundColor: lightdark,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 14,
    },
    inputText: {
        paddingVertical: 5,
        fontSize: 16,
        color: white,
        borderRadius: 6,
        fontWeight: '400',
        borderBottomWidth: 1,
        borderBottomColor: white,

    },
    button: {
        backgroundColor: gold,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 12,
    },
    textButton: {
        fontSize: 16,
        color: white,
        textAlign: 'center',
    }
})

