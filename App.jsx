// import Clock from "@/Screens/ClockScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-url-polyfill/auto";
import ShiftFormScreen from "./Screens/ShiftFormScreen";
import ClockScreen from "./Screens/ClockScreen";
import EmployeesAdminScreen from "./Screens/EmployeesAdminScreen";
import TimesheetScreen from "./Screens/TimesheetEmployeeScreen";
import TimesheetAdminScreen from "./Screens/TimesheetAdminScreen";
import SettingsScreen from "./Screens/Settings";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import { AppStateProvider } from "./context/AppStateContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClockScreen"
            component={ClockScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmployeesAdminScreen"
            component={EmployeesAdminScreen}
          />
          <Stack.Screen name="TimesheetScreen" component={TimesheetScreen} />
          <Stack.Screen
            name="TimesheetAdminScreen"
            component={TimesheetAdminScreen}
          />
          <Stack.Screen name="ShiftFormScreen" component={ShiftFormScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}
