import axios from 'axios';
import qs from 'querystring';
import API from '../Request/API'
import md5 from 'md5';
import {UserInfo} from '../.././global'

axios.defaults.baseURL = API.baseURL;
axios.defaults.timeout = 60000;

function outputObj(obj) {
    var description = "";
    for (var i in obj) {
        description += i + " = " + obj[i] + "\n";
    }
    return description;
}

function sign(params, token) {
    let appKey = 'oQIhAP24Kb3Bsf7IE14wpl751bQc9VAPsFZ+LdB4riBgg2TDAiEAsSomOO1v8mK2VWhEQh6mttgN';
    let keys = Object.keys(params).sort();
    let arr = [];
    for (let index in keys) {
        arr.push((keys[index] + '=' + params[keys[index]]));
    }
    let sign = md5((appKey + token + arr.join('|'))).toUpperCase();
    return sign;
}

axios.interceptors.request.use(config => {
    config.headers['VERSION'] = 'V1.0';
    config.headers['access-token'] = UserInfo.token;
    // if(config.method === 'get'){
    //     config.params = {
    //         ...config.data,
    //         _t: Date.parse(new Date())/1000
    //     }
    // }
    return config;
});

axios.interceptors.response.use(response => {
    if (response.data.status_code === '200' || response.data.status_code === 200) {
        return response.data.data || response.data;
    } else {
        throw Error(response.data.data.Message || '服务异常');
    }
});

export default class Http {
    static async get(url, params) {
        try {
            let query = await qs.stringify(params);
            let res = null;
            if (!params) {
                res = await axios.get(url);
            } else {
                res = await axios.get(url + '?' + query);
            }
            return res;
        } catch (error) {
            return error;
        }
    }

    static async post(url, params) {
        try {
            let res = await axios.post(url, params);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async patch(url, params) {
        try {
            let res = await axios.patch(url, params);
            return res
        } catch (error) {
            return error;
        }
    }

    static async put(url, params) {
        try {
            let res = await axios.put(url, params);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async delete(url, params) {
        try {
            let res = await axios.post(url, params);
            return res;
        } catch (error) {
            return error;
        }
    }
}
