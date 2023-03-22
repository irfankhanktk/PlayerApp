import { Platform, StyleSheet } from "react-native";
import { colors } from '../../config/colors';
import { mvs } from "../../config/metrices";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: '50%',
        paddingHorizontal: mvs(20),

    },
    txt: { marginBottom: mvs(10), fontSize: mvs(20) },
    button: {
        width: '100%', paddingHorizontal: mvs(20), position: 'absolute', bottom: 0,
        paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40)
    }
});
export default styles;