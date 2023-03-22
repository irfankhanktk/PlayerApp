import {CrossModal} from 'assets/icons';
import {PrimaryButton} from 'components/atoms/buttons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Medium from 'typography/medium-text';
import {mvs} from '../../../config/metrices';
import {OtpInput} from '../otp-input';
import PrimaryInput from '../../../components/atoms/inputs';
import i18n from 'translation';
import {onAddAmount} from 'services/api/api-actions';
const WalletAmount = ({
  style,
  email,
  visible = false,
  value,
  setValue,
  userInfo,
  isSubmited,
  onClose = item => {},
}) => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await onAddAmount(value);

      console.log('res===>>>>> addamount', res);
      isSubmited();
      onClose();
      setLoading(false);
    } catch (error) {
      console.log('error=>', error);
      setLoading(false);
    }
  };
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <View style={styles.header} />
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModal height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        {/* <Medium
          numberOfLines={2}
          style={styles.msg}
          label={`Verification is sent to ${email || ''}`}
        /> */}
        <View style={styles.otp}>
          <PrimaryInput
            keyboardType={'number-pad'}
            // error={
            //   touched?.email && errors?.email
            //     ? `${t(errors?.email)}`
            //     : undefined
            // }
            label={t('add_amount')}
            placeholder={t('add_amount')}
            onChangeText={str =>
              setValue({doctor_id: userInfo?.id, amount: parseInt(str)})
            }
            // onBlur={() => setFieldTouched('email', true)}
            // value={values.email}
          />
          <PrimaryButton
            loading={loading}
            // disabled={value?.length !== 6}
            onPress={() => onSubmit()}
            title={t('submit')}
            containerStyle={{marginTop: mvs(20)}}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};
export default WalletAmount;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
  },
  container: {
    // height: mvs(300),
    backgroundColor: colors.white,
    paddingVertical: mvs(15),
    borderRadius: mvs(20),
  },
  otp: {paddingHorizontal: mvs(20), marginTop: mvs(20)},
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  msg: {
    textAlign: 'center',
    alignSelf: 'center',
    width: mvs(250),
    fontSize: mvs(20),
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
  },
  cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
