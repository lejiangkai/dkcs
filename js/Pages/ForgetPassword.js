import React, {Component} from 'react'
import {SafeAreaView, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View, Image} from 'react-native'
import {Http, API} from "../Request";
import Toast from "react-native-root-toast";
import Spinner from 'react-native-loading-spinner-overlay';
import {px2dp} from "../../global/Utils";

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            mobileNum: '',
            password: '',
            secure: true,
            passwordAgain: '',
            smsCode: '',
            disabled: false,
            text: '获取验证码',
            color: '#6D8DF4',
            second: 60};
    };

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

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

    _changePasswordAgain = (input) => {
        this.setState({
            passwordAgain: input
        });
    };

    _onPressCode = () => {
        if (this.state.mobileNum.length < 11) {
            Toast.show('请输入正确的手机号码', {
                position: Toast.positions.CENTER,
            });
            return;
        }

        let params = {
            mobile: this.state.mobileNum,
        };
        Http.post(API.getVerifyCode, params).then((res) => {
            if (res.message) {
                Toast.show(res.message, {
                    position: Toast.positions.CENTER,
                });
            } else {
                this.setState({
                    disabled: true,
                    text: this.state.second.toString() + '秒后重发',
                    color: 'gray'
                });
                this.timer = setInterval(() => this._tick(), 1000);
            }
        }).catch((err) => {
            alert(err);
        });
    };

    _tick() {
        let current = this.state.second - 1;
        if (current === 0) {
            this.timer && clearInterval(this.timer);
            this.setState({
                disabled: false,
                text: '获取验证码',
                color: '#6D8DF4',
                second: 60});
        } else {
            this.setState({
                text: current.toString() + '秒后重发',
                color: 'gray',
                second: current});
        }
    }

    _smsCodeChange = (input) => {
        this.setState({
            smsCode: input
        });
    };

    _onPressModify = () => {
        if (this.state.password !== this.state.passwordAgain) {
            Toast.show('密码输入不一致', {
                position: Toast.positions.CENTER,
            });
            return;
        }

        if (this.state.mobileNum.length < 11 || this.state.password.length < 6 || this.state.passwordAgain.length < 6 || this.state.smsCode.length < 4) {
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
            code: this.state.smsCode,
        };
        Http.post(API.modifyPwCode, params).then((res) => {
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
                Toast.show('密码修改成功', {
                    position: Toast.positions.CENTER,
                    onHidden: () => {this.props.navigation.navigate('Login')},
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
                                           placeholder='请输入新密码'
                                           secureTextEntry={this.state.secure}
                                           onChangeText={this._changePassword}/>
                                <TouchableOpacity onPress={this._onPressSecure}>
                                    <Image style={{width: px2dp(50), height: px2dp(50), alignItems: 'center', marginRight: 0}}
                                           source={(this.state.secure ? require('../.././assets/input-hide.png') : require('../.././assets/input-show.png'))}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, height: 1, backgroundColor: '#d3d3d3'}} />
                            <TextInput style={{padding: 0, marginTop: 30, marginLeft: 20, marginRight: 20, fontSize: px2dp(35)}}
                                       placeholder='请再次输入新密码'
                                       underlineColorAndroid='transparent'
                                       maxLength={20}
                                       clearButtonMode='while-editing'
                                       secureTextEntry={this.state.secure}
                                       onChangeText={this._changePasswordAgain}/>
                            <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, height: 1, backgroundColor: '#d3d3d3'}} />
                            <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 20, marginRight: 20,}}>
                                <View style={{flex: 3}}>
                                    <TextInput style={{padding: 0, fontSize: px2dp(35)}}
                                               underlineColorAndroid='transparent'
                                               keyboardType='numeric'
                                               maxLength={6}
                                               clearButtonMode='while-editing'
                                               placeholder='短信验证码'
                                               onChangeText={this._smsCodeChange}/>
                                </View>
                                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} disabled={this.state.disabled} onPress={this._onPressCode}>
                                    <Text style={{fontSize: px2dp(25), color: this.state.color}}>{this.state.text}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, height: 1, backgroundColor: '#d3d3d3'}} />
                        </KeyboardAvoidingView>
                        <TouchableOpacity style={{height: 50, marginLeft: 20, marginRight: 20, marginTop: 50}} onPress={this._onPressModify}>
                            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#6D8DF4', height: 50, borderRadius: 7}}>
                                <Text style={{fontSize: px2dp(35), color: 'white'}}>确认</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
