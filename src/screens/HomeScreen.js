import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ImageView from '../components/ImageView';
import Grid from 'react-native-grid-component';
import images from '../helpers/ImagesImporter';
import ImageZoomViewer from '../components/ImageZoomViewer';
import { TouchableOpacity } from "react-native-gesture-handler";


class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.showImgBig = this.showImgBig.bind(this);
  }

  state = {
    modalVisible: false,
    imageIndex: 0,
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
    if(this.state.imageIndex < images.length-1){
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
 
  render(){
    const {modalVisible, imageIndex} = this.state
    return(
     <>
      {modalVisible && 
          <ImageZoomViewer 
            img={images}
            hideFunc={this.hideImgBig}
            imageIndex={imageIndex}
            setImgIndex={this.setImgIndex}
            increaseImgIndex={this.increaseImgIndex}
            decreaseImgIndex={this.decreaseImgIndex}
          />
      }
      <Grid
          style={styles.list}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data = {images} 
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
