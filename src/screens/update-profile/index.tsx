import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { onUpdateProfile } from 'services/api/api-actions';
import i18n from 'translation';
import { updateProfileFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import PrimaryInput, {
  PrimaryPhoneInput
} from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;

const UpdateProfile = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const { userInfo } = useAppSelector(s => s?.user);
  console.log('userinfo======>', userInfo);
  const dispatch = useAppDispatch();
  const initialValues = userInfo ?? {
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    map_lat: '',
    map_lng: '',
    price: '',
    short_description: '',
    per_patient: '',
    experience: 0,
    min_day_before_booking: 0,
    min_day_stays: 0,
    enable_service_fee: 0,
  };
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: updateProfileFormValidation,
      onSubmit: () => { },
    });
  console.log('errors=>', errors);
  React.useEffect(() => {
    setFieldTouched('first_name', true);
    setFieldTouched('email', true);
    setFieldTouched('phone', true);
  }, []);
  return (
    <View style={styles.container}>
      <Header1x2x isSearch={false} title={t('update_profile')} />

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          error={touched?.name && errors?.name ? t(errors?.name) : ''}
          label={t('name')}
          placeholder={t('name')}
          onChangeText={str => setFieldValue('name', str)}
          onBlur={() => setFieldTouched('name', true)}
          value={values.name}
        />
        <PrimaryInput
          keyboardType={'email-address'}
          error={touched?.email && errors?.email ? t(errors?.email) : ''}
          label={t('email')}
          placeholder={t('email')}
          onChangeText={str => setFieldValue('email', str)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email}
        />
        <PrimaryPhoneInput
          error={errors?.phone && touched?.phone ? `${t(errors?.phone)}` : ''}
          label={t('phone')}
          placeholder={t('phone_no')}
          onChangeText={str => {
            setFieldValue('phone', str);
            setFieldTouched('phone', true);
          }}
          onBlur={() => setFieldTouched('phone', true)}
          value={values.phone}
        />
        {/* 
        <InputWithIcon
          label={'choose_category'}
          error={
            errors?.doc_cat_id && touched?.doc_cat_id ? errors?.doc_cat_id : ''
          }
          items={spec_categories}
          onChangeText={str => {
            setFieldValue('doc_cat_id', str);
          }}
          onBlur={() => setFieldTouched('doc_cat_id', true)}
          id={values?.doc_cat_id}
          value={
            spec_categories?.find(x => x?.id === values?.doc_cat_id)?.title
          }
        /> */}
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.zip_code && errors?.zip_code ? t(errors?.zip_code) : ''
          }
          label={t('zip_code')}
          placeholder={t('zip_code')}
          onChangeText={str => setFieldValue('zip_code', str)}
          onBlur={() => setFieldTouched('zip_code', true)}
          value={`${values.zip_code}`}
        />
        <PrimaryInput
          error={touched?.city && errors?.city ? t(errors?.city) : ''}
          label={t('city')}
          placeholder={t('city')}
          onChangeText={str => setFieldValue('city', str)}
          onBlur={() => setFieldTouched('city', true)}
          value={`${values.city}`}
        />
        <PrimaryInput
          error={touched?.state && errors?.state ? t(errors?.state) : ''}
          label={t('state')}
          placeholder={t('state')}
          onChangeText={str => setFieldValue('state', str)}
          onBlur={() => setFieldTouched('state', true)}
          value={`${values.state}`}
        />
        {/* <DatePicker
          onChangeText={(str: string) => setFieldValue('birthday', str)}>
          <PrimaryInput
            editable={false}
            error={
              errors?.birthday && touched?.birthday ? `${errors?.birthday}` : ''
            }
            label={t('birthday')}
            placeholder={t('birthday')}
            onChangeText={str => setFieldValue('birthday', str)}
            value={values.birthday}
          />
        </DatePicker> */}
        <PrimaryInput
          error={touched?.country && errors?.country ? t(errors?.country) : ''}
          label={t('country')}
          placeholder={t('country')}
          onChangeText={str => setFieldValue('country', str)}
          onBlur={() => setFieldTouched('country', true)}
          value={`${values.country}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.price && errors?.price ? t(errors?.price) : ''}
          label={t('price')}
          placeholder={t('price')}
          onChangeText={str => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={`${values.price}`}
        />
        <PrimaryInput
          isRequired
          error={
            touched?.short_description && errors?.short_description
              ? t(errors?.short_description)
              : ''
          }
          label={t('short_description')}
          placeholder={t('short_description')}
          onChangeText={str => setFieldValue('short_description', str)}
          onBlur={() => setFieldTouched('short_description', true)}
          value={`${values.short_description}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.experience && errors?.experience
              ? t(errors?.experience)
              : ''
          }
          label={t('experience')}
          placeholder={t('experience')}
          onChangeText={str => setFieldValue('experience', str)}
          onBlur={() => setFieldTouched('experience', true)}
          value={`${values.experience}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.min_day_before_booking && errors?.min_day_before_booking
              ? t(errors?.min_day_before_booking)
              : ''
          }
          label={t('min_day_before_booking')}
          placeholder={t('min_day_before_booking')}
          onChangeText={str => setFieldValue('min_day_before_booking', str)}
          onBlur={() => setFieldTouched('min_day_before_booking', true)}
          value={`${values.min_day_before_booking}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.min_day_stays && errors?.min_day_stays
              ? t(errors?.min_day_stays)
              : ''
          }
          label={t('min_day_stays')}
          placeholder={t('min_day_stays')}
          onChangeText={str => setFieldValue('min_day_stays', str)}
          onBlur={() => setFieldTouched('min_day_stays', true)}
          value={`${values.min_day_stays}`}
        />
        <PrimaryInput
          keyboardType={'numeric'}
          error={
            touched?.min_day_stays && errors?.min_day_stays
              ? t(errors?.min_day_stays)
              : ''
          }
          label={t('per_patient')}
          placeholder={t('per_patient')}
          onChangeText={str => setFieldValue('per_patient', str)}
          onBlur={() => setFieldTouched('per_patient', true)}
          value={`${values.per_patient}`}
        />

        <PrimaryButton
          loading={loading}
          // disabled={
          //   Object.keys(errors)?.length > 0 ||
          //   Object.keys(touched)?.length === 0
          // }
          title={t('save')}
          // onPress={onSubmit}
          onPress={() => {
            dispatch(onUpdateProfile({ ...values }, setLoading, props));
          }}
          containerStyle={styles.button}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default UpdateProfile;
