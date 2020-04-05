import React from 'react'
import { View, Modal, StyleSheet, Button, BackHandler } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

const ImageZoomViewer = props => {
   
    return(
            <Modal 
                viisble={true}  
                animationType="slide"
            >   
                <View style={styles.wrapper1}>
                    <ImageViewer
                        imageUrls={props.img}
                        index={props.imageIndex}
                        onCancel={props.hideFunc}   
                        enableSwipeDown 
                        onChange={props.setImgIndex} 
                        style={styles.imgViewer}
                    />
                </View>
                 <View style={styles.wrapper2}>
                    <Button 
                        title="PREV"
                        onPress={props.decreaseImgIndex}
                    />        
                    <Button
                        onPress={props.hideFunc}
                        title="X"
                    />
                   <Button 
                        title="NEXT"
                        onPress={props.increaseImgIndex}
                    />
                 </View>
               
            </Modal>
    ); 
};

const styles = StyleSheet.create({
    imgViewer: {
        color: 'red'
    },
    wrapper1: {
        flex: 9,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapper2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    },
});

export default ImageZoomViewer;