import React,{
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    BackAndroid
}from 'react-native';

class Details extends Component{

    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount () {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillUnmount () {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    handleBack(){
       if (Platform.OS === 'android') {  
        const { navigator } = this.props;  
        const routers = navigator.getCurrentRoutes();  
        if (routers.length > 1) {  
            navigator.pop();  
            return true; 
        }  
           return false; 
       }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{"jack"}</Text>
            </View>    
        );
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
});

export default Details;