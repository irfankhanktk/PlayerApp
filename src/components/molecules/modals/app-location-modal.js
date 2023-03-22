import { CrossModal } from 'assets/icons'
import { Loader } from 'components/atoms/loader'
import { ModalWrapper } from 'components/atoms/modal-wrapper'
import { colors } from 'config/colors'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Medium from 'typography/medium-text'
import { mvs } from '../../../config/metrices'
import DoctorAvailabilityLocation from '../doctor-availability-location'
import { EmptyList } from '../empty-list'

const AppointmentLocationModal = (
    {
        locationsLoading,
        style,
        value,
        visible = false,
        onClose = (item) => { },
        onChangeText,
        items = [],
    }
) => {
    return (
        <ModalWrapper
            onBackdropPress={() => onClose()}
            onBackButtonPress={() => onClose()}
            visible={visible}
            style={[styles.contentContainerStyle, style]}>
            <View style={styles.container}>
                <View style={styles.header} />
                <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
                    <CrossModal />
                </TouchableOpacity>
                <Medium numberOfLines={2} style={styles.pick}
                    label={`Pick The Appointment\nlocation Please Select one`} />
                {locationsLoading ? <Loader /> : items?.length ? <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(20), paddingTop: mvs(10) }}>
                    {items?.map((item, index) => {
                        return (<DoctorAvailabilityLocation
                            price={item?.price}
                            onPress={() => onClose(item)}
                            key={index} item={item} />)
                    })}
                </ScrollView> : <EmptyList />
                }
            </View>
        </ModalWrapper>
    )
}
export default AppointmentLocationModal;
const styles = StyleSheet.create({
    contentContainerStyle: {
        width: '100%',
        backgroundColor: colors.transparent,
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        maxHeight: mvs(572),
        minHeight: mvs(400),
        backgroundColor: colors.white,
        paddingTop: mvs(15),
        borderTopRightRadius: mvs(20),
        borderTopLeftRadius: mvs(20)
    },
    header: {
        height: mvs(3),
        borderRadius: mvs(5),
        width: mvs(104),
        alignSelf: 'center',
        backgroundColor: colors.lightGray,
        marginBottom: mvs(20)
    },
    pick: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: mvs(20)
    },
    button: {
        paddingHorizontal: mvs(30),
        marginBottom: mvs(20)
    },
    cross: { padding: mvs(20), alignSelf: 'flex-end', position: 'absolute', }

})