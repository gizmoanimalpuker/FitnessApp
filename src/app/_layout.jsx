/* The _layout is the file that wrap around our different screen,
    The _layout inside the the "app folder" usually called the root layout. It will be rendered on everyscreen
    on the application,
    Usually, it is where we set up Global providers, but for now, will only set the navigator for the 
        app,
*/
// import { Slot } from 'expo-router'; //the slot is rendering only for 1 page
import { Stack } from 'expo-router'; // render with Stack from React Navigation

export default function RootLayout() {
    // return <Slot />; * render only this screen
    // return null; // returning null to overide the [name].jsx
    return ( // rendering wih the Stack with index, navigator function
        <Stack> 
            <Stack.Screen name='index' options={{ title: 'Exercise' }} />
        </Stack>
    ) 
}