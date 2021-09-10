import React, { useEffect, useState, } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ImageBackground,
    StatusBar, 
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
//import { enCA, es, ptBR } from 'date-fns/locale';
//import DailyCard from '../components/DailyCard';
import { CategoriesData } from '../components/CategoriesData';

//import Toolbar from '../components/Toolbar';
//import { WebView } from 'react-native-webview';

export default function HomeScreen({navigation}) {
    useEffect(() => {
        StatusBar.setHidden(true);
      }, [])
    return (
        
        <ScrollView style={styles.content}>
                
                <Text style={styles.categoryTitle}>Categories</Text>
                <View style={styles.catContainer} >
            {CategoriesData.map(category => {
                return (
                    <TouchableOpacity 
                    onPress={()=> {navigation.navigate('Details',{
                        category: category.name,
                    },)}}
                    activeOpacity={0.6} 
                    key={category.id} 
                    style={[styles.list, styles.overlay]}>
                        <ImageBackground 
                        style={styles.background} 
                        source={category.background} 
                        imageStyle={{ opacity: 0.6 }}>

                            <Text style={styles.title}>{category.title}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )

            })}
        </View>
        </ScrollView>
                
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: colors.background,
        padding: 10,
        flex: 1,
    },
    catContainer: {
        marginBottom: 30,
    },
    background: {
       width: '100%',
       height: '100%',
    },
     
    title: {
        marginTop: 20,
        fontSize: 36,
        fontFamily: fonts.title,
        color: colors.white,
    },
    categoryTitle: {
        marginTop: 20,
        fontSize: 30,
        fontFamily: fonts.title,
        color: colors.accent,
    },
    list: {
        flex: 1,
        borderRadius: 8,
        marginTop: 20,
        overflow: 'hidden',
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.title,
        color: colors.white,

    },
    background: {
        padding: 20,
        height: 70,
    },
    overlay: {
        backgroundColor: colors.opacityBlack,
    },
})
