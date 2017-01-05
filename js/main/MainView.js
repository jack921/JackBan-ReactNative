
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

import StartView from './StartView';

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
           <View style={styles.container}>
                <Text style={{width:200,height:200,backgroundColor:'#FFE439'
                            ,alignItems:'center',justifyContent:'center',textAlign:'center'
                            ,fontSize:30}}>jack</Text>
           </View>
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

