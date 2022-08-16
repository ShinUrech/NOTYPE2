import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import EventStack from "./EventStack";
import { PassStack } from "./PassStack";
import { SelectionScreen } from "./SelectionScreen";

const Stack = createNativeStackNavigator()

export const MainStack = () => {
    return(
            <Stack.Navigator>
                <Stack.Screen name='SelectionScreen' component={SelectionScreen} />
                <Stack.Screen name='EventStack' component={EventStack} />
                <Stack.Screen name='PassStack' component={PassStack}/>
            </Stack.Navigator>
    )
}