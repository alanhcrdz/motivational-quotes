import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

function Daily() {

    return (
        <View style={styles.container}>
            <Text>Daily!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
})
export default Daily;
