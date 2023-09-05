import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authentication } from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Login( {changeStatus} ) {

    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        
        if(type === 'login') {

                 signInWithEmailAndPassword(authentication, email, password)
                    .then((value) => {
                        changeStatus(value.user.uid)
                    })
                    .catch((error) => {
                        console.log(error);    
                        alert('Ops algo deu errado');
                        return;
        
                    })
                //setEmail('');
                //setPassword('');
           

        } else {

            createUserWithEmailAndPassword(authentication, email, password)
            .then((value) => {
                changeStatus(value.user.uid)
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

        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.form}>

                <TextInput
                    keyboardType='email-address'
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    keyboardType='numeric'
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                />


                <TouchableOpacity
                    style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#3ea6f2' : '#141414'}]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginText}>
                        {type === 'login' ? 'Acessar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
                    <Text style={{ textAlign: 'center' }}>
                    { type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                        
                    </Text>
                </TouchableOpacity>


            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f6fc',
        paddingTop: 60,
        paddingHorizontal: 10
    },
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        height: 45
    },

    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',        
        height: 45,
        marginBottom: 10
    },

    loginText: {
        fontSize: 17,
        color: '#FFF'
    }
});