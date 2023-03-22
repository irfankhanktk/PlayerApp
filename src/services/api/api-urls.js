export const IP = 'http://124.29.208.60:5159';
export const URLS = {
  base_url: `${IP}/api/`,
  image_url: `${IP}/`,
  auth: {
    signup: 'doctor/signup',
    login: 'doctor/login',
    update_password: 'doctor/updatePassword',
    change_password: 'doctor/changePassword',
    otp_verify: 'doctor/otpVerify',
    forget_password: 'doctor/forgetPassword',
    update_profile: 'doctor/updateProfile',
  },
  availability: {
    add: 'doctor/addDoctorAvailability',
    get_doctor_hospitals: 'doctor/getDoctorHospital',
    get_doctor_hospital_details: 'doctor/getDoctorHospitalDetail',
    edit_hospital_availability_details: 'doctor/editHospitalAvailability',
    delete: 'doctor/deleteDoctorAvailability', //need availability_id
    // change: 'doctor/appointmentStatus',
    update_doctor_availability: 'doctor/updateDoctorAvailability',
  },
  all_hospitals: 'doctor/allHospital',
  appointment: {
    list: 'doctor/listAppointments',
    details: 'doctor/appointmentDetail',
    home_counter: 'doctor/counterAppointments',
    status_change: 'doctor/appointmentStatus',
    complete_appoinment: 'doctor/doctorCompleteAppointment',
  },
  categories: {
    getAll: 'doctor/allSpecialization',
  },
  notification: {
    get_notification: 'doctor/getNotification',
    read_notification: 'doctor/readNotification',
  },
  wallet: {
    get_wallet: 'doctor/getWallet',
    add_amount: 'doctor/addDeposit',
  },
};
