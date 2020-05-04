import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import ImageView from '../components/ImageView';
import Grid from 'react-native-grid-component';
import images from '../helpers/ImagesImporter';
import ImageZoomViewer from '../components/ImageZoomViewer';
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from '../components/ImgPicker';


class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.showImgBig = this.showImgBig.bind(this);
  }

  state = {
    modalVisible: false,
    imageIndex: 0,
    imgPickerVisible: false,
    imageList: images,
    showEmptyMsg: false
  }

  showImgBig =(i)=>{
    this.setState({
      modalVisible: true,
      imageIndex: i
    })
  }

  setImgIndex = (index) =>{
    this.setState({
      imageIndex: index
    })
  }

  increaseImgIndex = () =>{
    if(this.state.imageIndex < this.state.imageList.length-1){
      this.setState({
        imageIndex: this.state.imageIndex + 1
      })
    }
  }

  decreaseImgIndex = () =>{
    if(this.state.imageIndex > 0){
      this.setState({
        imageIndex: this.state.imageIndex - 1
      })
    }
  }

  hideImgBig = () =>{
    this.setState({modalVisible: false})
  }

  _renderItem = (data, i) => (
    <TouchableOpacity
      onPress={() => this.showImgBig(i)}  
    >
      <ImageView func={this.showImgBig} img={data.props.source} key={i}/>
    </TouchableOpacity>
  );
 
  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  setImgPickerVisible = () =>{
    this.setState({imgPickerVisible: true})
  }

  hideImgPicker = () =>{
    this.setState({imgPickerVisible: false})
  }

  addImage = (newImgSrc) =>{
    this.setState({
       imageList: [...this.state.imageList,
        {
          url:  newImgSrc ,
          props: {
              source: { uri: newImgSrc }
        }
      } 
    ],
    showEmptyMsg: false
  })
  }

  removeImg = () => {
      let array = [...this.state.imageList]
      array.splice(this.state.imageIndex, 1)
      this.setState({imageList: array})
  }

  deleteAll = () => {
    this.setState({
      imageList: [],
      showEmptyMsg: true
    })
  }
 
  render(){
    console.log(this.state.imageList)
    const {modalVisible, imageIndex, imgPickerVisible, imageList, showEmptyMsg} = this.state
    return(
     <>
      <Button 
        title="ADD"
        onPress={this.setImgPickerVisible}
      />
      <Button 
        title="DELETE ALL"
        onPress={this.deleteAll}
      />
      {imgPickerVisible &&
        <ImagePicker 
          hideImgPicker = {this.hideImgPicker}
          addImage = {this.addImage}
        />
      }
      {modalVisible && 
          <ImageZoomViewer 
            img = {imageList}
            hideFunc = {this.hideImgBig}
            imageIndex = {imageIndex}
            setImgIndex = {this.setImgIndex}
            increaseImgIndex = {this.increaseImgIndex}
            decreaseImgIndex = {this.decreaseImgIndex}
            removeImg = {this.removeImg}
          />
      }
      {showEmptyMsg  &&
        <Text>{'Your Gallery is empty'}</Text>
      }
      <Grid
          style={styles.list}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data = {imageList} 
          numColumns={2}
      />
     </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
  }
});

export default HomeScreen;
