import React, { useEffect } from 'react';
import { 
     View,
     StyleSheet, 
     TouchableOpacity, 
     FlatList, 
     ImageBackground, 
     ActivityIndicator,
    } from 'react-native';
import ActionButton from '../components/ActionButton';
import BannerAd from '../components/ads/BannerAd';
import colors from '../constants/colors';
import { useDataContext } from '../hooks/useDataContext';
import { api } from '../services/api';


function DetailsScreen({ route, navigation }) {
    const { category } = route.params;
    const { loading, setLoading, quotes, setQuotes } = useDataContext();
    
    
    useEffect(() => {
        setLoading(true);
        api.get('/quotes')
        .then(res => {
            setQuotes(res.data); 
        })
        .catch(err => console.log(err.response))
        .finally(() => {
            setLoading(false);
        })
    }, [])
    
    const filteredQuotes = quotes.filter(quote => quote.category === category);
        const renderItem = ({ item }) => {
        return (
            <>
            <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("ShowImage", {
                picture: item.picture,
            }) }>
                
            
            <ImageBackground style={styles.picture} source={{ uri: item.picture }} />
            
            </TouchableOpacity>
            

            </>

        )
    }

    return (
  
        <>
        <View style={styles.container}>
           {/*  <View style={styles.heading}>
            <TouchableOpacity>
                <AntDesign
                    style={{ margin: 20 }}
                    name="arrowleft"
                    size={24} color={colors.white}
                    onPress={() => { navigation.goBack() }}
                />
            </TouchableOpacity>
            </View> */}
            
            {loading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.accent} /> 
            </View> :
            <FlatList
                keyExtractor={item => item._id}
                data={filteredQuotes}
                numColumns={2}
                renderItem={renderItem}
            />}
            
                <BannerAd />
            
        </View>
        </>
    
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        alignItems: 'center',
        width: "100%",
        height: '100%',
    },
    heading: {
        width: "90%",
    },
    loadingContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        padding: 6,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginTop: 40,
        backgroundColor: colors.opacityWhite,
    },
    imgContainer: {
        width: "50%",
        padding: 6,
        justifyContent: 'center',
        
    },
    picture: {
        borderRadius: 8,
        overflow: 'hidden',
        width: "100%",
        height: 280,
    },
   
    quotesCard: {
        marginTop: 20,
        borderRadius: 8,
        padding: 16,
        backgroundColor: colors.opacityWhite,
        height: 250,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    action: {
        marginTop: 30,
    }
    

});

export default DetailsScreen;