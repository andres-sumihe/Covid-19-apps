import React from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button, ThemeProvider} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'
import {Entypo, EvilIcons} from '@expo/vector-icons'
import { widthPercentageToDP as wp}  from 'react-native-responsive-screen';


import Jari from '../../../assets/Covid-19.svg'

const theme = {
    colors:{
        primary: '#ff9800'
    }
}
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }

    handleLogin = ()=>{
        if(this.state.username === 'admin' && this.state.password === 'admin'){
            this.props.navigation.navigate("Main", {privilages: "admin"})
        }else if(this.state.username === 'user' && this.state.password === 'user'){
            this.props.navigation.navigate("Main", {privilages: "user"})
        }else {
            Alert.alert(
                'Login Gagal',
                'Nomor KTP atau Nomor KK salah',
                [
                  {text: 'Oke', onPress: () => console.log('Cancel Pressed'), style: 'default'},
                  
                ],
                { cancelable: false }
            )
        }
    }
    render(){
        let {username, password} = this.state;
        return(
            <View style={{flex:1}}>
                <LinearGradient
                    colors={['#d5322e','#c21704']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '100%',
                    }} />
                <View style={{flex:2.5, justifyContent: 'center', alignItems: 'center', paddingTop:80}} >
                    <Jari width={200} height={200} style={{marginBottom:50}}/>
                </View>
                <View style={{flex:6.5,alignItems:'center', flexDirection:'column',}}> 
                    <View style={{width:'75%'}}>
                        <View style={{}}>
                            <View style={{position:'absolute', bottom:15}}>
                                <EvilIcons name="lock" size={24} color="white" />
                            </View>
                            <TextField
                                value={username}
                                label='Nomor KTP'
                                keyboardType='default'
                                textColor='white'
                                baseColor='white'
                                selectionColor='white'
                                tintColor='white'
                                // containerStyle={{paddingLeft:10}}
                                inputContainerStyle={{paddingLeft:25}}
                                contentInset={{label: -2, top:1, input:1}}
                                onChangeText={ (username) => this.setState({ username }) }/>
                        </View>
                        <View style={{}}>
                            <View style={{position:'absolute', bottom:15}}>
                                <Entypo name="key" size={15} color="white" />
                            </View>
                            <TextField
                                value={password}
                                label='Nomor KK'
                                keyboardType='default'
                                textColor='white'
                                baseColor='white'
                                selectionColor='white'
                                tintColor='white'
                                inputContainerStyle={{paddingLeft:25}}
                                contentInset={{label: -2, top:1, input:1}}
                                onChangeText={ (password) => this.setState({ password }) }/>
                        </View>
                    </View>
                    <View style={{width:'75%', marginTop:10}}>
                        <ThemeProvider theme={theme}>
                            <Button 
                                title="Masuk"
                                buttonStyle={{borderRadius:5}}
                                raised={true}
                                onPress={this.handleLogin}
                                >
                            </Button>
                        </ThemeProvider>
                    </View>
                </View>
            </View>
        )
    }
}