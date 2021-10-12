import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import CountDown from 'react-native-countdown-component';

import fonts from '../constants/fonts';
import DailyQuotes from '../components/DailyQuotes';



function Daily() {
   
    return (
        <View style={styles.container}>
            <DailyQuotes />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
})
export default Daily;
