// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup
    .string()
    .required('error_pass_enter')
    .min(8, 'error_pass_short'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  // last_name: yup.string().required('req_first_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  doc_cat_id: yup.string().required('req_cat'),
  zip_code: yup.string().required('req_zip_code'),
  city: yup.string().required('req_city'),
  short_description: yup.string().required('req_short_description'),
  state: yup.string().required('req_state'),
  price: yup.string().required('req_price'),
  experience: yup.string().required('req_experience'),
});
export const updateProfileFormValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  // last_name: yup.string().required('req_first_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),

  doc_cat_id: yup.string().required('req_cat'),
  zip_code: yup.string().required('req_zip_code'),
  city: yup.string().required('req_city'),
  state: yup.string().required('req_state'),
  price: yup.string().required('req_price'),
  experience: yup.string().required('req_experience'),
});
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });
export const updatePasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  old_password: yup.string().required('req_pass').min(8, 'weak_pass'),
  new_password: yup
    .string()
    .required('New Password is required')
    .min(8, 'New weak_pass'),
});
