import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ContextAuth } from '../context/AuthProvider';
import { api } from '../config/api';
import { Avatar } from 'react-native-paper';

export default function EditProfileScreen({ navigation }) {
  const { logout, user } = useContext(ContextAuth);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setNewUsername(user.user_login);
      setNewName(user.name || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!newUsername || !newName || !newPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.patch(`/users/${user.id}`, {
        user: {
          login: newUsername,
          name: newName,
          password: newPassword,
          password_confirmation: newPassword,
        },
      });
      logout();
      Alert.alert('Usuário atualizado', 'Crie uma nova sessão');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${user.id}`);
      logout();
      Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir a conta.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text size={60} label={user.user_login.charAt(0).toUpperCase()} />
        <Text style={styles.title}>{user?.user_login? user?.user_login: "Minha conta"}</Text>
      </View>
      <Text style={styles.title}>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cancelButton, { backgroundColor: 'red', top: 10 }]} onPress={handleDelete}>
        <Text style={styles.cancelButtonText}>Excluir Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cancelButton, { backgroundColor: 'gray', top: 20 }]} onPress={() => logout()}>
        <Text style={styles.cancelButtonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#a5d6a7',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8bc34a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
