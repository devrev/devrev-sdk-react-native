import React from 'react';

import * as DevRev from '@devrev/sdk-react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import viewModel from '../viewmodel/ViewModel';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

interface CustomButtonProps {
    onPress: () => void;
    buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacityButton
            onPress={onPress}
            buttonText={buttonText}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
        />
    );
}

const IdentificationScreen: React.FC = () => {
    const [userID, setUserID] = React.useState('');
    const [sessionToken, setSessionToken] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Unverified User</Text>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={setUserID}
            />

            <CustomButton
                onPress={() => {
                    console.log('Identifying user with:', userID);
                    DevRev.identifyUnverifiedUser(userID);
                }}
                buttonText="Identify Unverified User"
            />

            <Text style={styles.heading}> Verified User</Text >
            <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={setUserID}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Session token"
                onChangeText={setSessionToken}
            />

            <CustomButton
                onPress={() => {
                    console.log('Identifying user with:', userID, 'and session token:', sessionToken);
                    DevRev.identifyVerifiedUser(userID, sessionToken);
                }}
                buttonText="Identify Verified User"
            />

            <Text style={styles.heading}>Logout</Text>
            <CustomButton
                onPress={() => {
                    viewModel.logout();
                }}
                buttonText="Logout"
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
    },
    heading: {
        color: '#454141',
        fontSize: 12,
        textAlign: 'left',
        paddingTop: 8,
        paddingLeft: 8,
    },
    input: {
        height: 40,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        margin: 8,
    },
    button: {
        padding: 8,
        paddingLeft: 2,
        borderRadius: 5,
        margin: 8,
        color: '#000000',
    },
    buttonText: {
        color: '#007AFF',
        textAlign: 'left',
    },
});

export default IdentificationScreen;
