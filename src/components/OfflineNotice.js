import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

 const OfflineNotice = () => {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        zIndex: 999,
    },
    offlineText: {
        color: '#fff'
    }
})
export default OfflineNotice;