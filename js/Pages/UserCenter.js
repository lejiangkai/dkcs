import React, { Component } from 'react'
import {SafeAreaView, View, Image, Text, TouchableOpacity, SectionList, Alert} from 'react-native'
import {CommonItem} from '.././Component'
import {UserInfo} from '../.././global'
import {px2dp} from '../.././global/Utils'

export default class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {userStatus: '请先登录'};
    };

    componentDidMount() {
        this._onRefresh();
    };

    _onRefresh = () => {
        if (UserInfo.isLogined === true) {
            this.setState({
                userStatus: UserInfo.mobileNum,
            });
        } else {
            this.setState({
                userStatus: '请先登录',
            });
        }
    };

    _onPressLogin = () => {
        this.props.navigation.navigate('Login', {callBack: () => {
                this._onRefresh();
            }
        });
    };

    _onPressItem = (section, row) => {
        if (UserInfo.isLogined !== true) {
            this._onPressLogin();
            return;
        }

        if (row === 0) {
            this.props.navigation.push('ContactUs');
        } else if (row === 1) {

        } else if (row === 2) {

        }
    };

    _onPressLoginOut = () => {
        Alert.alert(
            '提示',
            '安全退出',
            [
                {text: '确定', onPress: () => {
                    UserInfo.token = '';
                    UserInfo.mobileNum = '';
                    UserInfo.isLogined = false;
                    storage.save({
                        key: 'userinfo',
                        data: {
                            token: '',
                            mobileNum: '',
                            isLogined: false,
                        },
                    });

                    this._onRefresh();
                }},
                {text: '取消', onPress: () => {}, style: 'cancel'},
            ],
        );
    };

    _renderItem = ({item, index, section: {section}}) => {
        return (
            <CommonItem onPress={this._onPressItem}
                        section={section}
                        row={index}
                        image={item.image}
                        title={item.title}
                        tips={item.tips}/>
        );
    };

    _renderListHeader = () => {
        return (
            <View style={{height: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6D8DF4'}}>
                <TouchableOpacity onPress={this._onPressLogin} disabled={this.state.userStatus !== '请先登录'}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{height: 70, width: 70, borderRadius: 35}}
                               source={require('../.././assets/avatar.png')}/>
                        <Text style={{marginTop: px2dp(25), fontSize: px2dp(30), color: 'white'}}>{this.state.userStatus}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _renderSectionFooter = () => {
        return (
            <TouchableOpacity style={{height: 50, marginLeft: 20, marginRight: 20, marginTop: 50}} onPress={this._onPressLoginOut}>
                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#6D8DF4', height: 50, borderRadius: 7}}>
                    <Text style={{fontSize: 20, color: 'white'}}>退出登录</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const sections = [{section: 0, data: [{image: require('../.././assets/setting-0.png'), title: '联系我们', tips: ''},
                {image: require('../.././assets/setting-1.png'), title: '关于我们', tips: ''},
                {image: require('../.././assets/setting-2.png'), title: '清除缓存', tips: ''}]}];

        return (
            <SafeAreaView style={{flex: 1}}>
                <SectionList
                    sections={sections}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    renderSectionHeader={() => (<View style={{height: 10, backgroundColor: '#F5F5F5'}} />)}
                    renderSectionFooter={this.state.userStatus !== '请先登录' ? this._renderSectionFooter : null}
                    ItemSeparatorComponent={() => (<View style={{marginLeft: 15, marginRight: 15, height: 1, backgroundColor: '#d3d3d3'}} />)}
                    ListHeaderComponent={this._renderListHeader}
                />
            </SafeAreaView>
        );
    }
}
