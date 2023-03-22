import { mvs } from "config/metrices";
import { StyleSheet } from "react-native";
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,

    },
    body: {
        paddingVertical: mvs(30),
        paddingHorizontal: mvs(20)
    },
    lan: {
        height: mvs(120),
        marginTop: mvs(20),
        backgroundColor: colors.primary
    },
    btnText: {
        fontSize: mvs(24)
    }
});
export default styles;