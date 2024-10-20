// src/components/Clock.js
import Layout from "@/components/Layout";
import React from "react";
import { Clock } from "@easyteam/ui"; 
import { View, Text } from "react-native";

const ClockScreen = () => {
  return (
    <Layout>
      <Clock onEvent={event => console.log(event)}/>
    </Layout>
  );
};

export default ClockScreen;
