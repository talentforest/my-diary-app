import styled from 'styled-components';
import React from 'react';
import colors from '../color';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  padding: 50px 20px 0;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 28px;
  font-weight: 700;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Home = ({ navigation: { navigate } }) => {
  return (
    <Container>
      <Title>My journal</Title>
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name='add' color='white' size={40} />
      </Btn>
    </Container>
  );
};

export default Home;
