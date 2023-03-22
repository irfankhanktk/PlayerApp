import { login_bg } from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import { Row } from 'components/atoms/row';
import { APPOINTMNETSTATUS } from 'config/constants';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Medium from '../../../typography/medium-text';
import { UTILS } from '../../../utils';
const AppointmentCard = ({
  item,
  slotTime,
  statusLoading = false,
  style,
  onPress = () => { },
  onPressStatus = status => { },
}) => {
  const { t } = i18n;
  return (
    <TouchableOpacity
      disabled={statusLoading}
      onPress={onPress}
      style={styles.container}>
      <Row style={{ justifyContent: 'flex-start' }}>

        <Image
          source={
            item?.doctor?.banner_image_id
              ? { uri: item?.doctor?.banner_image_id }
              : login_bg
          }
          style={styles.img}
        />
        <View style={styles.leftContainer}>
          <Medium label={item?.patient?.name} style={styles.name} />
          <Regular
            label={`${item?.patient?.city || ''} ${item?.patient?.state || ''
              } ${item?.patient?.country || ''}`}
            style={styles.address}
          />
        </View>
      </Row>
      <Row style={styles.appoinment}>
        <Medium label={t('appoinment_no')} />
        <Regular label={`${item?.id}`} style={styles.appoinmentDetails} />
      </Row>
      <Row style={{ ...styles.timeRow }}>
        <Row style={styles.alignItems}>
          <AntDesign name={'clockcircleo'} size={20} />
          <Medium label={`${slotTime}`} style={styles.slotTime} />
        </Row>
        <Row style={styles.alignItems}>
          <AntDesign name={'calendar'} size={20} />
          <Medium
            label={moment(item?.date).format('ll')}
            style={styles.slotTime}
          />
        </Row>
      </Row>
      <Row style={{ justifyContent: 'flex-start', marginTop: mvs(10) }}>
        <Image
          source={{ uri: item?.hospital?.banner_image_id }}
          style={styles.img}
        />
        <View style={styles.leftContainer}>
          <Medium label={item?.hospital?.title} style={styles.name} />
          <Regular
            numberOfLines={2}
            label={`${item?.hospital?.address || ''} ${item?.patient?.country || ''
              }`}
            style={styles.address}
          />
        </View>
      </Row>
      <Row
        style={styles.appoinment}>
        <Medium label={t('appointment_status')} />
        <Regular label={item?.status} style={styles.appoinmentDetails}/>
      </Row>
      <Row
        style={{
          marginTop: mvs(15),
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => UTILS.dialPhone(item?.patient?.phone)}>
          <Row>
            <AntDesign name={'phone'} size={20} />
            <Regular label={` ${item?.patient?.phone}`} />
          </Row>
        </TouchableOpacity>
        {/* <PrimaryButton textStyle={styles.btnText} containerStyle={styles.btn} title={'Reschedule'} /> */}
        <PrimaryButton
          loading={statusLoading}
          disabled={item?.status === 'completed' || statusLoading}
          onPress={() => {
            onPressStatus(
              item?.status === APPOINTMNETSTATUS?.confirmed
                ? APPOINTMNETSTATUS?.completed
                : item?.status === APPOINTMNETSTATUS?.waiting
                  ? APPOINTMNETSTATUS?.confirmed
                  : APPOINTMNETSTATUS?.completed,
            );
          }}
          containerStyle={styles.btnDetails}
          title={t(
            item?.status === APPOINTMNETSTATUS?.confirmed
              ? 'checkout'
              : item?.status === 'completed'
                ? 'completed'
                : 'confirm',
          )}
        />
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(AppointmentCard);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(10),
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    marginBottom: mvs(15),
    justifyContent: 'center',
    ...colors.shadow,
  },
  leftContainer: { flex: 1, paddingVertical: mvs(10) },
  btnText: { color: colors.primary },
  btn: {
    width: '48%',
    height: mvs(38),
    backgroundColor: colors.white,
    borderWidth: 0.7,
    borderRadius: mvs(10),
    borderColor: colors.primary,
  },
  btnDetails: { width: '48%', height: mvs(38), borderRadius: mvs(10) },
  alignItems: { alignItems: 'center' },
  timeRow: {
    paddingHorizontal: mvs(10),
    borderColor: colors.border,
    marginTop: mvs(15),
    alignItems: 'center',
    paddingVertical: mvs(7),
    borderWidth: 0.7,
    borderRadius: mvs(10),
  },
  row: {
    alignItems: 'center',
  },
  slotTime: { lineHeight: mvs(20), marginLeft: mvs(10) },
  imgContainer: {
    backgroundColor: colors.secondary,
    height: mvs(27),
    width: mvs(27),
    borderRadius: mvs(5),
    overflow: 'hidden',
  },
  img: {
    height: mvs(72),
    width: mvs(72),
    borderRadius: mvs(36),
    marginRight: mvs(10),
    backgroundColor: colors.lightGray,
  },
  name: { fontSize: mvs(20), lineHeight: mvs(24) },
  address: { fontSize: mvs(13) },
  appoinment: {
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    marginTop: mvs(10)
},
appoinmentDetails: { color: colors.primary, fontSize: mvs(18), marginHorizontal: mvs(15) }


});
