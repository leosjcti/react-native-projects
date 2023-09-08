import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Area, Background, Title, ListBalance, List } from './styles';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import BalanceItem from '../../components/BalanceItem';

import api from '../../services/api';
import HistoricoList from '../../components/HistoricoList';
import CalendarModal from '../../components/CalendarModal';

export default function Home() {
  const isFocused = useIsFocused(); //Se estiver na tela retorna um true, se sair, false
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date())
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated
        }
      })


      const balance = await api.get('/balance', {
        params: {
          date: dateFormated
        }
      })
      console.log(balance.data);

      if (isActive) {
        setMovements(receives.data);
        setListBalance(balance.data);
      }

    }

    getMovements();

    return () => isActive = false;

  }, [isFocused, dateMovements])

  async function handleDelete(id) {
    try {
      await api.delete('receives/delete', {
        params: {
          item_id: id
        }
      })
      setDateMovements(new Date())
    } catch (error) {
      console.log(error)
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected)
  }


  return (
    <Background>
      <Header title="Minhas Movimentações" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({ item }) => (<BalanceItem data={item} />)}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name='event' size={30} color="#121212" />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>

      <List
        data={movements}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType='fase' transparent={true}>
        <CalendarModal
         setVisible= { () => setModalVisible(false) } 
         handleFilter={filterDateMovements}
         />
      </Modal>

    </Background>
  )
}