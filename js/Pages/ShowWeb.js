import React, { Component } from "react";
import {SafeAreaView, ProgressViewIOS, TouchableOpacity, Image, View} from "react-native";
import {WebView} from "react-native-webview";

let WEBVIEW_REF = 'WebView';
let _this = null;
export default class ShowWeb extends Component {
    static navigationOptions = ({navigationOptions, navigation}) => {
        return {
            title: navigation.getParam('title', ''),
            headerLeft: (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginLeft: 10}} onPress={() => {_this.refs[WEBVIEW_REF].goBack()}}>
                        <Image source={require('../.././assets/back.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 12}} onPress={() => {navigation.pop()}}>
                        <Image source={require('../.././assets/cancel.png')}/>
                    </TouchableOpacity>
                </View>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        };
    };

    componentDidMount() {
        _this = this;
    };

    _onLoadPragress = (e) => {
        this.setState({
            progress: e.nativeEvent.progress,
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                {this.state.progress === 1 ? null : <ProgressViewIOS progress={this.state.progress} progressTintColor={'red'} trackTintColor={'white'} style={{height: 1}} />}
                <WebView
                    ref={WEBVIEW_REF}
                    source={{uri: this.props.navigation.getParam('url', '') }}
                    onLoadProgress={this._onLoadPragress}
                />
            </SafeAreaView>
        );
    }
}
