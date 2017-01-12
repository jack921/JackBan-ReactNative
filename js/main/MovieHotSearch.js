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
    TouchableOpacity
}from 'react-native';

var MOVIEHOT='https://api.douban.com/v2/movie/in_theaters';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');

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
            <TouchableOpacity
                style={styles.itemViewStyle} onPress={()=>{this.onMovieClick(movie)}}>
                <View style={styles.itemViewStyle}>
                    <Image source={{uri:movie.images.medium}} style={styles.itemIconStyle}></Image>
                    <Text style={styles.itemTitleStyle}>{movie.title}</Text>  
                </View>
            </TouchableOpacity>
        );
    }

    onMovieClick(movie){
        
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
        backgroundColor: '#ffffff'
    },listStyle:{
        flexDirection:'row', 
        flexWrap:'wrap', 
    },itemViewStyle:{
        alignItems:'center',
        width: width / 3,
        height:100
    },
    itemIconStyle:{
        width:60,
        height:60
    },
    itemTitleStyle:{
        marginTop:8
    }
});


export default MovieHotSearch;