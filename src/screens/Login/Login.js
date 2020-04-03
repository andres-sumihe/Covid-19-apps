import React from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
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

    render(){
        let {username, password} = this.state;
        return(
            <View style={{flex:1}}>
                <LinearGradient
                    colors={['#0288d1','#01579b']}
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
                                label='Username'
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
                                label='Password'
                                keyboardType='default'
                                textColor='white'
                                baseColor='white'
                                selectionColor='white'
                                tintColor='white'
                                inputContainerStyle={{paddingLeft:25}}
                                contentInset={{label: -2, top:1, input:1}}
                                onChangeText={ (password) => this.setState({ password }) }/>
                                <TouchableOpacity style={{position:'absolute', bottom:15, right:0}}>
                                    <Entypo name="eye" size={15} color="white" />
                                </TouchableOpacity>
                        </View>

                        <View style={{marginVertical:10, alignItems:'flex-end'}}>
                            <Text style={{color:'white', fontWeight:'600'}} onPress={()=>this.props.navigation.navigate("LupaPassword")}>Lupa Password ?</Text>
                        </View>
                    </View>
                    <View style={{width:'75%', marginBottom:0}}>
                        <ThemeProvider theme={theme}>
                            <Button 
                                title="Masuk"
                                buttonStyle={{borderRadius:5}}
                                raised={true}
                                onPress={()=>this.props.navigation.navigate("Main")}
                                >
                            </Button>
                        </ThemeProvider>
                    </View>
                </View>
            </View>
        )
    }
}