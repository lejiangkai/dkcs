import React from 'react';
import {TouchableOpacity, Image, Platform, StatusBar, StyleSheet, Text} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Login, Register, VerifyLogin, ForgetPassword, HomePage, Business, UserCenter, ContactUs, ShowWeb} from '../Pages';

const bottomTabNavigator = createBottomTabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: "首页",
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={{ width: 26, height: 26, tintColor: tintColor }}
                           source={focused ? require('../.././assets/home-focused.png') : require('../.././assets/home.png')}/>
                ),
            },
        },

        UserCenter: {
            screen: UserCenter,
            navigationOptions: {
                tabBarLabel: "我的",
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={{ width: 26, height: 26, tintColor: tintColor }}
                           source={focused ? require('../.././assets/me-focused.png') : require('../.././assets/me.png')}/>
                ),
            }
        },
    },

    {
        initialRouteName: "HomePage",
        lazy: true,
        tabBarOptions: {
            inactiveTintColor: "#8F8F8F",
            activeTintColor: "#6D8DF4",
            labelStyle: {
                fontSize: 11
            }
        }
    },
);

bottomTabNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    return {
        headerTitle: (routeName === 'HomePage' ?  '助贷超市' : '账号'),
    };
};

const AppNavigator = createStackNavigator(
    {
        Main: {screen: bottomTabNavigator},
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => ({
                title: '登录',
                headerLeft: (<TouchableOpacity style={{marginLeft: 10}} onPress={() => {navigation.popToTop()}}>
                    <Image source={require('../.././assets/cancel.png')}/>
                </TouchableOpacity>),
                headerRight: <Text/>,
                gesturesEnabled: false
            })
        },
        Register: {
            screen: Register,
            navigationOptions: ({navigation}) => ({
                title: '注册',
                headerRight: <Text/>
            })
        },
        VerifyLogin: {
            screen: VerifyLogin,
            navigationOptions: ({navigation}) => ({
                title: '验证码登录',
                headerRight: <Text/>
            })
        },
        ForgetPassword: {
            screen: ForgetPassword,
            navigationOptions: ({navigation}) => ({
                title: '忘记密码',
                headerRight: <Text/>
            })
        },
        Business: {
            screen: Business,
            navigationOptions: ({navigation}) => ({
                title: '贷款',
                headerRight: <Text/>
            })
        },
        ContactUs: {
            screen: ContactUs,
            navigationOptions: ({navigation}) => ({
                title: '联系我们',
                headerRight: <Text/>
            })
        },
        ShowWeb: {
            screen: ShowWeb,
        },
    },

    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                paddingTop: (Platform.OS === 'ios' ? 20 : Platform.OS === 'android' && Platform.Version > 20 ? StatusBar.currentHeight : 0),
                backgroundColor: 'white',
                height:(Platform.OS === 'ios' ? 0 : Platform.OS === 'android' && Platform.Version > 20 ? StatusBar.currentHeight : 0) + 44,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomColor: 'transparent'
            }
        })
    }
);

const styles = StyleSheet.create({
    tabBarIconStyle: {
        width: 30,
        height: 30,
    },
});

export default createAppContainer(AppNavigator);

