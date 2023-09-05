import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../../firebaseConnection';
import { ref, onValue, set, push } from 'firebase/database'
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';


/*function writeUserData(userId, name, email) {
   set(ref(db, 'users/' + userId), {
     username: name,
     email: email
   });
   alert('Cadastro enviado');
 }*/

export default function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function cadastrar() {

        await auth.createUserWithEmailAndPassword(email, password)
        .then( (value) => {
            alert('Usuario criado: '+value.user.email);
        })
        .catch( (error) => {
            if(error.code === 'auth/weak-password') {
                alert('Sua senha deve ter pelo menos 6 caracteres');
            }
            if(error.code === 'auth/invalid-email') {
                alert('E-mail invalido');
            } else {
                alert('Ops algo deu errado');
            }
        })        
    }
    


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.form}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Autenticação</Text>
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

    form: {

    },

    list: {
        marginTop: 30
    },

    text: {
        fontSize: 20,
        textAlign: 'justify',
        marginTop: 10
    }
});