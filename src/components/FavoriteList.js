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





function FavoriteList({ onNavigate,  quote: { picture } }) {
        return (
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

                    <TouchableOpacity style={styles.imgContainer} onPress={onNavigate }>
                        <ImageBackground style={styles.picture} source={picture} />
                    </TouchableOpacity>
            </View>


        )
}

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

export default FavoriteList;