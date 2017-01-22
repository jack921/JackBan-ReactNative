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
    Navigator
}from 'react-native';

import MovieMessage from './MovieMessage.js';
var MOVIECOMING='https://api.douban.com/v2/movie/top250';
var ranking=0;


class MovieTop250 extends Component{

    constructor(props){
        super(props);
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
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}></ListView>
            </View>
        );
    }

    renderListViewItem(movie){
     
        ranking++;

        return(
          <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} onPress={()=>{this.onMovieClick(movie)}}>
            <View style={styles.listitembg}>
                <View style={styles.rankbg}>
                    <Text style={styles.rankitemtext}>{ranking+""}</Text>
                </View>
               <View style={styles.listitem}>
                <Image style={styles.itemimage} source={{uri:movie.images.medium}}></Image>
                <View style={styles.itemview}>
                    <Text style={styles.itemtitle}>{movie.title}</Text>
                    <Text style={styles.itemtext}>{'评分:'+movie.rating.average}</Text>
                    <Text style={styles.itemtext}>{'类型:'+movie.genres}</Text>
                </View>    
            </View>  
            </View>
            </TouchableOpacity>
        );
    }

    onMovieClick(movie){
         this.props.navigator.push({
            id:'MovieMessage',
            args: {data:movie},
            component: MovieMessage,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

    componentDidMount(){
        this.FetchMovieData();
    }

    FetchMovieData(){
         fetch(MOVIECOMING)
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData.subjects),
                    isLoad:false,
                });  
            }
        );
    }

    renderLoadingView(){
        return(
            <View style={styles.loading}>
                <Image
                    source={require('../image/loading.gif')}
                    style={{height:200,width:200}}></Image>
            </View>
        );
    }
    

}

const styles =StyleSheet.create({
    loading:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },container:{
        flex:1,
        backgroundColor:'#ffffff'
    },listStyle:{
        flex:1
    },listitem:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#ffffff'
    },itemimage:{
        width:110,
        height:155,
        marginLeft:3,
        marginTop:3
    },itemview:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        backgroundColor:'#ffffff',
        marginLeft:10
    },itemtitle:{
        fontSize: 22,
        fontWeight:'bold',
        textAlign:'left'
    },itemtext:{
        fontSize:17,
        marginTop:10
    },rankbg:{
        backgroundColor:'#f1f1f1',
        justifyContent:'center'
    },listitembg:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#ffffff',
        marginTop:2,
        marginBottom:2,
        marginLeft:3
    },rankitemtext:{
        fontSize:17,
        marginTop:10,
        marginLeft:15
    }
    
});

export default MovieTop250;