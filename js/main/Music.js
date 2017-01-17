import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ListView
}from 'react-native';

var MUSICTAG=["流行","经典","韩系","欧美"];
var MUSICURL="https://api.douban.com/v2/music/search?tag=";
var position=0;
var data=[];

class Music extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoad:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }), 
        }
    }

    render(){
       if(!this.state.isLoad){
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
                    style={{height:200,width:200}}></Image>
            </View>
        );
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
    }
});

export default Music;