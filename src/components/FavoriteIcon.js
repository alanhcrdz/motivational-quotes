/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    AntDesign,
} from '@expo/vector-icons';
import colors from '../constants/colors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectQuotesCount } from '../redux/quotes/quotes.selectors';

const FavoriteIcon = ({ name, size, color, favCount }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.badge, { opacity: favCount === 0 ? 0 : 1 } ]}>
                <Text style={styles.quantity}>{favCount}</Text>
            </View>
            <AntDesign
                name={name}
                size={size}
                color={color}
            />
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    badge: {
        
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: colors.accent,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
    quantity: {
        color: colors.white,
        fontSize: 12,
    }
});

const mapStateToProps = createStructuredSelector({
    favCount: selectQuotesCount
})

export default connect(mapStateToProps)(FavoriteIcon);
 */
