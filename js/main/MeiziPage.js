import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

class MeiziPage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{'jack'}</Text>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
});

