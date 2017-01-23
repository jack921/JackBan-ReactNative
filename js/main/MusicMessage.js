import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Navigator,
    ToastAndroid,
    ScrollView,
    Button,
    BackAndroid
}from 'react-native';

var MUSICBASE="https://api.douban.com/v2/music/";
var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;
import Details from './Details.js';    

class MusicMessage extends Component{

    constructor(props){
        super(props);
        this.state={
            pubdate:'',
            publisher:'',
            summary:'',
            tracks:''
        };

    }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._back.bind(this));
      this.FetchMusicData();
    }

    _back(){
      if (this.props.navigator) {
         this.props.navigator.pop();
         return true;
      }
         return false;
    }

    FetchMusicData(){
        fetch(MUSICBASE+this.props.musicData.id)
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    pubdate:responseData.attrs.pubdate[0],
                    publisher:responseData.attrs.publisher[0],
                    summary:responseData.summary,
                    tracks:responseData.attrs.tracks[0]
                });
            }   
        );
    }

    render(){
        return(
          <ScrollView style={{flex:1}}>
             <View style={styles.container}>
                <View style={styles.imageviewbg}>
                    <Image style={styles.bookimg} source={{uri:this.props.musicData.image}}></Image>
                
                    <TouchableOpacity style={{position:'absolute',top:10,left:10}} onPress={()=>{this.back()}}>
                        <Image style={{width:35,height:35}} 
                            source={require('../image/back.png')}></Image> 
                    </TouchableOpacity>     

                </View>      

                <Text style={styles.infotitle}>{this.props.musicData.title}</Text>

                <Text style={styles.infotitle}>{this.props.musicData.rating.average+'分'}</Text> 

                <Text style={styles.infotext}>{this.props.musicData.author[0].name}</Text>

                <Text style={styles.infotext}>{"出版时间:"+this.state.pubdate}</Text>

                <Text style={styles.infotext}>{"出版社:"+this.state.publisher}</Text>

                <View style={styles.buttonview}>
                    <Button title='查看详情' style={styles.buttonview} 
                        onPress={()=>{this.onMusicButton(this.props.musicData)}}></Button> 
                </View>          

                <Text style={styles.infotip}>{'简介'}</Text>        

                <Text style={styles.infocontent}>{this.state.summary}</Text> 

                <Text style={styles.infotip}>{'曲目'}</Text>

                <Text style={styles.infocontent}>{this.state.tracks}</Text>

             </View>
          </ScrollView>
        );
    }

    onMusicButton(music){
         this.props.navigator.push({
            id:'details',
            args: {data:music},
            component: Details,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

    back(){
        if (this.props.navigator) {
         this.props.navigator.pop();
         return true;
       }
       return false;
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

export default MusicMessage;

