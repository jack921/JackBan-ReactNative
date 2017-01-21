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
var MOVIEHOT='https://api.douban.com/v2/movie/in_theaters';
var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;
var MyHeight = Dimensions.get('window').height;

class MovieHotSearch extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoad:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),    
        };
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
                contentContainerStyle={styles.listStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}></ListView> 
          </View>       
        );
    }

    componentDidMount(){
        this.FetchMovieData();
    }

    FetchMovieData(){
        fetch(MOVIEHOT)
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData.subjects),
                    isLoad:false,
                });  
            }
        );
    }

   renderListViewItem(movie){
        return(
            <TouchableOpacity style={styles.itemViewStyle}
                activeOpacity={0.8} onPress={()=>{this.onMovieClick(movie)}}>
                <View style={styles.itemViewStyle}>
                    <Image source={{uri:movie.images.medium}} style={styles.itemIconStyle}></Image>
                    <Text numberOfLines={1} style={styles.itemTitleStyle}>{movie.title}</Text>  
                    <Text numberOfLines={1} style={styles.itemTitleStyle}>{'评分:'+movie.rating.average}</Text>  
                </View>
            </TouchableOpacity>
        );
    }

    onMovieClick(movie){
         this.props.navigator.push({
            id: 'details',
            args: {data:movie},
            component: Details,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
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


const styles = StyleSheet.create({
    loading: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },container:{
        flex:1,
        backgroundColor:'#ffffff'
    },listStyle:{
        flexDirection:'row',    
        flexWrap:'wrap',
    },itemViewStyle:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
        width:MyWidth/3,
        height:190,
        marginTop:3,
        marginBottom:3
    },itemIconStyle:{
        width:110,
        height:140
    },itemTitleStyle:{
        textAlign:'center',
        fontWeight:'bold',
        width:80
    }
});

export default MovieHotSearch;
