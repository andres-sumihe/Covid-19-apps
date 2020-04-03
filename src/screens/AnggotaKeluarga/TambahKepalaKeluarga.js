import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native';
import { Entypo, Feather, AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import { SearchBar } from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Surface } from 'react-native-paper'
import TambahCard from './TambahCard';

export default class TambahKepalaKeluarga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      filter: 'Semua',
      showHeader: true,
      data: [
        {
          id:"1",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        {
          id:"2",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        {
          id:"3",
          name:"Dewi Kinasih",
          noKK:"3209302307890007",
        },
        
      ],
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection:"column", paddingTop: StatusBar.currentHeight }}>
        <View style={{height: StatusBar.currentHeight, width: '100%', position: "absolute", backgroundColor: '#0288d1'}} />
          <View style={{flex:1, height: 50, width: "100%", flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Entypo name='chevron-left' color='#0288d1' size={28} style={{ paddingLeft: 10 }} />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 10, fontSize: 22, color: "#0288d1", fontWeight: '500' }}>{'Pilih Kepala Keluarga'}</Text>
          </View>
        <View style={{ height: hp('1%') }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'white']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: hp('1%'),
            }}
          />
        </View>
        <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}>
          <SearchBar
            // onChangeText={this.handleSearch, search => {this.setState({ searchText: search }); }}
                            containerStyle={{
            width: '100%', backgroundColor: 'white', borderBottomColor: 'transparent',
            borderTopColor: 'transparent'
          }}
             inputContainerStyle={{ backgroundColor: 'transparent' }}
             placeholder="Cari .."
                            // value={this.state.searchText}
           />
          </View>
        
       
        <View style={{flex:9}}>

          <ScrollView style={{marginBottom:80}}>
            {this.state.data.map((item, index) => {
              return <SwipeRow rightOpenValue={-75} style={styles.standalone} key={item.id} >

                <View style={styles.standaloneRowBack}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center',width:40, height:'100%', }}>
                    <FontAwesome name='plus' size={24} color='white' />
                  </TouchableOpacity>
                </View>
                    <TambahCard  name={item.name} division={item.noKK} />
              </SwipeRow>
            })
            }

          </ScrollView>
          <View style={{ bottom:10, right:10,position: 'absolute', flexDirection:"row", alignItems: 'center',}}>
            <Surface style={{right:-10,height:30, width:80, paddingRight:10, justifyContent: 'center', alignItems: 'center', backgroundColor:'#ff9800', borderTopStartRadius:10, borderBottomStartRadius:10}}>
              <Text style={{fontSize:10, color:'white'}}>Tambah Baru</Text>
            </Surface>
            <Surface style={{ elevation:8,width:60,height:60, justifyContent:'center', alignItems: 'center', borderRadius:30,backgroundColor:'#4caf50'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("TambahPenduduk",{action:'Tambah'})}>
                  <FontAwesome name="plus" size={30} color="white"/>
              </TouchableOpacity>
            </Surface>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#493f3f',
    justifyContent: 'center',
    height:50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#4caf50',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#d4322e',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  },
});
