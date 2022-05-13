import { FontAwesome } from '@expo/vector-icons'
import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import colors from '../constants/colors'

const OfflineNotice = () => {
    return (
        <View style={[styles.offlineContainer, { flexDirection: 'column' }]}>
            <Text style={styles.offlineText}>No Internet Connection.</Text>
            <View style={{
                marginTop: 10, 
                width: 140, 
                height: 140, 
                borderRadius: 70,
                backgroundColor: colors.opacityWhite,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }} >
                <Image style={{ width: '100%', height: '100%', }} source={require('../assets/void.png')} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: colors.background,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    offlineText: {
        color: '#fff'
    }
})
export default OfflineNotice;