import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput, Button } from 'react-native';
import { api } from '../config/api';

export default function Comments({ route }) {
    const { currentPost } = route.params;
    const [newComment, setNewComment] = useState('');
    const [replies, setReplies] = useState([]);

    const fetchReplies = async () => {
        try {
            const response = await api.get(`/posts/${currentPost.id}/replies`);
            setReplies(response.data);
        } catch (error) {
            console.error('Erro ao buscar respostas:', error);
        }
    };

    useEffect(() => {
        fetchReplies();
    }, []);

    const addReply = async () => {
        if (newComment.trim()) {
            try {
                const response = await api.post(`/posts/${currentPost.id}/replies`, {
                    reply: {
                        message: newComment,
                    },
                });
                const newReply = response.data;
                setReplies([...replies, newReply]);
                setNewComment('');
            } catch (error) {
                console.error('Erro ao adicionar resposta:', error);
                Alert.alert('Erro', 'Não foi possível adicionar a resposta.');
            }
        } else {
            Alert.alert('Aviso', 'O comentário não pode estar vazio.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Exibe o login do usuário que postou e a mensagem */}
            <Text style={styles.userLogin}>Postado por: {currentPost.user_login}</Text>
            <Text style={styles.postTitle}>{currentPost.message}</Text>

            {/* Renderiza as respostas da postagem */}
            {replies.length > 0 ? (
                <FlatList
                    data={replies}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>{item.message}</Text>
                            <Text style={styles.commentUser}>Comentado por: {item.user_login}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text style={styles.noComments}>Sem respostas ainda.</Text>
            )}

            {/* Campo de texto para adicionar uma nova resposta */}
            <TextInput
                style={styles.input}
                placeholder="Adicionar uma resposta..."
                value={newComment}
                onChangeText={setNewComment}
            />
            <Button title="Enviar" color={"green"} onPress={addReply} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    userLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 4,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    commentContainer: {
        marginBottom: 8,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#e3fce3', // Cor de fundo verde claro
        borderColor: '#a8e8a8', // Cor da borda
        borderWidth: 1,
    },
    commentText: {
        fontSize: 14,
    },
    commentUser: {
        fontSize: 12,
        color: '#555',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 16,
    },
    noComments: {
        fontSize: 14,
        color: '#888',
    },
});
