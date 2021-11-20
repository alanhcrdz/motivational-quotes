import React, {
    useEffect,
    useMemo,
    useState,
    useCallback,
    memo
} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
// import ActionButton from '../components/ActionButton';
import BannerAd from '../components/ads/BannerAd';
import { QuotesList } from '../components/QuotesList';
import colors from '../constants/colors';
import { useDataContext } from '../hooks/useDataContext';
import { api } from '../services/api';
import {  MaterialIcons } from '@expo/vector-icons';
import { addQuote } from '../redux/quotes/quotes.actions';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function DetailsScreen({ route, navigation, marked, addQuote }) {
    const [refreshing, setRefreshing] = useState(false);
    const { category, name } = route.params;
    const { loading, setLoading, quotes, setQuotes } = useDataContext();




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
   }, []);  */


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { setRefreshing(false) });
    }, []);

    const filteredQuotes = QuotesList.filter(quote => quote.category === category);

    const renderItem = ({ item }) => {
        const { picture } = item;

        return (
            <>
            <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("ShowImage", {
                picture: item.picture,
                category: item.category,
                name,
            })}>
                <ImageBackground style={styles.picture} source={picture} />
            
                                  
            <View>
                 <MaterialIcons onPress={() => {
                    addQuote(item)
                }}
                        style={{ margin: 20 }}
                        name={marked ? 'favorite' : 'favorite-outline'}
                        size={24} color={colors.white}


                    /> 
            </View>
            </TouchableOpacity>
            </>



        )
    }


    return (
        <View style={styles.container}>

            {loading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View> :
                <FlatList
                    keyExtractor={item => item.id}
                    data={filteredQuotes}
                    numColumns={2}
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

        </View>


    )

}

const mapDispatchToProps = dispatch => ({
    addQuote: quote => dispatch(addQuote(quote))
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        justifyContent: 'space-between',
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
        justifyContent: 'center',
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
        backgroundColor: colors.opacityWhite,
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

export default connect(
    null,
    mapDispatchToProps
)(DetailsScreen);