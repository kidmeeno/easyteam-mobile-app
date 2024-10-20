import React, { useRef, useState } from "react";
import { Timesheet, TimesheetRef } from "@easyteam/ui";
import Layout from "@/components/Layout";

const TimesheetScreen = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const ref = useRef(null);
  return (
    <Layout>
      <Timesheet
        ref={ref}
        onDateRangeChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        }}
        startDate={startDate}
        endDate={endDate}
        onEvent={(event) => console.log(event)}
      />
    </Layout>
  );
};

export default TimesheetScreen;
