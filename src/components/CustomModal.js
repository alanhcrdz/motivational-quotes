import React,{ useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 
    Modal,
   } from 'react-native-paper';
import colors from '../constants/colors';

function CustomModal({ onDismiss, visible }) {

    
    return (
            <Modal 
            style={styles.modal}
            visible={visible} 
            onDismiss={onDismiss} >
                <Text>Test modal</Text>
            </Modal>

            
    
    )
}
const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.white,
        padding: 20,
    },
})

export default CustomModal;
