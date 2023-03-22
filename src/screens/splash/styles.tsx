import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center',
        justifyContent:'center',

    },
    welcomeText:{
        color:colors.white,
    }
});
export default styles;