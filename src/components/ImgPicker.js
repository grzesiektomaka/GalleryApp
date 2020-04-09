import React, { Component } from "react";
import { StyleSheet, Alert, Dimensions, View, Modal, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


class ImgPicker extends Component {
 
 constructor(props) {
  super(props);
  this.state = {
   hasCameraPermission: null,
   image: null
  }
 }
async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  this.setState({ hasCameraPermission: status === "granted" });
 }

 _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3]
    });
    if (!result.cancelled) {
     this.setState({ image: result.uri });
    }
   }

  addImgAndClear = () =>{
    this.props.addImage(this.state.image)
    this.setState({image: null})
    Alert.alert(
      'Image was added'
    )
  }

 render() {
    const { image, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
     return <View />
    }
    else if (hasCameraPermission === false) {
     return <Text>Access to camera has been denied.</Text>;
    }
    else {
     return (
        <Modal 
        viisble={true}  
        animationType="slide"
        > 
            <View style={{ flex: 1 }}>
            <View style={styles.activeImageContainer}>
                {image ? (
                <Image source={{ uri: image }} style={{ flex: 1 }} />
                ) : (
                <View />
                )}
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {image &&
                  <Button 
                    title="Add"
                    onPress={this.addImgAndClear}
                  />
                }
            <View style={styles.separator}/>
            <Button 
                onPress={this._getPhotoLibrary.bind(this)} 
                title="Go to the library"
            />
            <View style={styles.separator}/>
            <Button 
              title="Back to gallery"
              onPress={this.props.hideImgPicker}
            />
            </View>
            </View>
        </Modal>
     );
    }
   }
  }
  
  const styles = StyleSheet.create({
   activeImageContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff"
   },
   separator: {
    marginVertical: 8
   }
  });

export default ImgPicker;