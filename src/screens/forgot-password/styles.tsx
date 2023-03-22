import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingTop: 80,
        paddingHorizontal: mvs(20)
    },
    button: {
        marginTop: mvs(20),
    },
    txt: { fontSize: mvs(20), marginBottom: mvs(10), color: colors.primary },
    renew:{alignSelf: 'center', marginBottom: mvs(15)}
});
export default styles;