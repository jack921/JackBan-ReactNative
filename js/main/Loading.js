import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator
}from 'react-native';

var ProgressBar = require('ProgressBarAndroid');

class Loading extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.loading}>
              <ActivityIndicator
                animating={true}
                style={[styles.centering,{height: 80}]}
                size="large"/>
              <Text style={{marginLeft:10}}>{'加载中...'}</Text>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    loading:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
});

export default Loading;
