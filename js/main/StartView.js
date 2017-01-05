import React, {
    Component,
} from 'react';

import{
    AppRegistry,
    StyleSheet,
    Image,
    View
}from 'react-native';

class StartView extends Component{
    render(){
        return(
            <View style={styles.container}>
                 <Image
                    source={require('../image/starting.gif')}
                    style={{height:300,width:400}}>
                </Image>
            </View>        
        );
    }            
}

const styles=StyleSheet.create({
        container:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#FFE439',      
        },    
});

export default StartView;
