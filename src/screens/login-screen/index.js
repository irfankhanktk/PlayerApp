import { auth_bg } from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import OtpModal from 'components/molecules/modals/otp-modal';
import { height, mvs, width } from 'config/metrices';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { onLogin } from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import { signinFormValidation } from 'validations';
import PrimaryInput from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview/index';
import styles from './styles';
const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
    password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signinFormValidation,
      onSubmit: () => { },
    });
  const onSubmit = async () => {
    try {
      dispatch(onLogin({ ...values, }, setLoading, props));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Header1x2x title={t('login')} /> */}
      <View style={styles.container}>
        <ImageBackground
          source={auth_bg}
          style={{
            height: height,
            width: width,
          }}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.contentContainerStyle}>
            <Bold label={t('login')} style={styles.txt} />
            <PrimaryInput
              keyboardType={'email-address'}
              error={
                touched?.email && errors?.email
                  ? `${t(errors?.email)}`
                  : undefined
              }
              label={t('email')}
              placeholder={t('email')}
              onChangeText={str => setFieldValue('email', str)}
              onBlur={() => setFieldTouched('email', true)}
              value={values.email}
            />
            <PrimaryInput
              isPassword
              error={
                touched?.password && errors?.password
                  ? `${t(errors?.password)}`
                  : undefined
              }
              placeholder={t('password_place')}
              label={t('password')}
              onChangeText={str => setFieldValue('password', str)}
              onBlur={() => setFieldTouched('password', true)}
              value={values.password}
              containerStyle={{ marginBottom: 0 }}
              errorStyle={{ marginBottom: 0 }}
            />
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginBottom: mvs(15) }}
              onPress={() => navigate('ForgotPassword')}>
              <Medium
                label={t('forgot_password')}
                style={{ textDecorationLine: 'underline' }}
              />
            </TouchableOpacity>
            <PrimaryButton
              disabled={
                Object.keys(errors).length > 0 ||
                Object.keys(touched).length === 0
              }
              loading={loading}
              onPress={onSubmit}
              title={t('login')}
            />
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: mvs(20) }}
              onPress={() => navigate('Signup')}>
              <Medium
                label={t('dont_have_account')}
                style={{ textDecorationLine: 'underline' }}
              />
            </TouchableOpacity>
            <OtpModal
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
            />
          </KeyboardAvoidScrollview>
          {/* <View style={styles.button}>
        </View> */}
        </ImageBackground>
      </View>
    </View>
  );
};
export default LoginScreen;
