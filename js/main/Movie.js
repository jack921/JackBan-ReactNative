import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
}from 'react-native';

import ScrollableTabView,{DefaultTabBar,} from 'react-native-scrollable-tab-view';
import MovieHotSearch from './MovieHotSearch.js';
import MovieTop250 from './MovieTop250.js';
import MovieComing from './MovieComing.js';

class Movie extends Component{

    constructor(props){
        super(props);
    }
     render(){
       return(
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar/>}
            tabBarUnderlineStyle={{backgroundColor: '#1683FB'}}
            tabBarActiveTextColor='#1683FB'>
                <MovieHotSearch tabLabel='热映榜' navigator={this.props.navigator}></MovieHotSearch>
                <MovieComing tabLabel='正在上映' navigator={this.props.navigator}></MovieComing>
                <MovieTop250 tabLabel='TOP250' navigator={this.props.navigator}></MovieTop250>
          </ScrollableTabView>   
       );
    }
}

export default Movie;