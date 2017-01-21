import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    DrawerLayoutAndroid
}from 'react-native';

import px2pd from '../util/px2dp.js';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import DrawerLayout from './DrawerLayout.js'; 
import MovieView from './Movie.js';
import BookView from './Book.js';
import MusicView from './Music.js';
   

class MainPages extends Component{

    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9'
    };
    constructor(props) {
        super(props);
        this.state={
            selectedTab: '电影',
        };
        this.navigationView=(
            <DrawerLayout style={styles.avigationView} 
                navigator={this.props.navigator}></DrawerLayout>
        );
    }

    render() {
        const {selectedColor,tabName} = this.props;
        return (
            <DrawerLayoutAndroid
                drawerWidth = {250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => this.navigationView}>
              <TabNavigator
                 tabBarStyle={styles.tabbar}>
                 {this.renderTabItem('电影',this.state.homeNormal,this.state.homeSelected,this.createMovieChildView('电影'))}
                 {this.renderTabItem('文学',this.state.meNormal,this.state.meSelected,this.createBookChildView('文学'))}
                 {this.renderTabItem('音乐',this.state.compassNormal,this.state.compassSelected,this.createMusicChildView('音乐'))}
              </TabNavigator>
            </DrawerLayoutAndroid>

        );
    }

    renderTabItem(title,image,slectImage,childview){
        const {selectedColor} = this.props;
        return(
            <TabNavigator.Item
                tabStyle={styles.tabStyle}
                title={title}
                selected={this.state.selectedTab === title}
                selectedTitleStyle={{color: selectedColor}}
                renderIcon={() => <Image style={styles.tab} source={image} />}
                renderSelectedIcon={() => <Image style={styles.tab} source={slectImage} />}
                onPress={() => this.setState({ selectedTab: title })}>
                {childview}
            </TabNavigator.Item>
        )
    }

    createMovieChildView(tag) {  
        return (  
            <MovieView navigator={this.props.navigator}></MovieView>
        )  
    }  

    createBookChildView(tag){
        return (  
            <BookView navigator={this.props.navigator}></BookView>   
        )
    }

    createMusicChildView(tag){
        return(
            <MusicView navigator={this.props.navigator}></MusicView>
        )  
    }

    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-videocam', 50, normalColor).then((source) => this.setState({ homeNormal: source }));
        Icon.getImageSource('md-videocam', 50, selectedColor).then((source) => this.setState({ homeSelected: source }));
        Icon.getImageSource('md-book', 50, normalColor).then((source) => this.setState({ meNormal: source }));
        Icon.getImageSource('md-book', 50, selectedColor).then((source) => this.setState({ meSelected: source }));
        Icon.getImageSource('md-musical-notes', 50, normalColor).then((source) => this.setState({ compassNormal: source }));
        Icon.getImageSource('md-musical-notes', 50, selectedColor).then((source) => this.setState({ compassSelected: source }));
    }
 

}

const styles = StyleSheet.create({
    tabbar: {
        height: 56,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle:{
        alignItems:'center',
        justifyContent: 'center',
        padding: 5
    },
    tab: {
        width: 21,
        height: 21
    },
    avigationView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    }
});

export default MainPages;

