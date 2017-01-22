import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    ToastAndroid,
    Navigator,
    ScrollView,
    Button,
    BackAndroid
}from 'react-native';

var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;
import Details from './Details.js';

class BookMessage extends Component{

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._back.bind(this))
    }

    _back(){
      if (this.props.navigator) {
         this.props.navigator.pop();
         return true;
       }
         return false;
    }

    render(){
        return(
          <ScrollView style={{flex:1}}>
             <View style={styles.container}>
                <View style={styles.imageviewbg}>
                    <Image style={styles.bookimg} source={{uri:this.props.bookData.image}}></Image>
                </View>

                <Text style={styles.infotitle}>{this.props.bookData.title}</Text>

                <Text style={styles.infotitle}>{this.props.bookData.rating.average+'分'}</Text>  

                <Text style={styles.infotext}>{this.props.bookData.author[0]}</Text>

                <Text style={styles.infotext}>{"出版时间:"+this.props.bookData.pubdate}</Text>

                <Text style={styles.infotext}>{"出版社:"+this.props.bookData.publisher}</Text>

                <Text style={styles.infotext}>{this.props.bookData.price}</Text>

                <View style={styles.buttonview}>

                    <Button title='查看详情' style={styles.buttonview} 
                        onPress={()=>{this.onLookButton(this.props.bookData)}}></Button> 

                </View>          

                <Text style={styles.infotip}>{'简介'}</Text>        

                 <Text style={styles.infocontent}>{this.props.bookData.summary}</Text> 

                <Text style={styles.infotip}>{'作者简介'}</Text>

                <Text style={styles.infocontent}>{this.props.bookData.author_intro}</Text>

              </View>
          </ScrollView>
        );
    }

    onLookButton(book){
        this.props.navigator.push({
            id:'details',
            args: {data:book},
            component: Details,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },imageviewbg:{
        height:300,
        backgroundColor:'#000000',
        justifyContent:'center',
        alignItems:'center'
    },bookimg:{
        width:150,
        height:200
    },infotitle:{
        fontSize:18,
        fontWeight:'bold',
        marginLeft:15,
        marginTop:5    
    },infotext:{
        fontSize:12,
        marginLeft:15,
        marginTop:4 
    },buttonview:{
        width:100,
        marginLeft:30,
        marginTop:15
    },infotip:{
        marginLeft:15,
        marginTop:15,
        marginBottom:10
    },infocontent:{
        width:MyWidth,
        marginLeft:10,
        marginRight:10
    }
});

export default BookMessage;

