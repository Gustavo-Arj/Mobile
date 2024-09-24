import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import TabNavigator from './TabNavigator';
import UserProfileScreen from '../../screens/UserProfileScreen';
import PostScreen from '../../screens/PostScreen';


const Stack = createStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" options={{
                headerShown:false
            }} component={TabNavigator} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />


            
        </Stack.Navigator>
    )
}
