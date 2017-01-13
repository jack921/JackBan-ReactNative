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
    ToastAndroid
}from 'react-native';

var MOVIEHOT='https://api.douban.com/v2/movie/in_theaters';
var Dimensions = require('Dimensions');
var {MyWidth} = Dimensions.get('window');
var {MyHeight} = Dimensions.get('window');

class MovieHotSearch extends Component{

    constructor(props){
        super(props);
        this.state={
            data:'jack',
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
                showsHorizontalScrollIndicator={false}
                pageSize={3}></ListView> 
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
            <TouchableOpacity
                activeOpacity={0.8} onPress={()=>{this.onMovieClick(movie)}}>
                <View style={styles.itemViewStyle}>
                    <Image source={{uri:movie.images.medium}} style={styles.itemIconStyle}></Image>
                    <Text numberOfLines={1} style={styles.itemTitleStyle}>{movie.title}</Text>  
                </View>
            </TouchableOpacity>
        );
    }

    onMovieClick(movie){
        ToastAndroid.show(movie.title,ToastAndroid.LONG);
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
        justifyContent:'space-around',   
        flexDirection:'row',    
        flexWrap:'wrap',
        marginTop:5,  
        marginBottom:5,
        alignItems:'center'
    },itemViewStyle:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
        width:MyWidth/3,
        height:180,
        borderWidth: 1,
        padding:5,
        marginTop:3,
        marginBottom:3
    },itemIconStyle:{
        width:100,
        height:140
    },itemTitleStyle:{
        textAlign:'center',
        marginTop:3,
        flex: 1,
        fontWeight:'bold',
        width:70
    }
});


export default MovieHotSearch;