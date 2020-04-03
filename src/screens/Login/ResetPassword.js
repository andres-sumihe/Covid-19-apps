import React from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button, ThemeProvider} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'
import {Entypo} from '@expo/vector-icons'
import { widthPercentageToDP as wp}  from 'react-native-responsive-screen';

import Logo from '../../../assets/adminduk.svg'
import Jari from '../../../assets/fingerlogo.svg'

const theme = {
    colors:{
        primary: '#ff9800'
    }
}
export default class ResetPassword extends React.Component{
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
                <View style={{position:'absolute', top:30, left: wp('2.5%')}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Entypo name='chevron-left' color='white' size={28} style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:2.5, justifyContent: 'center', alignItems: 'center', paddingTop:80}} >
                    <Jari width={100} height={100} style={{marginBottom:-50}}/>
                    <Logo width={150} height={150} />
                </View>
                <View style={{flex:6.5,alignItems:'center', flexDirection:'column',}}> 
                    <View style={{width:'75%'}}>
                        <View>
                            <View style={{position:'absolute', bottom:15}}>
                                <Entypo name="key" size={15} color="white" />
                            </View>
                            <TextField
                                value={username}
                                label='Password Baru'
                                keyboardType='default'
                                textColor='white'
                                baseColor='white'
                                selectionColor='white'
                                tintColor='white'
                                inputContainerStyle={{paddingLeft:25}}
                                contentInset={{label: -2, top:1, input:1}}
                                onChangeText={ (username) => this.setState({ username }) }/>
                                <TouchableOpacity style={{position:'absolute', bottom:15, right:0}}>
                                    <Entypo name="eye" size={15} color="white" />
                                </TouchableOpacity>
                        </View>

                        <View>
                            <View style={{position:'absolute', bottom:15}}>
                                <Entypo name="key" size={15} color="white" />
                            </View>
                            <TextField
                                value={password}
                                label='Ulangi Password Baru'
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
                    </View>
                    <View style={{width:'75%', top:15}}>
                        <ThemeProvider theme={theme}>
                            <Button 
                                title="Tetapkan Password"
                                buttonStyle={{borderRadius:5}}
                                raised={true}>
                            </Button>
                        </ThemeProvider>
                    </View>
                </View>
            </View>
        )
    }
}