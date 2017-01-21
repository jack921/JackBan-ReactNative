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
  ListView,
  BackAndroid,
  Platform,
  ViewPagerAndroid
} from 'react-native';

var MyWidth = require('Dimensions').get('window').width;
var MyHeight = require('Dimensions').get('window').height;

class MeiziDetail extends Component{

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
        if(Platform.OS === 'ios'){
            return this.iosImageView();
        }else{
            return this.androidImageView();       
        }
    }

    iosImageView(){
        return(
            <View style={styles.container}>
               <Image style={styles.image} 
                    defaultSource={require('../image/imageload.png')}
                    source={{uri:this.props.data.url}}></Image>
            </View>
           );
    }

    androidImageView(){
        var pages = [];
        for (var i = 0; i < PAGES; i++) {
            var pageStyle = {
                backgroundColor: BGCOLOR[i % BGCOLOR.length],
                alignItems: 'center',
                padding: 20,
            };
            pages.push(
                <View key={i} style={pageStyle} collapsable={false}>
                    <Image style={styles.image}
                        source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}/>
                </View>
            );
        }   
         return(
            <View style={styles.container}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}>
                    <View style={styles.viewPagerItem} collapsable={false} key={1}>
                        <Text>First page</Text>
                    </View>
                    <View style={styles.viewPagerItem} collapsable={false} key={2}>
                        <Text>Second page</Text>
                    </View>
                </ViewPagerAndroid>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    container:{ 
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },image:{
        width:MyWidth,
        height:MyHeight
    },viewPager:{
        flex:1,
        backgroundColor:'#CCCCCC'
    },viewPagerItem:{
        backgroundColor:'#CCCCCC',
        alignItems: 'center',
        padding: 20
    }
});

export default MeiziDetail;

