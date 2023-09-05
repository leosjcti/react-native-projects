import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebaseConnection'; 
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useEffect, useState } from 'react';


/*function writeUserData(userId, name, email) {
   set(ref(db, 'users/' + userId), {
     username: name,
     email: email
   });
   alert('Cadastro enviado');
 }*/

export default function Posts() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [todoData, setTodoData] = useState([]);


    const dataAddOn = () => {
        set(ref(db, 'posts/' + title), {
            title: title,
            body: body
        });
        setTitle('');
        setBody('');
    }

    /*
    useEffect(() => {
        const startCountRef = ref(db, 'posts/');

        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPost = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(newPost);
            setTodoData(newPost);
        });

    }, [])*/


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.form}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Add a new Post</Text>
                <TextInput
                    placeholder='Title'
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Body'
                    value={body}
                    onChangeText={(text) => setBody(text)}
                    style={styles.input}
                />

                <Button
                    title='Send Data'
                    onPress={dataAddOn}
                />
            </View>


            <View style={styles.list}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Posts from Firebase</Text>

                {
                    todoData.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.text}>{item.title}</Text>
                                <Text style={styles.text}>{item.body}</Text>
                            </View>
                        )
                    })
                }

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