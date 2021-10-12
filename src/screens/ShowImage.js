import React, { useRef, useState, useEffect, useMemo } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Modal, 
    TouchableHighlight,
    ActivityIndicator,
    Platform,


} from 'react-native';
import {
    AdMobRewarded,
    setTestDeviceIDAsync
} from "expo-ads-admob";

//share and download images feature
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { AntDesign, Entypo, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Notifier, Easing } from 'react-native-notifier';
import fonts from '../constants/fonts';
import Constants from 'expo-constants';




// IOS
// const prodRewardedIos = 'ca-app-pub-3940256099942544/1712485313';
// const testRewardedIos = 'ca-app-pub-3940256099942544/1712485313';

// ANDROID 
// const prodRewardedAndr = 'ca-app-pub-3940256099942544/5224354917';
// const testRewardedAndr = 'ca-app-pub-3940256099942544/5224354917';

function ShowImage({ route, navigation }) {

    const { picture, category, name } = route.params;

    const [iconShow, setIconShow] = useState('none');

    const fadeAnim = useRef(new Animated.Value(0)).current;


    // STATES
    const [adLoading, setAdLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // ADS
   /*  const adUnit = Platform.select({
        ios: Constants.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
        android: Constants.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
    }) */

  

        
function showRewarded() {
    setAdLoading(true);
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')
    AdMobRewarded.requestAdAsync().then(() => {
        AdMobRewarded.showAdAsync()
            .catch((err) => console.log(err))
    });
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
        setModalVisible(false);
        navigation.navigate('WebScreen', {
            category,
        });
    });
    AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
        setAdLoading(false);
        console.log('Add is presented')
    });

    AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => {
        setAdLoading(false);
        console.log('Add failed to present')
    });

    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
        setAdLoading(false)
        console.log('Add loaded!')
    });
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => {
        setAdLoading(false);
        console.log('Add not loaded')
    })

    AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
        setModalVisible(false);
        setAdLoading(false);
    });


}
/*  useEffect(() => {
    let { isMounted } = true;
    setTestDeviceIDAsync('EMULATOR');
    if(isMounted)
    showRewarded();
    
    return () => { isMounted = false }
    
},[])  */

    // MODAL
    const handleModalVisibility = () => {
        setModalVisible(true)
    }

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
        const uri = picture;
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

            } catch (err) {
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
    /* const showNotifier = () => {
        Notifier.showNotification({
            title: 'Added to Favorites',
            description: 'Your quote now is on favorite list!',
            duration: 3000,
            showAnimationDuration: 800,
            showEasing: Easing.ease,
            hideOnPress: false,
            queueMode: 'immediate',
            
        })
    } */

    // Capitalize
    

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
                            <Text style={[styles.iconText, { display: iconShow }]}>Back</Text>
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
                            <Text style={[styles.iconText, { display: iconShow }]}>Download</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onShare}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <Feather
                                style={{ margin: 20 }}
                                name="share"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.iconText, { display: iconShow }]}>Share</Text>
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
                <Animated.View style={[styles.ctaContainer, { opacity: fadeAnim, display: iconShow }]}>
                    <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.4} 
                    onPress={handleModalVisibility}>
                        <AntDesign
                            name="lock"
                            size={22}
                            color={colors.white} />
                        <View style={styles.label}>
                            <Text style={styles.labelText}> More {name} Quotes! </Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* MODAL FOR LOADING AD */}
                <Modal
                animationType='slide'
                visible={modalVisible}
                transparent
                
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity 
                        style={styles.close}
                        onPress={() => {setModalVisible(!modalVisible)}}>

                        <AntDesign 
                        name="closecircleo" 
                        size={24} 
                        color="white" />

                        </TouchableOpacity>
                        <Text style={styles.modalText}>Watch a Video to Unlock Private Content!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton}}
                            onPress={showRewarded }>
                                <View>
                                    { adLoading ? 
                                    <ActivityIndicator 
                                        size={20} 
                                        color={colors.white} /> : 
                                    <Text 
                                        style={styles.textStyle}>
                                        Watch Video
                                    </Text> }
                                </View>
                        </TouchableHighlight>
                        <Text style={styles.callback}>{adLoading ? 'Loading Video...' : ''}</Text>
                        <Text style={styles.callback}>{adLoading ? '😊 Please Watch the video until the end to access content.' : ''}</Text>
                       
                    </View>
                </View>
            </Modal>

            
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
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
        textTransform: 'uppercase',
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
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
        // MODAL STYLE
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 20,
            backgroundColor: colors.background,
            borderRadius: 20,
            padding: 35,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        openButton: {
            borderRadius: 8,
            padding: 16,
            elevation: 2,
            width: 250,
            backgroundColor: colors.action,
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            textTransform: 'uppercase',
            color: colors.white,
        },
        close: {
            marginBottom: 10,
        },
        callback: {
            marginTop: 6,
            textAlign: 'center', 
            fontFamily: fonts.text,
            color: colors.white,
        }
    
})

export default ShowImage;
