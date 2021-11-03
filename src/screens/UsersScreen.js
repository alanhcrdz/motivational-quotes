import React, { useEffect, 
    useMemo, 
    useState, 
    useCallback, 
    memo } from 'react';
import { 
     View,
     Text,
     StyleSheet, 
     TouchableOpacity, 
     FlatList, 
     ImageBackground, 
     ActivityIndicator,
     RefreshControl,
     Modal,
     TouchableHighlight,
     Platform,
    } from 'react-native';
// import ActionButton from '../components/ActionButton';
import BannerAd from '../components/ads/BannerAd';
import colors from '../constants/colors';
import { useDataContext } from '../hooks/useDataContext';
import { UsersData } from '../components/UsersData';
// import { api } from '../services/api';
import fonts from '../constants/fonts';
import { Entypo, AntDesign  } from '@expo/vector-icons'; 
import {
    AdMobRewarded,
    setTestDeviceIDAsync
} from "expo-ads-admob";
import Constants from 'expo-constants';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


  

function UsersScreen({ route, navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { category, name } = route.params;
    const { loading, setLoading, quotes, setQuotes } = useDataContext();

    const [adLoading, setAdLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // ADS
     // IOS

useEffect(() => {
    setTestDeviceIDAsync('EMULATOR');
  },[])

/*   function showRewarded() {
    setAdLoading(true);
    AdMobRewarded.setAdUnitID(RewardedUnit)
    AdMobRewarded.requestAdAsync().then(() => {
        AdMobRewarded.showAdAsync()
            .catch((err) => console.log(err))
    });
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
        setModalVisible(false);
        navigation.navigate('WebScreen', {
            category,
            creatorId,
        });
    });
    AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
        setAdLoading(false);
        console.log('Add is presented: ')
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


} */

 // MODAL
 const handleModalVisibility = () => {
    setModalVisible(true)
}

    
    /* useEffect(() => {
        setLoading(true);
        api.get('/quotes')
        .then(res => {
            setQuotes(res.data); 
        })
        .catch(err => console.log(err.response))
        .finally(() => {
            setLoading(false);

        })
    }, []); */

        
const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {setRefreshing(false)});
},[]);
    
        const filteredUsers = UsersData.filter(user => user.category === category); 
        const renderItem = ({ item }) => {
        return (
            
            <View style={styles.listContainer} >
                <View style={styles.imgContainer} >
                <ImageBackground style={styles.picture} source={ item.picture} />
                </View>

                <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity style={styles.button} onPress ={() => {
                         const prodRewardedIos = '';
                         const testRewardedIos = 'ca-app-pub-3940256099942544/1712485313';
                        
                        // ANDROID 
                         const prodRewardedAndr = item.adUnit;
                         const testRewardedAndr = 'ca-app-pub-3940256099942544/5224354917';
                        
                        const RewardedUnit = Platform.select({
                            ios: Constants.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
                            android: Constants.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
                        }) 
                        

                    setAdLoading(true);
                    AdMobRewarded.setAdUnitID(RewardedUnit)
                    AdMobRewarded.requestAdAsync().then(() => {
                        AdMobRewarded.showAdAsync()
                            .catch((err) => console.log(err))
                    });
                    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
                        setModalVisible(false);
                        navigation.navigate('WebScreen', {
                            category: item.category,
                            creatorId: item.creatorId,
                        });
                    });
                    AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
                        setAdLoading(false);
                        console.log('Add is presented: ')
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
                }}>
                    <Entypo name="eye" size={24} color={colors.white} />
                    <Text style={styles.action}>View pictures</Text>
                </TouchableOpacity>
                </View>
            </View>
            


        )
    }

  return useMemo(() => {
    return (
        <View style={styles.container}>
          
            
            {loading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.white} /> 
            </View> :
            <FlatList
                keyExtractor={item => item.id}
                data={filteredUsers}
                numColumns={1}
                renderItem={renderItem}

                // for better performance (see more at: https://reactnative.dev/docs/optimizing-flatlist-configuration)
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={21}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={100}
                // reresh control
                refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                
            
            />} 
            
                <BannerAd />
                {/* MODAL FOR LOADING AD */}
                {/* <Modal
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
                        <Text style={styles.modalText}>Watch a Video to Unlock Pictures!</Text>

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
                        <Text style={styles.callback}>{adLoading ? '😊 Please Watch the video until the end to access the content.' : ''}</Text>
                       
                    </View>
                </View>
            </Modal>  */}
            
        </View>
    
        
    )
  }, [filteredUsers])
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        width: "100%",
        height: '100%',
    },
    loadingContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        padding: 6,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40,
        backgroundColor: colors.opacityWhite,
    },
    listContainer: {
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        flexDirection: 'row',
        
    },
    imgContainer: {
    },
    textContainer: {
        padding: 16,
    },
    picture: {
        borderRadius: 40,
        overflow: 'hidden',
        width: 80,
        height: 80,
        backgroundColor: colors.opacityWhite,
    },
    name:{
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 18,
    },
    button: {
        padding: 16,
        borderRadius: 20,
        backgroundColor: colors.accent,
        width: 150,
        height: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    action: {
        color: colors.white,
        fontFamily: fonts.text,
    },
    // MODAL STYLE
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.action,
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
        backgroundColor: colors.accent,
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

    
   
   
    

});

export default memo(UsersScreen);