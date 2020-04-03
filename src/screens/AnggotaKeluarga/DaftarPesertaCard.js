import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { robotoWeights } from 'react-native-typography';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {Surface} from 'react-native-paper';
import {SimpleLineIcons} from '@expo/vector-icons';

export default class DaftarPesertaCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'black',
        }
    }
    
    render(){
        return(
            <View>
                <Surface style={{
                    flexDirection:'row',
                    justifyContent:'space-between', 
                    width:wp('100%'),
                    height:hp('12%'),
                    borderBottomWidth:1,
                    borderBottomColor:"#eee",
                    overflow:'hidden'}}>                    
                    <View style={{flex:2.5, justifyContent:'center', alignItems:'center'}}>
                        <View style={{width:60, height:60, borderColor:'#d5322e', borderWidth:1, borderRadius:100, padding:2, alignItems: "center", justifyContent:"center"}}>
                            <View style={{width:'100%', height:'100%', backgroundColor:'green', borderRadius:100}}></View>
                        </View>
                    </View>
                    <View style={{flex:6, justifyContent:'center', alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={{fontSize:18}}>{this.props.name}</Text>
                        <Text>{this.props.division}</Text>
                    </View>
                </Surface>
            </View>
        )
    }
}
DaftarPesertaCard.propTypes = {
    nama: PropTypes.string,
    nomdivisionorMember: PropTypes.string,
  }