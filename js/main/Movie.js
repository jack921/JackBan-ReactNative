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
            renderTabBar={() => <DefaultTabBar/>}>
                <MovieHotSearch tabLabel='热映榜'></MovieHotSearch>
                <MovieComing tabLabel='正在上映'></MovieComing>
                <MovieTop250 tabLabel='TOP250'></MovieTop250>
          </ScrollableTabView>   
       );
    }
}

export default Movie;