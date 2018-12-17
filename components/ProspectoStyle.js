import { StyleSheet } from 'react-native';
import { red, lightdark, gray, white } from '../helpers/colors';

const styles = StyleSheet.create({

    block: {
        flex: 1,
    },
    icons: {
        color: "#aaa"
    },
    name_phone: {
        flexDirection: 'column',
    },
    text: {
        marginLeft: 10,
        color: gray
    },
    name: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    phone: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    mail: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    rating: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 6,
    },

    // STYLES FOOTER
    subFooter: {
        flexDirection: 'row',
        backgroundColor: white,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        height: 40,
        marginTop: 20,
        marginLeft: -15,
        marginRight: -15,
        marginBottom: -15
    },
    footerQualificar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },

    //STYLE BUTTON
    button: {
        backgroundColor: lightdark,
        borderWidth: 0,
        borderRadius: 5,
        justifyContent: 'center',
        height: 40,
        width: '40%',
    },
    textButton: {
        textAlign: 'center',
        color: "#aaa"
    }

})

export default styles;
