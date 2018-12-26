import React, { Component } from 'react'
import {SafeAreaView, View, SectionList, RefreshControl} from 'react-native'
import {BusinessItem} from '../Component'
import {Http, API} from "../Request";
import Toast from "react-native-root-toast";

export default class Business extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            datasource: [],
        };
    };

    componentDidMount() {
        this._onRefresh();
    };

    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });

        Http.get(API.product, {type: this.props.navigation.getParam('type', '')}).then((res) => {
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
                let platforms = [];
                res.product.map((item, index) => {
                    let platform = {};
                    platform.image = item.img_url;
                    platform.businessname = item.platform;
                    platform.amount = item.limit_range;
                    platform.month = item.time_range;
                    platform.rate = item.rate_range;
                    platform.url = item.target_url;
                    platforms.push(platform);
                });

                let datasource = [{section: 0, data: platforms}];
                this.setState({
                    datasource,
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

    _onPressItem = (section, row) => {
        let title = this.state.datasource[section]['data'][row].businessname;
        let url = this.state.datasource[section]['data'][row].url;
        this.props.navigation.navigate('ShowWeb', {title: title, url: url});
    };

    _renderItem = ({item, index, section: {section}}) => {
        return (
            <BusinessItem onPress={this._onPressItem}
                          section={section}
                          row={index}
                          image={item.image}
                          businessname={item.businessname}
                          amount={item.amount}
                          month={item.month}
                          rate={item.rate}/>
        )
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <SectionList
                    sections={this.state.datasource}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this._renderItem}
                    renderSectionHeader={() => (<View style={{height: 10, backgroundColor: '#F5F5F5'}} />)}
                    refreshControl={<RefreshControl title={'正在加载...'} refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
                />
            </SafeAreaView>
        );
    }
}
