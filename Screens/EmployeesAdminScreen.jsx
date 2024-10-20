import React, { useLayoutEffect, useMemo, useRef } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { EmployeeListRef, EmployeesTimesheet } from "@easyteam/ui";
import Layout from "@/components/Layout";


const EmployeesScreen = ({ navigation, route }) => {
  const ref = useRef(null);

  // Memoize startDate and endDate from route.params
  const startDate = useMemo(() => {
    return route.params ? route.params?.startDate : undefined;
  }, [route.params]);

  const endDate = useMemo(() => {
    return route.params ? route.params.endDate : undefined;
  }, [route.params]);

  useLayoutEffect(() => {
    // Reload the report data when the screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      ref.current?.reloadData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Layout>
      <EmployeesTimesheet
        ref={ref}
        onEmployeeReportPress={({ employeeId, startDate, endDate }) => {
          navigation.navigate("Timesheet", { employeeId, startDate, endDate });
        }}
        onEvent={(event) => console.log(event)}
        startDate={startDate}
        endDate={endDate}
      />
    </Layout>
  );
};

export default EmployeesScreen;
