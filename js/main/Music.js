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
    Navigator,
    ToastAndroid
}from 'react-native';

import Loading from './Loading';
import Details from './Details.js';
var MUSICTAG=["流行","经典","韩系","欧美"];
var MUSICURL="https://api.douban.com/v2/music/search?tag=";
var position=0;
var data=[];
var isMore=false;

var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;

class Music extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoad:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }), 
        }
    }

    render(){
       if(this.state.isLoad){
           return this.renderLoadingView();
       } 
       return(
          <View style={styles.container}>  
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderListViewItem.bind(this)}
                    onEndReached={this.toEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}></ListView>  
          </View>   
       );
    }

    componentDidMount(){
        this.FetchMusicData();
    }

    FetchMusicData(){
        fetch(MUSICURL+MUSICTAG[position])
            .then((response)=>response.json())
            .then((responseData)=>{
                for(i=0;i<responseData.musics.length;i++){
                    data.push(responseData.musics[i]);
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data),
                    isLoad:false,
                });       
                position+=1; 
                this.isMore=false;
            });
    }

    renderLoadingView(){
        return(
            <View style={styles.loading}>
                <Image
                    source={require('../image/loading.gif')}
                    style={{height:200,width:200}}
                    onEndReached={this.toEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}></Image>
            </View>
        );
    }

    renderListViewItem(music){
        return(
          <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} 
                onPress={()=>{this.onMovieClick(music)}}>
           <View style={styles.listitem}>
                <Image style={styles.itemimage} source={{uri:music.image}}></Image>
                <View style={styles.itemview}>
                    <Text style={styles.itemtitle}>{music.title}</Text>
                    <Text style={styles.itemtext}>{'评分:'+music.rating.average}</Text>
                    <Text style={styles.itemtext}>{music.author[0].name}</Text>
                </View>    
            </View>
          </TouchableOpacity>
        );
    }

    onMovieClick(music){
        this.props.navigator.push({
            id:'details',
            args: {data:music},
            component: Details,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

    renderFooter(movie){
        return(
            <Loading style={styles.container}></Loading>
        )
    }

    toEnd(movie){
        if(!this.state.isMore){
            this.isMore=true;
            this.FetchMusicData();
        }
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },loading:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },listitem:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        marginLeft:3,
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },itemimage:{
        width:110,
        height:150,
        marginBottom:8,
        marginTop:8
    },itemview:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:10
    },itemtitle:{
        fontSize: 22,
        fontWeight:'bold',
        textAlign:'left'
    },itemtext:{
        fontSize:17,
        marginTop:5
    }
});

export default Music;