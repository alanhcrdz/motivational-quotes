import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    FlatList,
    BackHandler,
    Alert,
    
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
//import { enCA, es, ptBR } from 'date-fns/locale';
//import DailyCard from '../components/DailyCard';
import { CategoriesData } from '../components/CategoriesData';
import { useIsFocused } from '@react-navigation/native';

//import Toolbar from '../components/Toolbar';



export default function HomeScreen({ navigation }) {

    const isFocused = useIsFocused();
    useEffect(() => {
        StatusBar.setHidden(true);
        if (isFocused) {
            const backAction = () => {
                Alert.alert('Leaving Already?', 'Are you sure you want to exit app?', [
                    {
                      text: 'Cancel',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    { text: 'Exit App', onPress: () => BackHandler.exitApp() },
                ]);
                  return true;
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction) ;
            return () => backHandler.remove(); 
        };
    }, []);
  



    const DATA = CategoriesData;

    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(item.navigate, {
                            category: item.category,
                            name: item.label,
                        })
                    }}
                    activeOpacity={0.6}
                    key={item.id}
                    style={[styles.list, styles.overlay]}>
                    <ImageBackground
                        style={styles.background}
                        source={item.background}
                        imageStyle={{ opacity: 0.6 }}>

                        <Text style={styles.title}>{item.title}</Text>
                        {item.label === 'Love' || item.label === 'Success' ?
                        <View style={styles.subtitleWrapper}>
                            <Text style={styles.subtitle}>Creators's gallery</Text>
                        </View>    
                    :
                    null
                    }
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }
    return (

        <View style={styles.content}>
            <View style={styles.catContainer} >
                <Text style={styles.text}>Explore</Text>
                <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={DATA}
                numColumns={1}
                renderItem={renderItem}

                 // for better performance (if needed, install recyclerlistview)
                 initialNumToRender={5}
                 maxToRenderPerBatch={10}
                 windowSize={10}
                 removeClippedSubviews={true}
                 updateCellsBatchingPeriod={100}
            />
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.background,
        padding: 10,
    },
    catContainer: {
        marginBottom: 80,
        
    },
    background: {
        width: '100%',
        height: '100%',
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.title,
        color: colors.white,
    },
    text: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.primary,
        textTransform: 'uppercase',
        marginTop: 15,
    },
    categoryTitle: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: fonts.title,
        color: colors.primary,
    },
    list: {
        flex: 1,
        borderRadius: 8,
        marginTop: 20,
        overflow: 'hidden',

    },

    background: {
        padding: 20,
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    overlay: {
        // height: 160,
        backgroundColor: colors.opacityBlack,
    },
    subtitleWrapper: {
        padding: 8,
        backgroundColor: colors.accent,
        borderRadius: 20,
        marginTop: 20,
    },
    subtitle: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.text,
    }
})
