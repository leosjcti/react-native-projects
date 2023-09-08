import { styled } from "styled-components/native";

export const RegisterContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
`;

export const RegisterTypeButton = styled.TouchableOpacity`
    background-color: ${props => props.checked ? '#FFF' : '#e7e7e7'};
    justify-content: center;
    align-items: center;
    width: 47%;
    height: 45px;
    border-radius: 10px;
    border-width: 1.5px;
    border-color: ${props => props.checked ? '#000' : 'transparent'};
    margin-bottom: 14px;
    flex-direction: row;
`;

export const RegisterLabel = styled.Text`
    margin-left: 8px;
    font-size: 17px;
`;