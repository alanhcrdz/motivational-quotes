import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

function AboutUs() {
    return (
        <View style={styles.container}>
            <View  style={styles.wrapper}>
            <Text style={styles.title}>Motivate</Text>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={require('../assets/logo.png')} />
            </View>
            <Text style={styles.text}>Motivate is an App that is part of Global Promotions Group of Canada Ltd.
            Our Mission is bring you the best creative Motivational Quotes within beautiful images so that make good impact over your day and help people feel a bit better.   </Text>

                    <Text style={styles.text}>Form more information or feedback email us at: <Text onPress={() => { Linking.openURL('mailto:info@globalpromotions.ca') }} style={styles.span}>info@globalpromotions.ca</Text>
                 </Text>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    wrapper: {
        backgroundColor: colors.opacityWhite,
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontFamily: fonts.title,
        fontSize: 22,
        lineHeight: 22,
        color: colors.accent,
    },
    text: {
        marginTop: 30,
        fontFamily: fonts.text,
        fontSize: 16,
        lineHeight: 25,
        color: colors.white,
        textAlign:'center',
    },
    span: {
        color: colors.accent,
    },
    imageWrapper: {
        marginTop: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default AboutUs
