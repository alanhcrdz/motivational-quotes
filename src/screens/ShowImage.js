import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    
} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { AntDesign, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

function ShowImage({ route, navigation }) {
    const { picture } = route.params;

    const [iconShow, setIconShow] = useState('none');

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const toggleFade = () => {
        if (iconShow === 'none') {
            setIconShow('flex')
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start()
        } else {
            setIconShow('none')
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start()
        }
    }

    

    const source = picture;

    const onShare = () => {
        FileSystem.downloadAsync(
            source,
            FileSystem.documentDirectory + '.png'
        )
        .then(({ uri }) => {
            console.log('finished download to ' + uri);

            Sharing.shareAsync(uri)
        })
        .catch(error => {
            console.error(error); 
          });
    }


    return (
        <TouchableWithoutFeedback onPress={toggleFade}>
            <ImageBackground style={styles.image} source={{ uri: picture }}>
                <Animated.View style={[styles.iconsContainer, { opacity: fadeAnim }]}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => { navigation.goBack() }}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <AntDesign
                                style={{ margin: 20, }}
                                name="arrowleft"
                                size={24} color={colors.white}
                                onPress={() => { navigation.goBack() }}
                            />

                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.labelText, { display: iconShow }]}>Back</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <Feather 
                                style={{ margin: 20 }}
                                name="download"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.labelText, { display: iconShow }]}>Save</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onShare}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <Entypo
                                style={{ margin: 20 }}
                                name="share"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.labelText, { display: iconShow }]}>Share</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <MaterialIcons
                                style={{ margin: 20 }}
                                name="favorite"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.labelText, { display: iconShow }]}>Favorite</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    image: {
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'flex-end',
    },
    iconsContainer: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: colors.opacityBlack,

    },
    label: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: colors.white,
    }
})

export default ShowImage
