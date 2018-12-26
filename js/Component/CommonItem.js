import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from "react-native";
import {px2dp} from '../.././global/Utils'

export default class CommonItem extends Component {
    render () {
        return (
            <TouchableOpacity key={this.props.section.toString() + this.props.row.toString()} onPress={() => {this.props.onPress(this.props.section, this.props.row)}}>
                <View style={{height: px2dp(100), flexDirection: 'row', backgroundColor: 'white'}}>
                    {!!this.props.image ? <Image style={{width: px2dp(40), height: px2dp(40), marginLeft: 15, alignSelf: 'center'}}
                                                 source={this.props.image}/> : null}
                    <Text style={{alignSelf: 'center', marginLeft: px2dp(15), fontSize: px2dp(28), color: '#000000', fontWeight: 'bold'}}>{this.props.title}</Text>
                    <Text style={{fontSize: px2dp(28), color: 'gray', alignSelf: 'center', position: 'absolute', right: 40}}>{this.props.tips}</Text>
                    <Image style={{height: px2dp(24), width: px2dp(24), alignSelf: 'center', position: 'absolute', right: 15}}
                           source={require('../.././assets/entry.png')}/>
                </View>
                <View style={{height: 1, marginLeft: 0, marginRight: 0, backgroundColor: 'lightGray'}}/>
            </TouchableOpacity>
        );
    }
}
