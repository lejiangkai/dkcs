import React, {Component} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import {px2dp} from '../.././global/Utils'

const ScreenWidth = Dimensions.get('window').width;

export default class PlatformList extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.props.datasource.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => this.props.onPress(index)}>
                                <View style={{justifyContent: 'center', height: 80, width: (ScreenWidth-20)/2}}>
                                    <PlatformItem image={item.image} title={item.title} subtitle={item.subtitle}/>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }
}

class PlatformItem extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: px2dp(30)}}>
                <Image style={{height: px2dp(106), width: px2dp(106), borderRadius: 5, marginRight: 12}}
                       source={{uri: this.props.image}}/>
                <View>
                    <View style={{marginBottom: px2dp(10)}}>
                        <Text style={{fontSize: px2dp(28), color: '#000000', fontWeight: 'bold'}}>{this.props.title}</Text>
                    </View>
                    <Text style={{fontSize: px2dp(25), color: '#ceced2', fontWeight: 'bold'}}>{this.props.subtitle}</Text>
                </View>
            </View>
        );
    }
}
