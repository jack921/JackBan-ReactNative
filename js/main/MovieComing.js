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

import Details from './Details.js';
var MOVIECOMING='https://api.douban.com/v2/movie/coming_soon';

class MovieComing extends Component{
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
        var directors='无';
        if(movie.directors[0]!=null){
            directors=movie.directors[0].name;
        }
        var casts='';
        var i=0;
        for(var cast in movie.casts){
            if(i===0){
               casts=movie.casts[0].name;     
            }else{
               casts+=","+movie.casts[i].name;    
            }
            i++;
        }

        return(
          <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} onPress={()=>{this.onMovieClick(movie)}}>
            <View style={styles.listitem}>
                <Image style={styles.itemimage} source={{uri:movie.images.medium}}></Image>
                <View style={styles.itemview}>
                    <Text style={styles.itemtitle}>{movie.title}</Text>
                    <Text style={styles.itemtext}>{'评分:'+movie.rating.average}</Text>
                    <Text style={styles.itemtext}>{'类型:'+movie.genres}</Text>
                    <Text style={styles.itemtext}>{'导演:'+directors}</Text>
                    <Text style={styles.itemtext}>{'演员:'+casts}</Text>
                </View>    
            </View>
            </TouchableOpacity>
        );
    }

    onMovieClick(movie){
         this.props.navigator.push({
            id:'details',
            passProps: {data:movie},
            component: Details,
            sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
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
        backgroundColor:'#ffffff',
        marginTop:2,
        marginBottom:2,
         marginLeft:3
    },itemimage:{
        width:110,
        height:150
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

export default MovieComing;