import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // navigation package of the ReactNative app
import exercises from '../../assets/data/exercises.json';
import { Stack } from 'expo-router';

export default function ExerciseDetailsScreen() {
    const params = useLocalSearchParams(); // search mechanism

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const exercise = exercises.find((item) => item.name === params.name); // exercise's name

    if (!exercise) { // if it cannot find the exercise due to diff URL
        return <Text>Exercise NOT found!!!</Text>;
    }

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
          interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
          }, 1000);
        } else if (!isTimerRunning && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isTimerRunning, seconds]);
    

      const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
      const startWorkout = () => {
        setSeconds(0);
        setIsTimerRunning(true);
      };
    
      const stopWorkout = () => {
        setIsTimerRunning(false);
        //navigation.navigate('Summary', { workoutType, duration: seconds });
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />

            <View style={styles.panel}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>

                <Text style={styles.exerciseSubtitle}>
                    <Text style={styles.subValue}>{exercise.muscle}</Text> |{' '}
                    <Text style={styles.subValue}>{exercise.equipment}</Text>
                </Text>
            </View>

            <View style={styles.panel}>
                <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>
                    {exercise.instructions}
                </Text>

                <Text onPress={() => setIsInstructionExpanded(!isInstructionExpanded)} style={styles.seeMore}>
                    {isInstructionExpanded ? 'See less' : 'See more'}
                </Text>
            </View>

            <View style = {styles.panel}>
                <Text styles={styles.timerText}> {formatTime(seconds)}</Text>
                {isTimerRunning ? (
                <Button title="Stop Workout" onPress={stopWorkout} />
                ) : (
                <Button title="Start Workout" onPress={startWorkout} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },

    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },

    exerciseName: {
        fontSize: 20,
        fontWeight: '500',
    },

    exerciseSubtitle: {
        color: 'dimgray',
    },

    subValue: {
        textTransform: 'capitalize',
    },

    instructions: {
        fontSize: 16,
        lineHeight: 22, // to make the text more readable
    },

    seeMore: {
        alignSelf: 'center',
        padding: 5,
        fontWeight: '600',
        color: 'gray',
    },

    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
