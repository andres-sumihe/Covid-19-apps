import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';

export default class ButtonControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.buttonSave}>
            <Text style={{ color: 'white' }}>Simpan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main:{
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems:'center',
        padding: 10,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    buttonSave: {
        // to,
        alignSelf: 'center',
        width: '70%',
        height: 40,
        backgroundColor: 'green',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        // marginTop:-40
    },
    buttonDelete: {
        // to,
        alignSelf: 'center',
        width: '30%',
        height: 40,
        backgroundColor: '#d5322e',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        // marginTop:-40
    },
})

