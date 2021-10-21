import React, { useState } from 'react';

import {
  View,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){
    const [message, setMessage] = useState('');
    const [sendingMessage, setSenddingMessage] = useState(false);

    async function handleMessageSubmit() {
        const messageFormated = message.trim();
        
        if (messageFormated.length > 0) {
            setSenddingMessage(true);
            await api.post('messages', { message: messageFormated });
            setMessage('');
            Keyboard.dismiss();
            setSenddingMessage(false);
            Alert.alert("Mensaje enviada exitosamente!");

        } else {
            Alert.alert("Escriba su mensaje para enviar")
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                keyboardAppearance="dark"
                placeholder="Cual es su espectativa para el envento"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                maxLength={140}
                onChangeText={setMessage}
                value={message}
                editable={!sendingMessage}
            />

            <Button 
                title="ENVIAR MENSAJE"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    );
}