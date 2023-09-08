import React, { createContext, useEffect, useState } from "react";

import api from '../services/api';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {

    const navigation = useNavigation();

    const[user, setUser] = useState(null);
    const[loadingAuth, setLoadingAuth] = useState(false);
    const[loading, setLoading] = useState(true);


    useEffect( ()=> {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@finToken');

            if(storageUser) {
                const response = await api.get('/me', {
                    headers:{
                        'Authorization': `Bearer ${storageUser}`
                    }
                }).catch((error) =>{
                    console.log("Erro loadStorage", error)
                    setUser(null);
                })
                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(response.data);
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])


    async function signUp(name, email, password) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users', {
                name: name,
                email: email,
                password: password
            })       
            setLoadingAuth(false);
            navigation.goBack();     

        } catch (error) {
            console.log('Erro ao Cadastrar', error);
            setLoadingAuth(false);
        }
    }

    async function signIn(email, password) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            })       
            const { id, name, token } = response.data;

            const data = { id, name, token, email };
            
            //Salva o token no asyncStorage
            await AsyncStorage.setItem('@finToken', token)
            
            //Informa ao axios que as proximas requisições, ele utilizará esse token no header
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Atribui ao setUser os dados para utilizar via context
            setUser({ id, name, email });

            setLoadingAuth(false);

        } catch (error) {
            console.log('Erro ao Logar', error);
            //setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        }) 
    }

    return(
        //signed: !!user -> Converte o valor da useState user para boolean
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;