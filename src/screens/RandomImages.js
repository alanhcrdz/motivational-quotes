/*import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import colors from '../constants/colors';
import { AntDesign, Foundation, Entypo, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useDataContext } from '../hooks/useDataContext';
import { api } from '../services/api';
import { Notifier, Easing } from 'react-native-notifier';
 let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height; 

import Constants from 'expo-constants';
import fonts from '../constants/fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//share and download images feature
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


function RandomImages({ navigation }) {
    const { loading, setLoading } = useDataContext();
    const [randomImages, setRandomImages] = useState([]);
    const [iconShow, setIconShow] = useState('none');
    const fadeAnim = useRef(new Animated.Value(0)).current;


    function loadRandomImages() {
        setLoading(true);
        api.get('/quotes')
            .then((res) => {
                let data = res.data
                let randomNumber = Math.floor((Math.random() * data.length))
                let randomImage = data[randomNumber];
                setRandomImages(randomImage);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => { setLoading(false) });
    }

    useEffect(() => {
        loadRandomImages()
    }, []);

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
        const uri = randomImages.picture
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
                await MediaLibrary.createAlbumAsync("Global Motivate", asset, false)
                Notifier.showNotification({
                    title: 'Image Downloaded',
                    description: 'File has been saved on your pictures folder.',
                    duration: 3000,
                    showAnimationDuration: 800,
                    showEasing: Easing.ease,
                    hideOnPress: false,
                    queueMode: 'immediate',

                })

            } catch (err) {
                console.log("Save error: ", err)
            }
        }
    }
    // sharing
    const source = randomImages.picture;
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
        <View style={styles.container}>
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>

                :
               
                <TouchableWithoutFeedback style={{ display: 'none' }} onPress={toggleFade}>
                    <ImageBackground style={styles.image} source={{ uri: randomImages.picture }}>
                        <Animated.View style={[styles.iconsContainer, { opacity: fadeAnim }]}>
                            

                            <TouchableOpacity onPress={downloadFile}>
                                <View style={[styles.icon, { display: iconShow }]}>
                                    <Feather
                                        name="download"
                                        size={24} color={colors.white}

                                    />
                                </View>
                                <View style={styles.label}>
                                    <Text style={[styles.iconText, { display: iconShow }]}>Download</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onShare}>
                                <View style={[styles.icon, { display: iconShow }]}>
                                        <AntDesign
                                        style={{ margin: 20 }}
                                        name="instagram"
                                        size={24} color={colors.white}

                                    />
                                </View>
                                <View style={styles.label}>
                                    <Text style={[styles.iconText, { display: iconShow }]}>Share</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={loadRandomImages}>
                                <View style={[styles.icon, { display: iconShow }]}>
                                    <Foundation
                                        name="refresh"
                                        size={24} color={colors.white}

                                    />
                                </View>
                                <View style={styles.label}>
                                    <Text style={[styles.iconText, { display: iconShow }]}>Next</Text>
                                </View>
                            </TouchableOpacity>
                       
                        </Animated.View>

                             <Animated.View style={[styles.ctaContainer, { opacity: fadeAnim,  display: iconShow }]}>
                            <TouchableOpacity activeOpacity={0.4} onPress={showRewarded}>
                                
                                <View style={styles.label}>
                                    <Text style={styles.labelText}>Get Weekly Motivation Quotes! </Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View> 
                    </ImageBackground>
                 
                </TouchableWithoutFeedback>
                            

            }
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.background,
        },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.title,
        fontSize: 23,
        color: colors.primary,
    },
    image: {
        height: '100%',
        justifyContent: 'flex-end',
        
    },
    iconsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    ctaContainer: {
        width: '90%',
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: colors.action,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: colors.opacityBlack,

    },
    iconText: {
        color: colors.white,
        fontFamily: fonts.text,
    },
    label: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 18,
    },
    spinner: {
        marginTop: 40,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: colors.opacityWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default RandomImages;
 */
