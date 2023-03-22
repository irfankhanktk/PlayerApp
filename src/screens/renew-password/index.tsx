import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RenewLogo } from 'assets/icons';
import { auth_bg } from 'assets/images';
import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import { useFormik } from 'formik';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { onSignup } from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import { signupFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import PrimaryInput, { PrimaryPhoneInput } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch } from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'RenewPassword'>;

const RenewPassword = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birthday: '2000-01-31',
    city: null,
    state: null,
    country: null,
    zip_code: null,
    bio: null,
    confirm_password: '',
    password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signupFormValidation,
      onSubmit: () => { },
    });
  console.log('errors=>', errors);

  return (
    <View style={styles.container}>
      <ImageBackground source={auth_bg} style={{
        height: height,
        width: width,
      }}>
        <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
          {/* <PrimaryInput
            keyboardType={'email-address'}
            error={touched?.email && errors?.email ? t(errors?.email) : ''}
            label={t('email')}
            placeholder={t('email')}
            onChangeText={(str) => setFieldValue('email', str)}
            onBlur={() => setFieldTouched('email', true)}
            value={values.email} /> */}
          <RenewLogo style={{ alignSelf: 'center', marginBottom: mvs(15), }} />
          <Bold label={`${t('renew_pass')}`} style={styles.txt} />
          <PrimaryInput
            isPassword
            error={
              touched?.password && errors?.password
                ? t(errors?.password)
                : undefined
            }
            placeholder={'********'}
            label={t('password')}
            onChangeText={(str) => setFieldValue('password', str)}
            onBlur={() => setFieldTouched('password', true)}
            value={values.password} />
          <PrimaryInput
            isPassword
            error={
              touched?.confirm_password && errors?.confirm_password
                ? t(errors?.confirm_password)
                : undefined
            }
            placeholder={'********'}
            label={t('confirm_pass')}
            onChangeText={(str) => setFieldValue('confirm_password', str)}
            onBlur={() => setFieldTouched('confirm_password', true)}
            value={values.confirm_password} />

          <PrimaryButton
            loading={loading}
            disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
            title={t('set_password')}
            onPress={() => dispatch(onSignup(values, setLoading, props))}
            containerStyle={styles.button} />
        </KeyboardAvoidScrollview>
      </ImageBackground>
    </View>

  );
};
export default RenewPassword;
