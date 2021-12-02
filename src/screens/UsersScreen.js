import React, {
    useEffect,
    useMemo,
    useState,
    useCallback,
    memo
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    FlatList,
    ImageBackground,
    ActivityIndicator,
    RefreshControl,
    Platform,
    ToastAndroid,
    TextInput,
    
} from 'react-native';
// import ActionButton from '../components/ActionButton';
import Toast from 'react-native-toast-message';
import BannerAd from '../components/ads/BannerAd';
import colors from '../constants/colors';
import { useDataContext } from '../hooks/useDataContext';
// import { UsersData } from '../components/UsersData';
import { api } from '../services/api';
// import { api } from '../services/api';
import fonts from '../constants/fonts';
import { Entypo, AntDesign } from '@expo/vector-icons';
import {
    AdMobRewarded,
    setTestDeviceIDAsync
} from "expo-ads-admob";
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}




function UsersScreen({ route, navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { category } = route.params;
    const { loading, setLoading } = useDataContext();

    const [adLoading, setAdLoading] = useState(false);
    // const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [creators, setCreators] = useState([]);
    const [searchableCreators, setSearchchableCreators] = useState([])

    // ADS
    // IOS

    useEffect(() => {
        setTestDeviceIDAsync('EMULATOR');
    }, [])

    // SEARCH
     useEffect(() => {
        setSearchchableCreators(
            creators.filter(creator => {
                return creator.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [creators, search]) 
    
   

    // MODAL
   /*  const handleModalVisibility = () => {
        setModalVisible(true)
    } */


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

      useEffect(() => {
        setLoading(true);
        api.get('/creators/all')
        .then(res => {
            setCreators(res.data); 
        })
        .catch(err => console.log(err.response))
        .finally(() => {
            setLoading(false);

        })
    }, []); 


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { setRefreshing(false) });
    }, []);

    const showIosToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Please wait',
            text2: 'Gallery will be openned after a video.'
         })
    }

    const filteredUsers = searchableCreators.filter(user => user.category === category);
    const renderItem = ({ item }) => {
        return (
            <>
           
            <View style={styles.listContainer} >
               
                <View style={styles.imgContainer} >
                    <ImageBackground style={styles.picture} source={{ uri: item.picture }} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={5} style={styles.bio}>{item.bio}</Text>
                    <Button title="View Gallery" 
                    style={styles.button} 
                    onPress={ async () => {

                    // IOS
                    const prodRewardedIos = item.iosUnit;
                    const testRewardedIos = 'ca-app-pub-3940256099942544/1712485313';

                    // ANDROID 
                    const prodRewardedAndr = item.adUnit;
                    const testRewardedAndr = 'ca-app-pub-3940256099942544/5224354917';

                    const RewardedUnit = Platform.select({
                        ios: Constants.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
                        android: Constants.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
                    })

                    setAdLoading(true);
                   await AdMobRewarded.setAdUnitID(RewardedUnit)
                   await  AdMobRewarded.requestAdAsync().then(() => {
                          AdMobRewarded.showAdAsync()
                            .catch((err) => console.log(err))
                    });
                    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
                        setAdLoading(false);
                         navigation.navigate('WebScreen', {
                            category: item.category,
                            creatorId: item._id,
                        }); 
                    });
                    AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => {
                        setAdLoading(false);
                    });

                    AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => {
                        setAdLoading(false);
                    });

                    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
                        setAdLoading(false);
                    });
                    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => {
                        setAdLoading(false);
                    })

                    AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
                        setAdLoading(false);
                    });
                        
                    }}>
                       
                        <Entypo name="eye" size={24} color={colors.white} />
                           
                       
                    </Button>

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
                            onPress={ }>
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
            </Modal> */}
                </View>
                 
            </View>
            </>

        )
    }

    return useMemo(() => {
        return (
            <>
            <View style={styles.container}>
            <View style={styles.searchContainer}>
            <Feather  name="search" size={24} color="rgba(224, 224, 224, 0.5)" />
                <TextInput 
                placeholder="Search creator..."
                placeholderTextColor="rgba(224, 224, 224, 0.5)" 
                value={search} 
                onChangeText={input => setSearch(input)} style={styles.search} />
            </View>
                
                {loading ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={colors.white} />
                    </View> :

                    filteredUsers.length <= 0 ?
                    <View >
                        <Text style={styles.errorSearch}>No Results found for "{search}".</Text>
                    </View> 
                    :
                    <FlatList
                        keyExtractor={item => item._id}
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
                     {!adLoading ? null 
                     : Platform.OS === 'ios' ?
                     null
                     :
                     ToastAndroid.show('Please Wait while gallery is opening...', ToastAndroid.SHORT)}

                 

                <BannerAd />
                  

            </View>
            </>
            


        )
    }, [filteredUsers])
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        width: "100%",
        height: '100%',
        justifyContent: 'space-between',

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
        flexDirection: 'column',
    },
    picture: {
        borderRadius: 40,
        overflow: 'hidden',
        width: 80,
        height: 80,
        backgroundColor: colors.opacityWhite,
    },
    name: {
        color: colors.white,
        fontFamily: fonts.title,
        fontSize: 18,
    },
    bio: {
        flex: 1,
        padding: 6,
        flexWrap: 'wrap',
        color: 'rgba(224, 224, 224, 0.5)',
        fontFamily: fonts.text,
        fontSize: 15,
        width: 280,
        flexShrink: 1,

    },
    button: {
        padding: 16,
        borderRadius: 20,
        backgroundColor: Platform.OS === 'ios' ? 'white' : colors.accent,
        color: colors.white,
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
    /* centeredView: {
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
    }, */
    // END of MODAL
    searchContainer: {
        padding: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.opacityWhite,
        width: '90%',
        borderRadius: 8,
        alignSelf: 'center',
        
    },
    search: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: fonts.text,
        color: 'rgba(224, 224, 224, 0.5)',
    },
    errorSearch: {
        color: colors.accent,
        fontSize: 18,
        fontFamily: fonts.text,
        alignSelf: 'center'
    }






});

export default memo(UsersScreen);