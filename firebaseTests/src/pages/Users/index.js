import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebaseConnection';
import { getDatabase, ref, onValue, set, push } from 'firebase/database'
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import Listagem from './listagem';


/*function writeUserData(userId, name, email) {
   set(ref(db, 'users/' + userId), {
     username: name,
     email: email
   });
   alert('Cadastro enviado');
 }*/

export default function Posts() {

    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const [loading, setLoading] = useState(true);



    const dataAddOn = () => {
        set(ref(db, 'usuarios/' + uuid.v4()), {
            nome: nome,
            cargo: cargo
        });
        setNome('');
        setCargo('');
        alert('Cadastrado com sucesso');
    }

    useEffect(() => {
        const dbObject = ref(db, 'usuarios/');

        onValue(dbObject, (snapshot) => {
            setUsuarios([]);
            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    nome: childItem.val().nome,
                    cargo: childItem.val().cargo,
                };
                setUsuarios(oldArray => [...oldArray, data]);
            });

            setLoading(false);


            // const data = snapshot.val();
            // const newPost = Object.keys(data).map(key => ({
            //     id: key,
            //     ...data[key]
            // }));
            //console.log(newPost);
            //setUsuarios(data);
        });

    }, [])


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.form}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Novo Funcionário</Text>
                <TextInput
                    placeholder='Nome'
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Cargo'
                    value={cargo}
                    onChangeText={(text) => setCargo(text)}
                    style={styles.input}
                />


                <Button
                    title='Cadastrar'
                    onPress={dataAddOn}
                />
            </View>


            <View style={styles.list}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Funcionários</Text>


                {loading ?
                    (
                        <ActivityIndicator color="#121212" size={45} />
                    ) :
                    (
                        <FlatList
                            keyExtractor={item => item.key}
                            data={usuarios}
                            renderItem={({ item }) => (<Listagem data={item} />)}
                        />
                    )
                }




                {/* {
                    todoData.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.text}>{item.nome}</Text>
                            </View>
                        )
                    })
                } */}

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