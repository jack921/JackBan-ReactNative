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


class Movie extends Component{

    constructor(props){
        super(props);
        this.state={
             tabName:['热映榜','TOP250']   
        }
    }

     render(){
       return(
          <ScrollableTabView
            initialPage={1}
            renderTabBar={() => <DefaultTabBar/>}>

                <MovieHotSearch tabLabel='热映榜'></MovieHotSearch>
                    
                <MovieTop250 tabLabel='TOP250'></MovieTop250>

          </ScrollableTabView>   
       );
    }

}

export default Movie;