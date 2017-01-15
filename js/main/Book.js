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

import Loading from './Loading';

var BaseUrl='https://api.douban.com/v2/book/search?tag=';
var Home=["科普", "互联网", "科学", "科技","科普","用户体验", "通信", "交互", "旅行","王小波",
      "生活", "励志", "成长",  "悬疑", "武侠", "韩寒", "奇幻", "青春文学"];
var position=0;
var isMore=false;
var data=[];

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
                    showsHorizontalScrollIndicator={false}></ListView>
            </View>
        );
    }

    renderListViewItem(movie){
        return(
          <TouchableOpacity
                activeOpacity={0.8} style={styles.listitem} 
                onPress={()=>{this.onMovieClick(movie)}}>
            <View style={styles.listitem}>
                <Text>{movie.title}</Text>
            </View>
          </TouchableOpacity>
        );
    }

    onMovieClick(movie){
         ToastAndroid.show(movie.title,ToastAndroid.LONG);
    }

    componentDidMount(){
        this.FetchMovieData();
    }

    FetchMovieData(){
         fetch(BaseUrl+Home[position])
            .then((response)=>response.json())
            .then((responseData)=>{
                for(var book in responseData.books){
                    data.push(book);  
                }
                ToastAndroid.show(data,ToastAndroid.LONG);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data),
                    isLoad:false,
                });       
                position+=1; 
                this.isMore=false;
            }).catch(function(error) {
               console.warn('There has been a problem with your fetch operation: ' + error.message);
               throw error;
            });
    }

    toEnd(movie){
        if(!this.state.isMore){
            this.isMore=true;
            this.FetchMovieData();
        }
    }

    renderFooter(movie){
        return(
            <Loading style={styles.container}></Loading>
        )
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

export default Book;