import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { authentication, db } from '../../firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database'
import { useState } from 'react';

export default function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [name, setName] = useState('');


    async function cadastrar() {

        await createUserWithEmailAndPassword(authentication, email, password)
            .then((value) => {
                alert('Usuario criado: ' + value.user.email);

                set(ref(db, 'usuarios/' + value.user.uid), {
                    nome: name
                });
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert('Sua senha deve ter pelo menos 6 caracteres');
                    return;
                }
                if (error.code === 'auth/invalid-email') {
                    alert('E-mail invalido');
                    return;
                } else {
                    alert('Ops algo deu errado');
                    return;
                }
            })
        setEmail('');
        setPassword('');
        setName('');
    }


    async function logar() {

        await signInWithEmailAndPassword(authentication, email, password)
            .then((value) => {
                alert('Bem-vindo: ' + value.user.email);
                setUser(value.user.email);
            })
            .catch((error) => {

                alert('Ops algo deu errado');
                return;

            })
        setEmail('');
        setPassword('');
    }

    async function logout() {
        await signOut(authentication);
        setUser('');
    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.form}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Cadastrar user Firebase</Text>

                <TextInput
                    placeholder='Nome'
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                />


                <Button
                    title='Cadastrar'
                    onPress={cadastrar}
                />
            </View>

            <View style={styles.login}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Login no Firebase</Text>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                />


                <Button
                    title='Entrar'
                    onPress={logar}
                />

                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{user}</Text>

                {user.length > 0 ? (
                    <Button
                        title='Sair'
                        color={'#FF0000'}
                        onPress={logout}
                    />
                ) : (
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Nenhum usuário logado</Text>
                )}



            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    },

    login: {
        marginTop: 60
    },

    text: {
        fontSize: 20,
        textAlign: 'justify',
        marginTop: 10
    }
});