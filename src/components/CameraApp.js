import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default class CameraApp extends React.Component {
  constructor(props){
    super(props);
    this.state ={
        ratio:undefined,
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
      }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
    this.getPermissionAsync()
    this.getCameraRatio()
    // const {SupportRatio} = await getSupportedRatioAsync();
    // this.setState({ratio: SupportRatio})
  }
  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  }

   getCameraRatio = async () => {
    const ratios = await this.camera.getSupportedRatiosAsync()
 
    this.setState({
        ratio: ratios[ratios.length - 1]
    })
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }
  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  }
  
  
  render(){
    console.log(this.state.ratio)
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType}
                  ref={ref => {
                    this.camera = ref;
                  }}
                  ratio={this.state.ratio}
            >
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
              <TouchableOpacity
                onPress={()=> this.pickImage()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',                  
                }}>
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> this.takePicture()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> this.handleCameraType()}
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
            </Camera>
        </View>
      );
    }
  }
  
}

