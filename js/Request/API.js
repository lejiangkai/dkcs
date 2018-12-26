// const baseURL = 'http://120.27.212.187';
const baseURL = 'https://lcjs.fangad.cn';

export default {
    baseURL,
    getToken: baseURL + '/app/GetToken/',
    register: baseURL + '/user/Register/',
    login: baseURL + '/user/Login/',
    getVerifyCode: baseURL + '/user/GetVerifyCode/',
    modifyPwCode: baseURL + '/user/ModifyPwCode/',
    mixture: baseURL + '/loan/mixture/',
    product: baseURL + '/loan/product/',
};
