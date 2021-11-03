import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text, Modal,
    TouchableOpacity,
    TouchableHighlight,
    Linking,
    Platform,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,

} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {
    Feather,
    AntDesign,
    Entypo,
    MaterialCommunityIcons,
    MaterialIcons,
    EvilIcons,
} from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// Rate system
// import * as StoreReview from 'expo-store-review';

function DrawerContent(props) {

    const [modalVisible, setModalVisible] = useState(false);

    const packageName = 'host.exp.exponent'
    // MODAL
    const handleModalVisibility = () => {
        setModalVisible(true)
    }


    // Open the iOS App Store in the browser -> redirects to App Store on iOS

    const handleAppReview = () => {
        const androidPackageName = 'com.globalpromotions.motivate';
        const itunesItemId = 982107779; // REPLACE WITH APPLE ID
        /* if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
          } */
        if (Platform.OS === 'android') {
            Linking.openURL(`https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`);
        } else {
            Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`)
        }




    }

    return (
        <>
            <View style={{ flex: 1 }} >
                <DrawerContentScrollView  {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={
                                        require('../assets/logo.png')
                                    }
                                    size={60}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.appTitle}>Motivational Quotes</Title>
                                    {/* <Caption style={styles.caption}>Inspirational Quotes</Caption> */}
                                </View>
                            </View>
                        </View>

                        <Drawer.Section title="Main"
                            style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <MaterialIcons
                                        name='explore'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Explore"
                                onPress={() => { props.navigation.navigate('Inspire') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <AntDesign
                                        name='picture'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Random Images"
                                onPress={() => { props.navigation.navigate('Random Images') }}
                            />
                           {/*  <DrawerItem
                                icon={({ color, size }) => (
                                    <Entypo
                                        name='quote'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Only Text"
                                onPress={() => { props.navigation.navigate('Random') }}
                            /> */}

                        </Drawer.Section>

                        <Drawer.Section title="Social">
                            {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name='instagram'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Follow us"
                        />
 */}
                             {/* <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign
                                    name='infocirlceo'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="About us"
                            onPress={() =>{props.navigation.navigate('About')}}
                        />  */}
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Entypo
                                        name='star-outlined'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Leave Feedback"
                                onPress={handleModalVisibility}
                            />
                            {/*  <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='email'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Contact"
                            onPress={() =>{}}
                        /> */}

                        </Drawer.Section>
                        {/*<Drawer.Section title="Membership" >
                                
                                 <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='crown-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Go Premium"
                            onPress={() =>{}}
                    </Drawer.Section>  
                        /> */}
                    </View>
                </DrawerContentScrollView>
                {/* <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather
                            name='settings'
                            color={color}
                            size={size}
                        />
                    )}
                    label="Settings"
                />
            </Drawer.Section>  */}

            </View>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={() => { setModalVisible(!modalVisible) }}>

                            <AntDesign
                                name="closecircleo"
                                size={24}
                                color="white" />

                        </TouchableOpacity>
                        <View>
                            <Text style={styles.title}>Enjoying Motivate Experience?</Text>
                        </View>
                        <View style={styles.starsContainer}>
                            <EvilIcons name="star" size={26} color="white" />
                            <EvilIcons name="star" size={26} color="white" />
                            <EvilIcons name="star" size={26} color="white" />
                            <EvilIcons name="star" size={26} color="white" />
                            <EvilIcons name="star" size={26} color="white" />
                        </View>
                        <Text style={styles.modalText}>Show us what you think of Motivate App!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton }}
                            onPress={handleAppReview}>
                            <View>
                                <Text
                                    style={styles.textStyle}>
                                    {Platform.OS === 'android' ? 'Rate Us on Google Play' : 'Rate Us on App Store'}
                                </Text>
                            </View>
                        </TouchableHighlight>




                    </View>
                </View>
            </Modal>

        </>

    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },

    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    // MODAL STYLE
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        width: 250,
        backgroundColor: colors.accent,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    modalText: {
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
        color: colors.white,
        fontFamily: fonts.text,

    },
    close: {
        marginBottom: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    appTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontFamily: fonts.title,
        color: colors.white,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 8,
    }

});

export default DrawerContent
