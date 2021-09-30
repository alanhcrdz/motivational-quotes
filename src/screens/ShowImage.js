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

//share and download images feature
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { AntDesign, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Notifier, Easing } from 'react-native-notifier';

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

    

    // download
  

    const downloadFile = async () => {
        const uri = picture
        let fileUri = FileSystem.documentDirectory + 'quotes.png';
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            saveFile(uri)
        })
        .catch(error => {
            console.error(error);
          })

    }

    const saveFile = async (fileUri) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === "granted") {
            try {
                MediaLibrary.requestPermissionsAsync()
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                await MediaLibrary.createAlbumAsync("Talentiii Quotes", asset, false)
                Notifier.showNotification({
                    title: 'Image Downloaded',
                    description: 'File has been saved on your phone.',
                    duration: 3000,
                    showAnimationDuration: 800,
                    showEasing: Easing.ease,
                    hideOnPress: false,
                    queueMode: 'immediate',
                    
                })
               
            }catch(err) {
                console.log("Save error: ", err)
            }
        }
    }
    // sharing
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

    // after favorite
    const showNotifier = () => {
        Notifier.showNotification({
            title: 'Added to Favorites',
            description: 'Your quote now is on favorite list!',
            duration: 3000,
            showAnimationDuration: 800,
            showEasing: Easing.ease,
            hideOnPress: false,
            queueMode: 'immediate',
            
        })
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

                    <TouchableOpacity onPress={downloadFile}>
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


                        {/* FAVORITES FEATURE WILL BE ADDED LATER, AFTER STUDY MORE!!! */}

                    {/* <TouchableOpacity onPress={() => { }}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <MaterialIcons
                                style={{ margin: 20 }}
                                name="favorite-outline"
                                size={24} color={colors.white}
                                onPress={showNotifier}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.labelText, { display: iconShow }]}>Favorite</Text>
                        </View>
                    </TouchableOpacity> */}
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
