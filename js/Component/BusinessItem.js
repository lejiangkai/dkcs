import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {px2dp} from '../.././global/Utils'

export default class BusinessItem extends Component {
    render() {
        return (
            <TouchableOpacity key={this.props.section.toString() + this.props.row.toString()} onPress={() => {this.props.onPress(this.props.section, this.props.row)}}>
                <View>
                    <View style={{padding: 20}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Image style={{height: 50, width: 50, borderRadius: 7, marginRight: 10}}
                                       source={{uri: this.props.image}}/>
                                <Text style={{color: '#000000', fontSize: px2dp(32), fontWeight: 'bold', alignSelf: 'center'}}>{this.props.businessname}</Text>
                            </View>
                            <View>
                                <Text style={{color: '#ff3b30', fontSize: px2dp(40), fontWeight: 'bold', marginBottom: 7}}>{this.props.amount}</Text>
                                <Text style={{alignSelf: 'flex-end', fontSize: px2dp(25), color: '#8e8e93', fontWeight: 'bold'}}>额度范围(元)</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={{color: '#8e8e93', fontSize: px2dp(30), fontWeight: 'bold'}}>贷款期限(月)</Text>
                                    <Text style={{marginTop: 5, color: '#8e8e93', fontSize: px2dp(30), fontWeight: 'bold'}}>利率范围</Text>
                                </View>
                                <View style={{marginLeft: 15}}>
                                    <Text style={{color: '#000000', fontSize: px2dp(30), fontWeight: 'bold'}}>{this.props.month}</Text>
                                    <Text style={{marginTop: 5, color: '#000000', fontSize: px2dp(30), fontWeight: 'bold'}}>{this.props.rate}</Text>
                                </View>
                            </View>
                            <View style={{width: 100, height: 40, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#d3d3d3'}}>
                                <Text style={{color: '#000000', fontSize: px2dp(35)}}>立即申请</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginLeft: 0, marginRight: 0, height: 1, backgroundColor: '#d3d3d3'}} />
                </View>
            </TouchableOpacity>
        );
    }
}

