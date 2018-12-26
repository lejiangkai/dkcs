import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {Http, API} from "../Request";
import Toast from "react-native-root-toast";
import Spinner from 'react-native-loading-spinner-overlay';
import {Utils, UserInfo} from '../.././global'
import {px2dp} from '../.././global/Utils'

function outputObj(obj) {
    var description = "";
    for (var i in obj) {
        description += i + " = " + obj[i] + "\n";
    }
    alert(description);
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            mobileNum: '',
            password: '',
            secure: true
        };
    };

    componentDidMount() {
        this._getToken();
    };

    _getToken = () => {
        let timestamp = Date.parse( new Date() ).toString().substr(0, 10);
        let rand_str = Utils.randomWord(12, 16);
        let signature = Utils.signature(timestamp, rand_str);
        let params = {
            timestamp,
            app_id: '1001',
            rand_str,
            signature,
        };
        Http.post(API.getToken, params).then((res) => {
            this.setState({
                spinner: false,
            });

            if (res.message) {
                this._getToken();
            } else {
                UserInfo.token = res.access_token;
                storage.save({
                    key: 'userinfo',
                    data: {
                        token: res['access_token'],
                        mobileNum: '',
                        isLogined: false,
                    },
                });
            }
        }).catch((err) => {
            this.setState({
                spinner: false,
            });
        });
    };

    _changeMobile = (input) => {
        this.setState({
            mobileNum: input
        });
    };

    _changePassword = (input) => {
        this.setState({
            password: input
        });
    };

    _onPressSecure = () => {
        this.setState({
            secure: !this.state.secure
        });
    };

    _onPressRegister = () => {
        this.props.navigation.push('Register');
    };

    _onPressForget = () => {
        this.props.navigation.push('ForgetPassword');
    };

    _onPressLogin = () => {
        if (this.state.mobileNum.length < 11 || this.state.password.length < 6) {
            Toast.show('信息输入有误', {
                position: Toast.positions.CENTER,
            });
            return;
        }

        this.setState({
            spinner: true,
        });

        let params = {
            account: this.state.mobileNum,
            password: this.state.password,
        };
        Http.post(API.login, params).then((res) => {
            setTimeout(() => {
                this.setState({
                    spinner: false,
                });
            }, 1000);

            if (res.message) {
                Toast.show(res.message, {
                    position: Toast.positions.CENTER,
                });
            } else {
                UserInfo.mobileNum = this.state.mobileNum;
                UserInfo.isLogined = true;
                storage.save({
                    key: 'userinfo',
                    data: {
                        token: UserInfo.token,
                        mobileNum: this.state.mobileNum,
                        isLogined: true,
                    },
                });

                Toast.show('登录成功', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    onHidden: () => {
                        if (this.props.navigation.getParam('callBack') !== undefined) {
                            this.props.navigation.getParam('callBack')();
                        }
                        this.props.navigation.popToTop();
                    },
                });
            }
        }).catch((err) => {
            setTimeout(() => {
                this.setState({
                    spinner: false,
                });
            }, 1000);
        });
    };

    _onPressVerifyLogin = () => {
        if (this.props.navigation.getParam('callBack') !== undefined) {
            this.props.navigation.navigate('VerifyLogin', {callBack: this.props.navigation.getParam('callBack')});
        } else {
            this.props.navigation.navigate('VerifyLogin');
        }
    };

    render() {
        return (
            <SafeAreaView>
                <Spinner visible={this.state.spinner} />
                <ScrollView scrollEnabled={false} style={{margin: 0, backgroundColor: 'white'}}>
                    <View>
                        <KeyboardAvoidingView behavior='padding'>
                            <TextInput style={{padding: 0, marginTop: 80, marginLeft: 20, marginRight: 20, fontSize: px2dp(35)}}
                                       placeholder='输入手机号'
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       maxLength={11}
                                       clearButtonMode='while-editing'
                                       onChangeText={this._changeMobile}/>
                            <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, height: 1, backgroundColor: '#d3d3d3'}} />
                            <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 20, marginRight: 20}}>
                                <TextInput style={{flex: 1, fontSize: px2dp(35)}}
                                           underlineColorAndroid='transparent'
                                           clearButtonMode='while-editing'
                                           maxLength={20}
                                           placeholder='输入密码'
                                           secureTextEntry={this.state.secure}
                                           onChangeText={this._changePassword}/>
                                <TouchableOpacity onPress={this._onPressSecure}>
                                    <Image style={{width: px2dp(50), height: px2dp(50), alignItems: 'center', marginRight: 0}}
                                           source={(this.state.secure ? require('../.././assets/input-hide.png') : require('../.././assets/input-show.png'))}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, height: 1, backgroundColor: '#d3d3d3'}} />
                        </KeyboardAvoidingView>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, marginLeft: 20, marginRight: 20}}>
                            <TouchableOpacity onPress={this._onPressRegister}>
                                <Text style={{fontSize: px2dp(25), color: 'gray'}}>快速注册></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onPressForget}>
                                <Text style={{fontSize: px2dp(25), color: 'gray'}}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{height: 50, marginLeft: 20, marginRight: 20, marginTop: 50}} onPress={this._onPressLogin}>
                            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#6D8DF4', height: 50, borderRadius: 7}}>
                                <Text style={{fontSize: px2dp(35), color: 'white'}}>登录</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onPressVerifyLogin}>
                            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 17, marginLeft: 20, marginRight: 20}}>
                                <Text style={{fontSize: px2dp(25), color: 'gray'}}>—— 验证码登录 ——</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
