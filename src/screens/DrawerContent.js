import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
// Text,
// TouchableRipple,
// Switch,

} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { Feather, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';

function DrawerContent(props) {

  
    return (
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
                                <Title style={styles.title}> Get Inspired</Title>
                                <Caption style={styles.caption}>Inspirational Quotes</Caption>
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
                            onPress={() =>{props.navigation.navigate('Inspire')}}
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
                            onPress={() =>{props.navigation.navigate('Random Images')}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo
                                    name='quote'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Only Text"
                            onPress={() =>{props.navigation.navigate('Random')}}
                        />
                        
                    </Drawer.Section>

                    <Drawer.Section title="Social">
                    <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name='instagram'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Follow us"
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign
                                    name='infocirlceo'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="About us"
                            onPress={() =>{}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo
                                    name='star-outlined'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Rate this App"
                            onPress={() =>{}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='email'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Contact"
                            onPress={() =>{}}
                        />

                    </Drawer.Section>
                    {/* <Drawer.Section title="Membership" >
                                
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
                        />
                    </Drawer.Section> */}
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
            </Drawer.Section> */}
        </View>
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
});

export default DrawerContent
