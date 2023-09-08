import React, { useMemo } from 'react';
import { Balance, Container, Label} from './styles';


export default function BalanceItem({ data }) {

    //toda vez que o data mudar, ele será chamado
    const labelName = useMemo(()=> {
        if(data.tag === 'saldo') {
            return {
                label: 'Saldo atual',
                color: '3b3dbf'
            }
        } else if(data.tag === 'receita') {
            return {
                label: 'Receita de hoje',
                color: '00b94a'
            }
        } else {
            return {
                label: 'Saidas de hoje',
                color: 'EF463a'
            } 
        }

    }, [data])

    return (
        <Container bg={labelName.color}>
            <Label>{labelName.label}</Label>
            <Balance>R$ {data.saldo}</Balance>
        </Container>
    )
}