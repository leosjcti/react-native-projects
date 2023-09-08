import { styled } from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #f0f4ff;
`;


export const Message = styled.Text`
    margin-top: 24px;
    font-size: 18px;
    font-weight: bold;
`;

export const Name = styled.Text`
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 24px;
    padding: 0 14px;
    color: #121212;
`;

export const NewLink = styled.TouchableOpacity`
    background-color: #3b3dbf;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
   margin-bottom: 14px;
`;

export const NewText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const LogoutButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 45px;
    border-width: 1px;
    border-radius: 8px;
    border-color: #c62c36;
`;

export const LogoutText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #c62c36;
`;