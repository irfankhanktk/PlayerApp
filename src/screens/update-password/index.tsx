import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useFormik} from 'formik';
import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';
import {onSignup, onUpdatePassword} from 'services/api/api-actions';
import {signupFormValidation, updatePasswordValidation} from 'validations';
import {PrimaryButton} from '../../components/atoms/buttons';
import PrimaryInput from '../../components/atoms/inputs';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch} from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const UpdatePassword = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const initialValues = {
    email: '',
    new_password: '',
    old_password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: updatePasswordValidation,
      onSubmit: () => {},
    });
  return (
    <View style={styles.container}>
      <Header1x2x isSearch={false} title={t('sign_up')} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          keyboardType={'email-address'}
          error={errors?.email}
          label={t('email')}
          placeholder={t('email')}
          onChangeText={str => setFieldValue('email', str)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email}
        />
        <PrimaryInput
          isPassword
          error={
            touched?.old_password && errors?.old_password
              ? errors?.old_password
              : undefined
          }
          placeholder={'********'}
          label={'old_password'}
          onChangeText={str => setFieldValue('old_password', str)}
          onBlur={() => setFieldTouched('old_password', true)}
          value={values.old_password}
        />
        <PrimaryInput
          isPassword
          error={
            touched?.new_password && errors?.new_password
              ? errors?.new_password
              : undefined
          }
          placeholder={'********'}
          label={t('Confirm Password')}
          onChangeText={str => setFieldValue('new_password', str)}
          onBlur={() => setFieldTouched('new_password', true)}
          value={values.new_password}
        />
        <PrimaryButton
          loading={loading}
          disabled={
            Object.keys(errors)?.length > 0 ||
            Object.keys(touched)?.length === 0
          }
          title={t('Update')}
          onPress={() => dispatch(onUpdatePassword(values, setLoading, props))}
          containerStyle={styles.button}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default UpdatePassword;
