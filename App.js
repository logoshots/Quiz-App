import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Question from './components/Question';
import Summary from './components/Summary';

const Stack = createNativeStackNavigator();

// QUESTION 1 ANSWER: 2 (California Sea Lion) [Mult Chc]
// QUESTION 2 ANSWER: 0,2,3 (25-30 mph, walk with flippers, name from barks) [Mult Ans]
// QUESTION 3 ANSWER: 0 (False) [T or F]

export default function App() {

  const data = [
    {
      prompt: "Which of the following is a type of Sea Lion?",
      type: "multiple-choice",
      choices: [
        "Bottlenose Sea Lion",
        "Watershed Sea Lion",
        "California Sea Lion",
        "Freshwater Sea Lion"
      ],
      correct: 2
    },
    {
      prompt: "Which of the following about Sea Lions is true?\nSelect all that apply.",
      type: "multiple-answer",
      choices: [
        "They can reach speeds of 25-30 mph in water",
        "They use their rear flippers to swim",
        "They are able to 'walk' on land with their flippers",
        "They get their name from their loud barks"
      ],
      correct: [0, 2, 3]
    },
    {
      prompt: "True or False:\nEars are a key difference between sea lions from seals.",
      type: "true-false",
      choices: [
        "True",
        "False",
      ],
      correct: 0
    }
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data, index: 0, answers: [] }}
          options={{ headerLeft: null }}
        />
        <Stack.Screen name="Summary" component={Summary} options={{ headerLeft: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}