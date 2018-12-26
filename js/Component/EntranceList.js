import React, {Component} from 'react';
import {Dimensions, View, Image, Text, TouchableOpacity} from "react-native";
import {px2dp} from '../.././global/Utils'

const ScreenWidth = Dimensions.get('window').width;

export default class EntranceList extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                {
                    this.props.datasource.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => this.props.onPress(index)}>
                                <View style={{alignItems: 'center', justifyContent: 'center', height: (ScreenWidth-20)/4, width: (ScreenWidth-20)/4}}>
                                    <EntranceItem image={item.image} title={item.title}/>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }
}

class EntranceItem extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Image style={{height: px2dp(104), width: px2dp(162)}}
                       source={this.props.image}/>
                <Text style={{textAlign: 'center', marginTop: px2dp(15), fontSize: px2dp(28), color: '#000000'}}>{this.props.title}</Text>
            </View>
        );
    }
}
