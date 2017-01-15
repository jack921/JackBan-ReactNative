import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
}from 'react-native';

var ProgressBar = require('ProgressBarAndroid');

class Loading extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.loading}>
                <Text>{'加载中...'}</Text>
                <ProgressBar styleAttr="Inverse" indeterminate={false} style={{marginLeft:10}}
                      ></ProgressBar>
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
    }
});

export default Loading;
