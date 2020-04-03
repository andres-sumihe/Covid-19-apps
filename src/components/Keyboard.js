import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { MaterialIcons,Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient'

export default class Keyboard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ marginTop: 9 }}>

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
                    // onPress={() => this.props.onButtonPress(7)}
                    >
                        <Text style={styles.textButton}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(8)}
                    >
                        <Text style={styles.textButton}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(9)}
                    >
                        <Text style={styles.textButton}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowKey}>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(4)}
                    >
                        <Text style={styles.textButton}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(5)}
                    >
                        <Text style={styles.textButton}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(6)}
                    >
                        <Text style={styles.textButton}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowKey}>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(1)}
                    >
                        <Text style={styles.textButton}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(2)}
                    >
                        <Text style={styles.textButton}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(3)}
                    >
                        <Text style={styles.textButton}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowKey}>
                    <TouchableOpacity style={styles.button} 
                    // onPress={() => this.props.onButtonPress(0)}
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
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name='backspace' size={24} color='white' />
                    </TouchableOpacity>
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
