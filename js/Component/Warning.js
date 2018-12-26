import React, {Component} from 'react'
import {View, Image, Text} from 'react-native';

export default class Warning extends Component {
    render() {
        const warning = this.props.warning;
        if (warning) {
            return (
                <View style={[{flexDirection: 'row'}, this.props.style]}>
                    <Image style={{width: 15, height:15}}
                           source={require('../.././assets/warning.png')}/>
                    <Text style={{flex: 1, marginLeft: 10, marginRight: 10, color: 'red', fontSize: 16, alignSelf: 'center'}}>{this.props.warnMsg}</Text>
                </View>
            );
        } else {
            return null;
        }
    };
}
