import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import colors from '../color';
import styled from 'styled-components';
import { useDB } from '../context';

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 40px 0px 20px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  padding: 15px 10px;
  font-size: 16px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;
const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity`
  background-color: white;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? 'rgba(41, 30, 95, 1);' : 'transparent'};
`;
const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ['🤯', '🥲', '🤬', '🥰', '😊', '🤩'];

const Write = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState('');

  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setEmotion(face);
  const onSubmit = () => {
    if (feelings === '' || selectedEmotion == null) {
      return Alert.alert('Please complete form.');
    }
    realm.write(() => {
      const feeling = realm.create('Feeling', {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    goBack();
  };

  return (
    <Container>
      <Title>How do you feel now?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType='done'
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder='Write your feelings...'
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </Container>
  );
};

export default Write;
