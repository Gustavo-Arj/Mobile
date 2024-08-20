import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CreatePostScreen = ({ navigation }) => {
  const [titulo, setTitle] = useState('');
  const [corpo, setCorpo] = useState('');

  const handleCreatePost = async () => {
    try {
      await axios.post('https://api.papacapim.just.pro.br', { titulo, corpo });
      navigation.volte();
    } catch (error) {
      console.error(error);
      // Adicione lógica para exibir mensagens de erro
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titulo do Post"
        value={titulo}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Corpo do Post"
        value={corpo}
        onChangeText={setCorpo}
      />
      <Button title="Quero postar algo" onPress={handleCreatePost} />
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

export default CreatePostScreen;