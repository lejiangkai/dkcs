import React, { Component } from 'react'
import {SafeAreaView, View, Alert, SectionList, Clipboard, Linking} from 'react-native'
import {CommonItem} from "../Component";

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    _onPressItem = (section, row) => {
        if (row === 0) {
            this._setClipboardContent();
        } else if (row === 1) {
            Linking.canOpenURL('tel:057187615505').then(supported => {
                if (supported) {
                    return Linking.openURL('tel:057187615505');
                }
            }).catch(err => console.error('An error occurred', err));
        }
    };

    async _setClipboardContent(){
        Clipboard.setString('3072349348');
        try {
            var content = await Clipboard.getString();
            Alert.alert(
                '提示',
                '复制成功',
                [
                    {text: '确定', onPress: () => {}},
                ],
            );
        } catch (e) {
            Alert.alert(
                '提示',
                '复制失败',
                [
                    {text: '确定', onPress: () => {}},
                ],
            );
        }
    }

    _renderItem = ({item, index, section: {section}}) => {
        return (
            <CommonItem onPress={this._onPressItem}
                        section={section}
                        row={index}
                        image={item.image}
                        title={item.title}
                        tips={item.tips}/>
        )
    };

    render() {
        const sections = [{section: 0,
            data: [{image: '', title: '官方QQ：3072349348', tips: '点击复制'},
                {image: '', title: '热线电话：(0571) 8761 5505', tips: '点击拨打'}]}];

        return (
            <SafeAreaView>
                <SectionList
                    sections={sections}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    renderSectionHeader={() => (<View style={{height: 10, backgroundColor: '#F5F5F5'}} />)}
                    ItemSeparatorComponent={() => (<View style={{marginLeft: 15, marginRight: 15, height: 1, backgroundColor: '#d3d3d3'}} />)}
                />
            </SafeAreaView>
        );
    }
}
