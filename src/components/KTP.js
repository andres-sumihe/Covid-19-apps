import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {FontAwesome} from '@expo/vector-icons'
import { Surface } from 'react-native-paper';
import { normalize } from './ResponsiveFontSize' 


export default class KTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={()=> this.props.navigation.navigate("TambahPenduduk",{action:"Edit"})}>
            {/* <View style={{position: 'absolute',}} >     */}
            <ImageBackground source={require('../../assets/kk.png')} style={{width:wp('85%'), height: 200, position: 'absolute',}} resizeMode="cover"/>

            {/* </View> */}
            
            <View style={styles.header}>
                <View style={styles.logo}>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>Kartu Keluarga</Text>
                    <Text style={styles.nomorKK}>32733201809150024</Text>
                </View>
                {/* <View style={styles.edit}>
                    <TouchableOpacity style={styles.pencil} onPress={()=> this.props.navigation.navigate("TambahKK", {action:"Edit"})}>
                        <FontAwesome name="pencil" size={14} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={{flex:2,
                paddingHorizontal:10,
                paddingTop:15,
                paddingBottom:15,
                justifyContent:'space-between',
                flexDirection:'row'}}>
                <View>
                    <Text style={{fontSize: normalize(14)}}>Kepala Keluarga</Text>
                    <Text style={{fontWeight: "700", fontSize: normalize(15)}}>Herman Gunawan B</Text>
                    <Text style={{fontSize: normalize(14)}}>32733201809150024</Text>
                </View>
                <View style={{}}>
                    <Text style={{alignSelf:'flex-end'}}>Kawin Tercatat</Text>
                    <Text style={{alignSelf:'flex-end', fontWeight: "700", fontSize: normalize(15)}}>Wiraswasta</Text>
                </View>
            </View>
            <View style={styles.data}>
                <View style={{flexDirection: 'row', flex:6.5}}>
                    <View style={{paddingRight:5}}>
                       
                        <Text style={{fontSize: normalize(9)}}>Provinsi</Text>
                        <Text style={{fontSize: normalize(9)}}>Kabupaten/Kota</Text>
                        <Text style={{fontSize: normalize(9)}}>Kecamatan</Text>
                        <Text style={{fontSize: normalize(9)}}>Desa/Kelurahan</Text>
                       
                    </View>
                    <View>
                        <Text style={{fontSize: normalize(9)}}>: JAWA BARAT</Text>
                        <Text style={{fontSize: normalize(9)}}>: KOTA BANDUNG</Text>
                        <Text style={{fontSize: normalize(9)}}>: Antepani</Text>
                        <Text style={{fontSize: normalize(9)}}>: Antapani Wetan</Text>

                    </View>
                </View>
                <View style={{flexDirection: 'row', flex:3.5}}>
                    <View style={{paddingRight:5}}>
                        <Text style={{fontSize: normalize(9)}}>Kode Pos</Text>
                        <Text style={{fontSize: normalize(9)}}>RT/RW</Text>
                        <Text style={{fontSize: normalize(9)}}>Alamat</Text>
                    </View>
                    <View style={{width:55}}>
                        <Text style={{fontSize: normalize(9)}}>: 40291</Text>
                        <Text style={{fontSize: normalize(9)}}>: 009/002</Text>
                        <Text style={{fontSize: normalize(9)}}>: Dusun 4</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:200,
        width: wp('85%'),
        borderRadius:10,
        padding: 10,
        marginBottom:20,
        overflow:'hidden'
    },
    header: {
        flex:3,
        flexDirection:'row'
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex:7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: normalize(15),
        color:'grey'
    },
    nomorKK: {
        fontSize: normalize(18),
        fontWeight:'bold'
    },
    edit: {
        flex:1
    },
    pencil: {
        position:'absolute', 
        top:0,
        right:0,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#ff9800',
        justifyContent: 'center',
        alignItems: 'center',
    },

    data: {
        flex:5,
        paddingHorizontal:10,
        marginTop:30,
        flexDirection:'row',
    }
})
