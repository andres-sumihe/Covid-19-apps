import React, { Component } from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { robotoWeights } from 'react-native-typography';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {Surface} from 'react-native-paper';
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';
import { normalize } from '../../components/ResponsiveFontSize';

export default class TambahCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'black',
            options: this.props.options
        }
    }
    render(){
        return(
            <View>
                <Surface style={{
                    flexDirection:'row',
                    justifyContent:'space-between', 
                    alignItems: 'center',
                    width:wp('100%'),
                    height:hp('8%'),
                    borderBottomWidth:1,
                    borderBottomColor:"#eee",
                    overflow:'hidden'}}>                    
                    <View style={{flex:6, justifyContent:'center', alignItems:'flex-start', justifyContent:'center', paddingLeft:15}}>
                        <Text style={{fontSize:normalize(15), fontWeight:'700'}}>{this.props.name}</Text>
                        <Text style={{fontSize:normalize(15)}}>{this.props.noKK}</Text>
                    </View>
                    <View style={{flex:1.5, justifyContent:'center', alignItems:'center', justifyContent:'center'}}>
                        {this.state.options == true? 
                           <TouchableOpacity onPress={this.props.press}>
                               <SimpleLineIcons name="options-vertical" size={24} />
                           </TouchableOpacity>
                        :null}
                    </View>
                </Surface>
            </View>
        )
    }
}
TambahCard.propTypes = {
    nama: PropTypes.string,
    nomdivisionorMember: PropTypes.string,
  }