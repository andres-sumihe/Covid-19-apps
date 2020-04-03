import React from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Alert} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button, ThemeProvider} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'
import { widthPercentageToDP as wp}  from 'react-native-responsive-screen';
import Keyboard from '../../components/Keyboard'

import Logo from '../../../assets/adminduk.svg'
import Jari from '../../../assets/fingerlogo.svg'

const theme = {
    colors:{
        primary: '#0288d1'
    }
}
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            otp:'',
            circlePosition: 0,
            circle1: false,
            circle2: false,
            circle3: false,
            circle4: false,
        }
    }

    componentDidMount(){    
    }

    handleButtonPress = (e) => {
        
        if(this.state.circlePosition <4){
            this.setState({otp: this.state.otp+e})
            this.setState({circlePosition: this.state.circlePosition+1})
            if(this.state.circlePosition == 0){
                this.setState({circle1: true})
            }else if(this.state.circlePosition == 1){
                this.setState({circle2: true})
            }else if(this.state.circlePosition == 2){
                this.setState({circle3: true})
            }else if(this.state.circlePosition == 3){
                this.setState({circle4: true})
            }else{
                null
            }
        }
        if(this.state.circlePosition ==3 ){
            console.log("TEST")
        }

    }

    handleDeleteButtonPress = () => {
        this.setState({otp: this.state.otp.slice(0,-1)})
        if(this.state.circlePosition>=1 &&this.state.circlePosition <=4){
            this.setState({circlePosition: this.state.circlePosition-1})
            if(this.state.circlePosition == 1){
                this.setState({circle1: false})
            }else if(this.state.circlePosition == 2){
                this.setState({circle2: false})
            }else if(this.state.circlePosition == 3){
                this.setState({circle3: false})
            }else if(this.state.circlePosition == 4){
                this.setState({circle4: false})
            }else{
                null
            }
        }
    }

    render(){
        let {username, password} = this.state;
        console.log(this.state.otp)
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
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Entypo name='chevron-left' color='white' size={28} style={{ paddingLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:2.5, justifyContent: 'center', alignItems: 'center', paddingTop:80}} >
                    <Jari width={100} height={100} style={{marginBottom:-50}}/>
                    <Logo width={150} height={150} />
                </View>
                <View style={{flex:6.5,justifyContent:'space-between', flexDirection:'column', }}> 
                
                <View style={{alignItems: 'flex-start',}}>
                    <View style={{width:'75%', paddingLeft:25}}>
                            <Text style={{fontSize:22, fontWeight:'bold',color:'white', marginBottom:15}}>Kode Verifikasi  telah  dikirim!</Text>
                        <Text style={{textAlign:'justify'}}>
                            <Text style={{fontSize:14,color:'white'}}>Masukan kode yang kami kirim ke email anda yang terdaftar <Text style={{fontWeight:'bold'}}>rahmat.gumiller@gmail.com</Text></Text>
                        </Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems: 'center' ,padding:25,}}>
                        <View style={{width:30, height:30, marginRight:20, backgroundColor:this.state.circle1? '#4caf50' :'white', borderRadius:15}} />
                        <View style={{width:30, height:30, marginRight:20, backgroundColor:this.state.circle2? '#4caf50':'white', borderRadius:15}} />
                        <View style={{width:30, height:30, marginRight:20, backgroundColor:this.state.circle3? '#4caf50':'white', borderRadius:15}} />
                        <View style={{width:30, height:30, marginRight:20, backgroundColor:this.state.circle4? '#4caf50':'white', borderRadius:15}} />
                        <Text style={{color:'white'}} onPress={()=> console.log("Hi")}>Kirim Lagi ?</Text>
                    </View>
                </View>
                    <View><View style={{ marginTop: 9 }}>

                        <LinearGradient
                            colors={['black', 'transparent']}
                            style={{ width: '100%', height: '50%', position: 'absolute', top: 0 }}
                        />
                        <LinearGradient

                            colors={['transparent', 'black']}
                            style={{ width: '100%', height: '50%', position: 'absolute', bottom: 0 }}
                        />
                        <LinearGradient
                            start={[0, 0]}
                            end={[1, 0]}
                            colors={['black', 'transparent']}
                            style={{ width: '50%', height: '100%', position: 'absolute', left: 0 }}
                        />
                        <LinearGradient
                            start={[0, 0]} end={[1, 0]}
                            colors={['transparent', 'black']}
                            style={{ width: '50%', height: '100%', position: 'absolute', right: 0 }}
                        />

                        <View style={styles.rowKey}>
                        
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(7)}
                            >
                                <Text style={styles.textButton}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(8)}
                            >
                                <Text style={styles.textButton}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(9)}
                            >
                                <Text style={styles.textButton}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowKey}>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(4)}
                            >
                                <Text style={styles.textButton}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(5)}
                            >
                                <Text style={styles.textButton}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(6)}
                            >
                                <Text style={styles.textButton}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowKey}>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(1)}
                            >
                                <Text style={styles.textButton}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(2)}
                            >
                                <Text style={styles.textButton}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(3)}
                            >
                                <Text style={styles.textButton}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowKey}>
                            <TouchableOpacity style={styles.button} 
                            onPress={() => this.handleButtonPress(0)}
                            >
                                <Text style={styles.textButton}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("ResetPassword")}>
                                <View style={{width:30, 
                                    height:30, 
                                    backgroundColor:'#4caf50', 
                                    borderRadius:15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}>
                                    <Ionicons  name="md-checkmark" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=> this.handleDeleteButtonPress()}>
                                <MaterialIcons name='backspace' size={24} color='white' />
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        color: 'white',
        width: 118,
        height: 60,
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowKey: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24
    }
})
