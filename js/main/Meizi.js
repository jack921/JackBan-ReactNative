import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ToolbarAndroid,
  ListView,
  Navigator,
  BackAndroid
} from 'react-native';

var GANKBASE='http://gank.io/api/data/福利/14/';
var page=1;
var Dimensions = require('Dimensions');
var MyWidth = Dimensions.get('window').width;

import Loading from './Loading';
import MeiziDetail from './MeiziDetail.js';
var data=[];

class Meizi extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoad:true,
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
        }
    }

    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', this._back.bind(this))
        this.fetchMovieData();
    }

    _back() {
       if (this.props.navigator) {
          this.props.navigator.pop();
          return true;
       }
       return false;
    }

    render(){
        if(this.state.isLoad){
           return this.renderLoadingView();
        }
        return(
            <View style={styles.container}>
                 <ToolbarAndroid logo={require('../image/grid.png')} 
                        title='妹子' style={styles.toolbar} 
                        navIcon={require('../image/meizi_back.png')}
                        onIconClicked={()=>{this.onBackButton()}}/>
                 <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderListViewItem.bind(this)}
                    contentContainerStyle={styles.listStyle}
                    onEndReached={this.toEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                 </ListView>
            </View>
        );
    }

    fetchMovieData(){
        fetch(GANKBASE+page)
            .then((response)=>response.json())
            .then((responseData)=>{
                for(i=0;i<responseData.results.length;i++){
                    data.push(responseData.results[i]);
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(data),
                    isLoad:false,
                }); 
                page+=1;
                this.isMore=false;
            }
        );
    }

    renderListViewItem(gank){
        return(
            <TouchableOpacity style={styles.touchView}
                activeOpacity={0.8} onPress={()=>{this.onMeiziClick(gank)}}>
                 <Image style={styles.listimage}
                    source={{uri:gank.url}}></Image>
            </TouchableOpacity>
        );
    }

    renderLoadingView(){
        return(
            <View style={styles.loading}>
                <Image source={require('../image/loading.gif')}
                    style={{height:200,width:200}}></Image>
            </View>
        );
    }

    onMeiziClick(meizi){
        this.props.navigator.push({
            id: 'MeiziDetail',
            args: {meizilist:data},
            component: MeiziDetail,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    }

    toEnd(gank){
        if(!this.state.isMore){
            this.isMore=true;
            this.fetchMovieData();
        }
    }

    renderFooter(gank){
        return(
            <Loading style={styles.container}></Loading>
        )
    }

    onBackButton(){
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
    },loading: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },toolbar:{
        height:50,
        backgroundColor:'#DDDDDD'
    },listStyle:{
        flexDirection:'row',    
        flexWrap:'wrap'
    },listimage:{
        width:(MyWidth/2)-6,
        height:250,
        borderRadius:8,
        marginTop:3,
        marginBottom:3,
        marginLeft:3,
        marginRight:3
    },touchView:{
        width:MyWidth/2,
        height:256,
    }
});

export default Meizi;

