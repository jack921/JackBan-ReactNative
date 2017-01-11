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


class Music extends Component{

     render(){
       return(
          <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>  
                <Text style={{fontSize:22}}>{'音乐'}</Text>  
          </View>   
       );
    }

}

export default Music;