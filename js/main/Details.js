import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    BackAndroid,
    WebView,
    ToastAndroid
}from 'react-native';

var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;
var MyHeight = Dimensions.get('window').height;

class Details extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._back.bind(this))
  }

  _back() {
      if (this.props.navigator) {
         this.props.navigator.pop();
         return true;
       }
       return false;
  }

 render(){
    return(
        <View style={styles.container}>
           <WebView style={styles.webview}
               source={{uri:this.props.data.alt,method: 'GET'}}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               scalesPageToFit={true}
               mediaPlaybackRequiresUserAction={true}
               startInLoadingState={true}>
           </WebView>
        </View>    
    );
 }

}

const styles=StyleSheet.create({
    container:{
        flex:1
    },webview:{
        width:MyWidth,
        height:MyHeight,
        backgroundColor:'#E8E8E8'
    }
});

export default Details;
