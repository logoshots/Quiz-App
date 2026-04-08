import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function Question({ route, navigation }) {
  const { data, index, answers } = route.params;
  const question = data[index];

  const [selected, setSelected] = useState(
    question.type === "multiple-answer" ? [] : -1
  );

  const handleSelect = (i) => {
    if (question.type === "multiple-answer") {
      if (selected.includes(i)) {
        setSelected(selected.filter(x => x !== i));
      } else {
        setSelected([...selected, i]);
      }
    } else {
      setSelected(i);
    }
  };

  const handleNext = () => {
    if (
      (question.type !== "multiple-answer" && selected === -1) ||
      (question.type === "multiple-answer" && selected.length === 0)
    ) {
      return;
    }

    const newAnswers = [...answers, selected];

    if (index + 1 < data.length) {
      navigation.push('Question', {
        data,
        index: index + 1,
        answers: newAnswers
      });
    } else {
      navigation.navigate('Summary', {
        data,
        answers: newAnswers
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizBox}>
        <Text style={styles.questionText}>{question.prompt}</Text>

        <ButtonGroup
          testID="choices"
          buttons={question.choices}
          onPress={handleSelect}
          selectedIndexes={question.type === "multiple-answer" ? selected : undefined}
          selectedIndex={question.type !== "multiple-answer" ? selected : undefined}
          vertical
          buttonStyle={{
            backgroundColor: '#f1faff',
            borderWidth: 0,
            padding: 20,
            marginBottom: 10,
          }}
          textStyle={{
            color: '#000000',
            fontSize: 16,
          }}
        />

        <Button
          title="Next"
          testID="next-question"
          onPress={handleNext}
          color="#2cb311"
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  quizBox: {
    width: '100%',
    maxWidth: 700,
    padding: 20,
    borderRadius: 20,
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  }
};