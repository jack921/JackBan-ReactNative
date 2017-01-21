import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  TouchableOpacity,
  ToastAndroid,
  Navigator,
  ScrollView
} from 'react-native';

import Meizi from './Meizi.js';

class DrawerLayout extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
          <ScrollView style={styles.container}>
             <View style={styles.container}>
                <Image style={styles.drawerheaderimage} source={require('../image/app_header.gif')}></Image>
                {this.drawItemView('妹子',1)}
             </View>
          </ScrollView>  
        );
    }

    drawItemView(name,action){
        return(
            <TouchableOpacity
                activeOpacity={0.8} onPress={()=>{this.meiziitem(action)}}>
                <View style={styles.itemview}>
                    <Image source={require('../image/grid.png')} style={styles.drawimage}></Image>
                    <Text style={styles.drawitemtext}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    meiziitem(action){
        if(action===1){
            this.props.navigator.push({
                id:'meizi',
                component:Meizi,
                sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJump    
            });
        }
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1
    },itemview:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#34CA70'
    },drawerheaderimage:{
        width:250,
        height:180
    },drawimage:{
        width:30,
        height:30
    },drawitemtext:{
        marginLeft:5,
        fontSize:18
    }
});

export default DrawerLayout;
