import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    FlatList,
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
//import { enCA, es, ptBR } from 'date-fns/locale';
//import DailyCard from '../components/DailyCard';
import { CategoriesData } from '../components/CategoriesData';

//import Toolbar from '../components/Toolbar';
//import { WebView } from 'react-native-webview';



export default function HomeScreen({ navigation }) {
    useEffect(() => {
        StatusBar.setHidden(true);
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
            />
            </View>
        </View>

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
        color: colors.accent,
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
})
