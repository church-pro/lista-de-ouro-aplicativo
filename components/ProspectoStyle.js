import { StyleSheet } from 'react-native';
import { red, lightdark, gray, white } from '../helpers/colors';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    date: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    hour: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    place: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
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
        marginBottom: -15,
    },
    footerRating: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerQualificar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerConvidar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerAPN: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerAcompanhar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },
    footerFechamento: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
    },

    //STYLE BUTTON
    button: {
        backgroundColor: lightdark,
        borderWidth: 0,
        borderRadius: 5,
        justifyContent: 'center',
        height: 28,
        paddingHorizontal: 8,
    },
    textButton: {
        textAlign: 'center',
        color: white
    }

})

export default styles;
