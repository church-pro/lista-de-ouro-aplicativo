import { StyleSheet } from 'react-native';
import { lightdark, gray, white, gold } from '../helpers/colors';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerCard: {
        backgroundColor: 'transparent', 
        borderRadius: 6, 
        padding: 0,
        flexDirection: 'column',
    },
    name_phone: {
        flexDirection: 'column',
        padding: 8,
    },
    text: {
        color: white
    },
    content: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    phone: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    mail: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    rating: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 5,
        paddingRight: 5,
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
        height: 35,
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
