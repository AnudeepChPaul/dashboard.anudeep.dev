import React from "react";
import styled from "styled-components";
import DashTool from "@/components/dashboard/toolbar/Toolbar";
import dynamic from "next/dynamic";
import MenuLayout from "@/components/common/layout/MenuLayout";

const Dash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  height: 36rem;
`;

const AnalyticsPhase1 = dynamic(() =>
  import("@/components/dashboard/analytics/AnalyticsPhase1")
);

const AnalyticsPhase2 = dynamic(() =>
  import("@/components/dashboard/analytics/AnalyticsPhase2")
);

const AnalyticsTraffic = dynamic(() =>
  import("@/components/dashboard/analytics/AnalyticsTraffic")
);

export default function Dashboard() {
  //console.log('Rendering Dashboard');
  return (
    <MenuLayout>
      <Dash>
        <DashTool />
        <AnalyticsPhase1 />
        <AnalyticsPhase2 />
        <AnalyticsTraffic />
      </Dash>
    </MenuLayout>
  );
}
