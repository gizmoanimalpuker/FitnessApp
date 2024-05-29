import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import exercises from '../../assets/data/exercises.json'; // we need to import/link those exercises from the exercise.json
import ExerciseListItem from '../components/ExerciseListItem';

// custom function
// function ExerciseListItem({ item }) {
//   return (
//     <View style={styles.exerciseContainer}> 
//       <Text style={styles.exerciseName}>{item.name}</Text> 
//       <Text style={styles.exerciseSubtitle}> 
//         {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()} 
//       </Text>
//     </View>
//   )
// }


export default function App() {
  // instantiate object for thr 1st exercise position 0
  //const exercise =exercises[2]; 
  return ( 
    <View style={styles.container}>
      <FlatList 
        data={exercises} //run the array of data as the .json file is an array
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.name} // tell FlatList how to extract the key/id of the item data, will NOT work with duplicate name
        renderItem={ ({ item }) => <ExerciseListItem item={item} /> }
          /* what this function render/put on the screen
              each view will be one exercise
              use " { }" called the portal to access JS syntax/texts
          */

          // (
          //   <View style={styles.exerciseContainer}> 
          //     <Text style={styles.exerciseName}>{item.name}</Text> 
          //     <Text style={styles.exerciseSubtitle}> 
          //       {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()} 
          //     </Text>
          //   </View>
          // )

          // a function to tell Flatlist to render that array/ same as a loop, will be called everytime a new item in the array comes up
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 70,
  },

  // exerciseContainer: {
  //   backgroundColor: '#fff',
  //   padding: 10,
  //   borderRadius: 10,
  //   gap: 5,
  // },

  // exerciseName: {
  //   fontSize: 20, 
  //   fontWeight: '500',
  // },

  // exerciseSubtitle: {
  //   color: 'dimgray',
  // }
});
