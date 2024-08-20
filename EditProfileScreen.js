import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Substitua pela URL da sua API
        const response = await axios.get('https://api.example.com/me');
        setUsuario(response.data.usuario);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('https://api.papacapim.just.pro.br', { usuario, email, senha });
      navigation.voltar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Salvar Mudanças" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
});

export default EditProfileScreen;