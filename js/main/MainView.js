import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    Navigator
}from 'react-native';

import StartView from './StartView.js';
import MainPage from './MainPage.js';

class MainView extends Component{

    constructor(props){
        super(props);
        this.state={
          isLoad:false,  
        };
    }

    render(){
       if(this.state.isLoad){
          return this.showLoadingView();  
       } 
       return(
           <Navigator
            initialRoute={{component: MainPage}}
            renderScene={(route, navigator) => {
                return <route.component navigator={navigator} {...route.args}/>
                }
            }  
            configureScene={(route) => {
              return Navigator.SceneConfigs.HorizontalSwipeJump;
            }}/>
       );
    }

    showLoadingView(){
        return(
            <View style={styles.loading}>
                <StartView style={styles.startview}/>
            </View>   
        );
    }
}


var styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#F5FCFF',    
    },
    startview:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE439',     
    },
    loading:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFE439',
    },
    testText:{
        flexDirection:'row',
        justifyContent:'center',
    },
});

export default MainView;