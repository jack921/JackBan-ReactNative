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

import px2pd from '../util/px2dp.js';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

class MainPages extends Component{

     static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9'
    };

    constructor(props){
        super(props);
        this.state={
            selectedTab:'home',
        }
    }

    render(){

        return(
           <View style={styles.container}>
               <TabNavigator
                    hidesTabTouch={true}
                    tabBarStyle={styles.tab}
                    sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                  {renderTabItem(this.state.homeNormal,this.state.homeSelected,'首页',createChildView('首页1'))}
                  {renderTabItem(this.state.compassNormal,this.state.compassSelected,'发现',createChildView('首页2'))}
                  {renderTabItem(this.state.notificationNormal,this.state.notificationSelected,'消息',createChildView('首页3'))}
                  {renderTabItem(this.this.state.meNormal,this.state.meSelected,'我',createChildView('首页4'))}
               </TabNavigator>
           </View>     
        );
    }

    renderTabItem(img,selectimg,title,childview){
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab===title}
                title={title}
                renderIcon={()=><Image style={styles.tabImage} source={img}></Image>}>}
                renderSelectedIcon={()=><Image style={styles.tabImage} source={selectimg}></Image>}
                onPress={()=>this.setState({selectedTab:title})}>
                {childview}
            </TabNavigator.Item>
        )
    }

    componentWillMount(){
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-notifications', 50, normalColor).then((source) => this.setState({ notificationNormal: source }));
        Icon.getImageSource('md-notifications', 50, selectedColor).then((source) => this.setState({ notificationSelected: source }));
        Icon.getImageSource('md-home', 50, normalColor).then((source) => this.setState({ homeNormal: source }));
        Icon.getImageSource('md-home', 50, selectedColor).then((source) => this.setState({ homeSelected: source }));
        Icon.getImageSource('md-person', 50, normalColor).then((source) => this.setState({ meNormal: source }));
        Icon.getImageSource('md-person', 50, selectedColor).then((source) => this.setState({ meSelected: source }));
        Icon.getImageSource('md-compass', 50, normalColor).then((source) => this.setState({ compassNormal: source }));
        Icon.getImageSource('md-compass', 50, selectedColor).then((source) => this.setState({ compassSelected: source }));
    }

 createChildView(tag) {  
    return (  
        <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>  
            <Text style={{fontSize:22}}>{tag}</Text>  
        </View>  
    )  
}  

}

const styles=StyleSheet.create({
      container:{
          flex:1,    
          flexDirection:'row',
          justifyContent:'center',      
      },
      tabImage:{
          width:px2pd(22),
          height:px2pd(22)
      },
      tab:{
          height:px2pd(49),
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:'#fff'  
      },
});

export default MainPages;

