import http from './http.js'

const apiCaptcha = (options) => {
  return http.get('captcha', options);
}
const apiSendSms = (options) => {
  return http.get('sendSms', options);
}
const apiLogin = (options) => {
  return http.post('login', options);
}
const apiSign = (options) => {
  return http.post('sign', options);
}
const aaa = (options) => {
  return http.post('aaa', options);
}
const apiOkex = (options) => {
  return http.post('okex', options);
}
const apiPayInfo = (options) => {
  return http.post('payInfo', options);
}
const apiOrderForm = (options) => {
  return http.get('orderForm', options);
}
const apiCheckAddr = (options) => {
  return http.get('checkAddr', options);
}
const apiAuthAddr = (options) => {
  return http.post('authAddr', options);
}
const apiPower = (options) => {
  return http.get('power', options);
}
const apiUser = (options) => {
  return http.get('user', options);
}

export  {
  apiCaptcha,
  apiSendSms,
  apiLogin,
  apiSign,
  aaa,
  apiOkex,
  apiPayInfo,
  apiOrderForm,
  apiCheckAddr,
  apiAuthAddr,
  apiPower,
  apiUser
}