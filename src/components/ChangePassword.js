import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
// import {TextInput} from 'react-native-paper';
import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Button, ThemeProvider } from 'react-native-elements';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';

const theme = {
    colors: {
        primary: '#0288d1'
    }
}

const style = StyleSheet.create({
    containerChangePassword: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        width:'80%'
        
    },

    icon: {
        fontSize: 30,
        paddingRight: 15,
        position: 'absolute',
        bottom: 0
    },
    iconKey: {
        fontSize: 18,
        paddingRight: 18,
        paddingLeft: 5,
        position: 'absolute',

    },
    rowView: {
        width: '100%',
        height: 50,
        paddingBottom: 50,
        marginBottom: -15,
        top: 0,
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    circle: {
        backgroundColor: 'transparent',
        height: 500,
        width: 500,
        position: 'absolute',
        bottom: -400,
        borderRadius: 400
    }
})

export default class ChanePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }


    }

    render() {
        return (
         <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems: 'center'}}>

            <View style={style.containerChangePassword}>
                <View style={style.rowView}>
                    <Entypo name='key' size={16} color='#b5b5b5' style={{ position: 'absolute', top: 12, left: -20 }} />
                    <TextField
                        label='Password Lama'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#0288d1'
                        tintColor='#0288d1'
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}
                        onFocus={this.props.onFocus1}
                        onBlur={this.props.onBlur1}

                        />
                </View>


                <View style={style.rowView}>
                    <EvilIcons name='lock' size={24} color='#b5b5b5' style={{ position: 'absolute', top: 10, left: -25 }} />
                    <TextField
                        label='Password Baru'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#0288d1'
                        tintColor='#0288d1'
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}
                        onFocus={this.props.onFocus2}
                        onBlur={this.props.onBlur2}

                    />
                </View>
                <View style={style.rowView}>
                    <EvilIcons name='lock' size={24} color='#b5b5b5' style={{ position: 'absolute', top: 10, left: -25 }} />
                    <TextField
                        label='Konfirmasi Password'
                        textColor='grey'
                        baseColor='black'
                        selectionColor='#0288d1'
                        tintColor='#0288d1'
                        contentInset={{ label: -2, top: 1, input: 1 }}
                        secureTextEntry={true}
                        fontSize={12}
                        onFocus={this.props.onFocus3}
                        onBlur={this.props.onBlur3}

                        />
                </View>
                <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate("Login")}
                        style={{ backgroundColor: "#d5322e", 
                        width: "100%", 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                                alignItems: 'center', 
                                marginTop:20,
                                marginBottom:40,
                                paddingVertical:5,
                                flexDirection:'row' 
                            }}>
                    <AntDesign color='white' name="logout" style={{}} size={24} />
                    <Text style={{ paddingLeft: 5, color: 'white', textAlign: 'center', }}>Logout</Text>
                </TouchableOpacity>

            </View>
                <View style={{width: '113%', backgroundColor: '#0288d1', position: "absolute", bottom:-20, height:40, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{color:'white', fontWeight:'700', fontSize:18}}>Simpan</Text>
                </View>
        </View>
        )
    }
}