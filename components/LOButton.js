import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { gold } from '../helpers/colors'

const LOButton = ({ OnPress, title }) => (
    <View style={styles.containerButton}>
        <TouchableOpacity
            style={styles.button}
            onPress={OnPress}
        >
            <Text style={{ textAlign: "center", fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
    </View>
);

export default LOButton;

const styles = StyleSheet.create({
    containerButton: {
        paddingVertical: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: gold,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity: 1.0,
    },
})