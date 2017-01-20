import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ToolbarAndroid,
  ListView
} from 'react-native';

class Meizi extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                 <ToolbarAndroid logo={require('../image/grid.png')} 
                        title='妹子' style={styles.toolbar} actions={[{title: '关闭', show: 'never'}]}/>
                 <View style={styles.contentview}>
                     <Text>{'asdfas'}</Text>
                 </View>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },contentview:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },toolbar:{
        height:50,
        backgroundColor:'#DDDDDD'
    }
});

export default Meizi;


