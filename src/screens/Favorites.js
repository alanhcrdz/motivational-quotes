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
    Text,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
// import ActionButton from '../components/ActionButton';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { useDataContext } from '../hooks/useDataContext';
import { connect } from 'react-redux';
import FavoriteList from '../components/FavoriteList';
import { createStructuredSelector } from 'reselect';
import { selectQuotes } from '../redux/quotes/quotes.selectors';
import {  MaterialIcons } from '@expo/vector-icons';





function Favorites({ navigation,  quotes, marked  }) {
    const [refreshing, setRefreshing] = useState(false);

    const { loading } = useDataContext();


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { setRefreshing(false) });
    }, []);

    const renderItem = ({ item }) => {
        const { picture } = item;

        return (
            <>
            <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("ShowImage", {
                picture: item.picture,
                
            })}>
                <ImageBackground style={styles.picture} source={picture} />
            
                                  
            
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
                    quotes.length ?

                    <FlatList
                    keyExtractor={item => item.id}
                    data={quotes}
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


                />



                    /* quotes.map((quote, index) =>
                        <FavoriteList key={quote.id} quote={quote} onNavigate={() => {
                            navigation.navigate("ShowImage", {quote})
                        }} />) */
                        :
                        <Text numberOfLines={2} style={styles.empty}> No Favorite pictures found. Try to Add some!</Text>
                }
            </View>


        )
}
const mapStateToProps = createStructuredSelector({
    quotes: selectQuotes,
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
    },
    empty: {
        color: colors.white,
        fontFamily: fonts.text,
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 40,
    }


});

export default connect(mapStateToProps)(Favorites);