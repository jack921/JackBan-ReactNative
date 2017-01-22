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

import BookMessage from './BookMessage.js';
import Loading from './Loading';
import Details from './Details.js';
var BaseUrl='https://api.douban.com/v2/book/search?tag=';
var Home=["综合","文学"];
var sometest=["综合","文学","流行","文化","生活","中国文学","爱情","社会学","艺术","政治","社会"];
var position=0;
var isMore=false;
var data=[];

var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;

class Book extends Component{

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
                    onEndReached={this.toEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}></ListView>
            </View>
        );
    }

    renderListViewItem(book){
        return(
          <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} 
                onPress={()=>{this.onMovieClick(book)}}>
            <View style={styles.listitem}>
                <Image style={styles.itemimage} source={{uri:book.image}}></Image>
                <Text numberOfLines={1} style={styles.itemtitle}>{book.title}</Text>
                <Text numberOfLines={1} style={styles.itemtext}>{book.publisher}</Text>
            </View>
          </TouchableOpacity>
        );
    }

    onMovieClick(book){
         this.props.navigator.push({
            id:'details',
            args: {bookData:book},
            component: BookMessage,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

    componentDidMount(){
        this.FetchMovieData();
    }

    FetchMovieData(){
         fetch(BaseUrl+Home[position])
            .then((response)=>response.json())
            .then((responseData)=>{
                for(i=0;i<responseData.books.length;i++){
                    data.push(responseData.books[i]);
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data),
                    isLoad:false,
                });       
                position+=1; 
                this.isMore=false;
            }).catch(function(error) {
               console.warn('There has been a problem with your fetch operation:'+error.message);
               throw error;
            });
    }

    toEnd(book){
        if(!this.state.isMore){
            this.isMore=true;
            this.FetchMovieData();
        }
    }

    renderFooter(book){
        return(
            <Loading style={styles.container}></Loading>
        )
    }

    renderLoadingView(){
        return(
            <View style={styles.loading}>
                <Image source={require('../image/loading.gif')}
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
        flexDirection:'row',    
        flexWrap:'wrap'  
    },listitem:{
        width:MyWidth/3,
        height:190,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:2,
        marginBottom:2
    },itemimage:{
        width:100,
        height:150,
        marginTop:3
    },itemtitle:{
        fontSize:17,
        textAlign:'left',
        justifyContent:'flex-start'
    },itemtext:{
        fontSize:12,
        marginBottom:12,
        textAlign:'left',
        justifyContent:'flex-start'
    }
    
});


export default Book;