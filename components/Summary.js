import React from 'react';
import { View, Text } from 'react-native';

export default function Summary({ route }) {
  const { data, answers } = route.params;

  let score = 0;

  const isCorrect = (q, userAnswer) => {
    if (Array.isArray(q.correct)) {
      return JSON.stringify([...q.correct].sort()) ===
        JSON.stringify([...userAnswer].sort());
    } else {
      return q.correct === userAnswer;
    }
  };

  data.forEach((q, i) => {
    if (isCorrect(q, answers[i])) {
      score++;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.quizBox}>
        <Text testID="total" style={{ fontSize: 20, marginBottom: 20 }}>
          Score: {score} / {data.length}
        </Text>

        {data.map((q, i) => (
          <View key={i} style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{q.prompt}</Text>

            {q.choices.map((choice, j) => {
              const userAnswer = answers[i];
              const isChosen = Array.isArray(userAnswer)
                ? userAnswer.includes(j)
                : userAnswer === j;
              const isCorrectChoice = Array.isArray(q.correct)
                ? q.correct.includes(j)
                : q.correct === j;

              let style = {};
              if (isChosen && isCorrectChoice) {
                style = {
                  fontWeight: 'bold',
                  color: '#2cb311',
                };
              } else if (isChosen && !isCorrectChoice) {
                style = {
                  textDecorationLine: 'line-through',
                  textDecorationColor: '#cf1f1f',
                  color: '#cf1f1f',
                };
              }
              else if (!isChosen && isCorrectChoice) {
                style = {
                  color: '#cc9808'
                };
              }

              return (
                <Text key={j} style={style}>
                  {choice}
                </Text>
              );
            })}
          </View>
        ))}
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
    maxWidth: 500,
    backgroundColor: '#f1faff',
    padding: 20,
    borderRadius: 20,
  }
};