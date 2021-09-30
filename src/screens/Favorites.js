import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function Favorites(props) {

    //const favQuotes = useSelector(state => state.quotes.favoriteQuotes)
    return (
        <View style={styles.container}>
            <Text>Favorites!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Favorites;