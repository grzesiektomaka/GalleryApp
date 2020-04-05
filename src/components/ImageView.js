import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'


const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const ImageView = props => {
    return(
        <View style={styles.ImgView}>
                <Image 
                    source={props.img}
                    resizeMode = "cover"
                    style={styles.img}
                />
        </View>
    ); 
};

const styles = StyleSheet.create({
    img: {
        width: SCREEN_WIDTH/2 - 4,
        height: SCREEN_WIDTH/2 - 4,
        borderRadius: 5
    },
    ImgView: {
        padding: 2
    }
});

export default ImageView;