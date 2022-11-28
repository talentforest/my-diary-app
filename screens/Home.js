import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import colors from '../color';
import { Ionicons } from '@expo/vector-icons';
import { useDB } from '../context';
import { FlatList, LayoutAnimation, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  padding: 60px 20px 0;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
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
const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;
const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  useEffect(() => {
    const feelings = realm.objects('Feeling');
    feelings.addListener((feelings, changes) => {
      LayoutAnimation.spring();
      setFeelings(feelings.sorted('_id', true));
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, []);

  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey('Feeling', id);
      realm.delete(feeling);
    });
  };

  return (
    <Container>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        keyExtractor={(feeling) => feeling._id + ''}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name='add' color='white' size={40} />
      </Btn>
    </Container>
  );
};

export default Home;
