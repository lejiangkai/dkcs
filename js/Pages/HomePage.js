import React, {Component} from 'react';
import {Dimensions, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, RefreshControl, NetInfo} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import {EntranceList, PlatformList} from '.././Component';
import {Http, API} from "../Request";
import Toast from 'react-native-root-toast';
import {UserInfo} from '../.././global'
import {px2dp} from '../.././global/Utils'

const ScreenWidth = Dimensions.get('window').width;
const BannerWidth = ScreenWidth - 20;
const BannerHeight = (ScreenWidth - 20) * 35 / 70;

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            banners: [],
            notices: [],
            platforms: [],
        };
    };

    componentWillMount() {
        NetInfo.addEventListener(
            'connectionChange',
            this._handleFirstConnectivityChange
        );
    }

    componentDidMount() {
        storage.load({key: 'userinfo'}).then(ret => {
            SplashScreen.hide();

            UserInfo.token = ret.token;
            UserInfo.mobileNum = ret.mobileNum;
            UserInfo.isLogined = ret.isLogined;

            this._onRefresh();
        }).catch((err) => {
            SplashScreen.hide();
            this._onRefresh();
        });
    };

    _handleFirstConnectivityChange = () => {
        this._onRefresh();
        NetInfo.removeEventListener(
            'connectionChange',
            this._handleFirstConnectivityChange
        );
    };

    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });

        Http.get(API.mixture, {}).then((res) => {
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                });
            }, 1000);

            if (res.message) {
                Toast.show(res.message, {
                    position: Toast.positions.CENTER,
                });
            } else {
                let banners = [];
                res.carousel.map((item, index) => {
                    let banner = {};
                    banner.image = item.img_url;
                    banner.title = item.title;
                    banner.url = item.target_url;
                    banners.push(banner);
                });

                let notices = [];
                res.broadcast.map((item, index) => {
                    let notice = {};
                    notice.content = item;
                    notices.push(notice);
                });

                let platforms = [];
                res.suggest.map((item, index) => {
                    let platform = {};
                    platform.image = item.img_url;
                    platform.title = item.platform;
                    platform.subtitle = item.limit_range;
                    platform.url = item.target_url;
                    platforms.push(platform);
                });

                this.setState({
                    banners,
                    notices,
                    platforms,
                });
            }
        }).catch((err) => {
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                });
            }, 1000);
        });
    };

    _onPressBanner = (index) => {
        if (UserInfo.isLogined !== true) {
            this.props.navigation.navigate('Login');
            return;
        }

        let title = this.state.banners[index]['title'];
        let url = this.state.banners[index]['url'];
        this.props.navigation.navigate('ShowWeb', {title: title, url: url});
    };

    _onPressEntrance = (index) => {
        if (UserInfo.isLogined !== true) {
            this.props.navigation.navigate('Login');
            return;
        }

        if (index === 0) {
            this.props.navigation.navigate('Business', {type: 'small'});
        } else if (index === 1) {
            this.props.navigation.navigate('Business', {type: 'large'});
        } else if (index === 2) {
            this.props.navigation.navigate('Business', {type: 'bank'});
        } else if (index === 3) {

        }
    };

    _onPressPlatform = (index) => {
        if (UserInfo.isLogined !== true) {
            this.props.navigation.navigate('Login');
            return;
        }

        let title = this.state.platforms[index]['title'];
        let url = this.state.platforms[index]['url'];
        this.props.navigation.navigate('ShowWeb', {title: title, url: url});
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView refreshControl={<RefreshControl title={'正在加载...'} refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                    <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 10, backgroundColor: 'white'}}>
                        <View style={{width: BannerWidth, height: BannerHeight, borderRadius: 5}}>
                            <Swiper key={this.state.banners.length} autoplay={true}>
                                {
                                    this.state.banners.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} activeOpacity={1}
                                                              onPress={() => this._onPressBanner(index)}>
                                                <Image style={{width: BannerWidth, height: BannerHeight}}
                                                       source={{uri: item.image}}/>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </Swiper>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 5}}>
                            <Image style={{height: px2dp(28), width: px2dp(32), marginLeft: 5, marginRight: 5}}
                                   source={require('../.././assets/message.png')}/>
                            <Text style={{color: '#e60000', fontSize: px2dp(28), fontWeight: 'bold'}} numberOfLines={1}>公告内容：</Text>
                            <View style={{height: 30, width: BannerWidth - 102}}>
                                <Swiper key={this.state.notices.length} autoplay={true} horizontal={false} showsPagination={false}>
                                    {
                                        this.state.notices.map((item, index) => {
                                            return (
                                                <View key={index}
                                                      style={{flex: 1, justifyContent: 'center', height: 30}}>
                                                    <Text numberOfLines={1}
                                                          style={{fontSize: px2dp(28), color: '#8e8e93', fontWeight: 'bold'}}>{item.content}</Text>
                                                </View>
                                            );
                                        })
                                    }
                                </Swiper>
                            </View>
                        </View>
                        <View style={{marginBottom: 10, height: 1, backgroundColor: '#d3d3d3'}}/>
                        <EntranceList datasource={[{image: require('../.././assets/entrance-0.png'), title: '小额速贷'},
                            {image: require('../.././assets/entrance-1.png'), title: '大额信贷'},
                            {image: require('../.././assets/entrance-2.png'), title: '银行贷款'},
                            {image: require('../.././assets/entrance-3.png'), title: '个人征信'}]}
                                      onPress={this._onPressEntrance}/>
                        <View style={{marginTop: 15, height: 1, backgroundColor: '#d3d3d3'}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                            <Image style={{height: px2dp(32), width: px2dp(32), marginRight: px2dp(15)}}
                                   source={require('../.././assets/hot.png')}/>
                            <Text style={{alignSelf: 'center', fontSize: px2dp(24), color: '#000000', fontWeight: 'bold'}}>平台推荐</Text>
                        </View>
                        <PlatformList datasource={this.state.platforms}
                                      onPress={this._onPressPlatform}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
