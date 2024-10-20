// src/components/ShiftFormScreen.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { ShiftForm, ShiftFormRef } from "@easyteam/ui";
import { Alert, Platform } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

const ShiftFormScreen = ({ navigation, route }) => {
  const { employeeId, date } = route.params;
  const ref = useRef(null);

  useLayoutEffect(() => {
    // Correct date format options
    const dateFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Modify the screen title and add a cancel button to the header
    const screenTitle = date
      ? new Date(date).toLocaleString("en-US", dateFormatOptions)
      : "Add Shift";

    const headerLeft = Platform.select({
      ios: () => (
        <HeaderBackButton
          tintColor="#ff3479"
          onPress={() => navigation.goBack()}
        />
      ),
      default: undefined,
    });

    navigation.setOptions({
      title: screenTitle,
      headerLeft,
    });
  }, [navigation, date]);

  useEffect(() => {
    const preventGoingBack = (e) => {
      if (!ref.current?.unsavedChanges) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        "Unsaved Changes",
        "Are you sure you want to discard the changes?",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Yes",
            style: "destructive",
            // If the user confirmed, then continue with the action
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    };

    const unsubscribe = navigation.addListener(
      "beforeRemove",
      preventGoingBack
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <Layout>
      <ShiftForm
        ref={ref}
        employeeId={route.params.employeeId}
        shiftDate={route.params.date}
        onSaveSuccess={() => navigation.goBack()}
        onCancelPress={() => navigation.goBack()}
        onEvent={(event) => console.log(event)}
      />
    </Layout>
  );
};

export default ShiftFormScreen;
