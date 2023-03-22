import { PrimaryButton } from 'components/atoms/buttons'
import { ModalWrapper } from 'components/atoms/modal-wrapper'
import { Row } from 'components/atoms/row'
import { colors } from 'config/colors'
import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Medium from 'typography/medium-text'
import Regular from 'typography/regular-text'
import { mvs } from '../../../config/metrices'
import DescriptionCard from '../description-card'


const CartModal = (
    {
        style,
        value,
        visible = false,
        onClose = () => { },
        onChangeText
    }
) => {
    return (
        <ModalWrapper
            onBackdropPress={() => onClose()}
            onBackButtonPress={() => onClose()}
            visible={visible}
            style={[styles.contentContainerStyle, style]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onClose()} style={styles.bar} />
                <Medium numberOfLines={1} style={styles.title} label={`Hotel `} >
                    <Medium numberOfLines={1} style={{ ...styles.title, color: colors.black }} label={`Booking`} />
                </Medium>
                <Medium fontSize={mvs(20)} label={`Premium Hotel`} color={colors.primary} />
                <Medium fontSize={mvs(14)} label={`Subtitle or description`} color={colors.primary} />

                <Medium fontSize={mvs(20)} label={`Detalis`} />
                <Row style={styles.rowRating}>
                    <Icon name={'star'} color={colors.primary} size={mvs(16)} />
                    <Regular style={styles.rateTxt} label={'4.9 (2.3k)'}
                    />
                </Row>
                <DescriptionCard style={styles.des} />
                <View style={styles.bottom}>
                    <Row style={styles.row}>
                        <Regular style={styles.dollar} label={'$'} color={colors.primary}>
                            <Regular label={'09.00'} color={colors.black} fontSize={mvs(28)} />
                        </Regular>
                        <PrimaryButton containerStyle={styles.button} title={'Add to Cart'} />
                    </Row>
                </View>
            </View>
        </ModalWrapper>
    )
}
export default CartModal;
const styles = StyleSheet.create({
    contentContainerStyle: {
        width: '100%',
        backgroundColor: colors.transparent,
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    bar: {
        height: mvs(3),
        borderRadius: mvs(5),
        width: mvs(104),
        alignSelf: 'center',
        backgroundColor: colors.lightGray,
        marginBottom: mvs(20)
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(20),
        color: colors.primary,
    },
    des: { marginVertical: mvs(5) },
    rowRating: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: mvs(20),
    },
    rateTxt: {
        marginLeft: mvs(10),
        lineHeight: mvs(20), color: colors.black,
        fontSize: mvs(16),
    },
    container: {
        height: mvs(572),

        backgroundColor: colors.white,
        padding: mvs(15),
        borderTopRightRadius: mvs(20),
        borderTopLeftRadius: mvs(20)
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: mvs(Platform.OS === 'ios' ? 40 : 20)
    },
    row: { alignItems: 'center', },
    dollar: { marginHorizontal: mvs(20), fontSize: mvs(28) },
    button: { height: mvs(63), width: '45%' },
    cross: { padding: mvs(20), alignSelf: 'flex-end', position: 'absolute', }

})