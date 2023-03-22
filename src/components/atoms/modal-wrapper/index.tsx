import { CrossModal } from 'assets/icons'
import { colors } from 'config/colors'
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { mvs } from '../../../config/metrices'
type props = {
    style?: StyleProp<ViewStyle>
    headerStyle?: StyleProp<ViewStyle>
    children?: JSX.Element | JSX.Element[]
    visible?: boolean
    onBackdropPress?: (() => void) | undefined
    onBackButtonPress?: (() => void) | undefined
}
export const ModalWrapper = (props: props) => {
    const {
        children,
        style,
        headerStyle,
        visible = false,
        onBackdropPress = () => { },
        onBackButtonPress = () => { }
    } = props;
    return (
        <Modal
            onBackdropPress={onBackdropPress}
            onBackButtonPress={onBackButtonPress}
            isVisible={visible}
            style={[styles.contentContainerStyle]}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    contentContainerStyle: {
        margin: 0,
    },
    container: {
        borderRadius: mvs(15),
        backgroundColor: colors.white,
        alignSelf: 'center',
    },
})