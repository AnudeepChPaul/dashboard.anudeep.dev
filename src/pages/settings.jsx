import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import MenuLayout from "@/commons/layout/MenuLayout";
// import IntroConfig from "@/components/settings/intro/IntroConfig";
// import SkillsConfig from "@/components/settings/skills/SkillsConfig";

const IntroConfig = dynamic(() =>
  import("@/components/settings/intro/IntroConfig")
);
const SkillsConfig = dynamic(() =>
  import("@/components/settings/skills/SkillsConfig")
);
const ConfigOrder = dynamic(() =>
  import("@/components/settings/configOrder/ConfigOrder")
);
const ExperienceConfig = dynamic(() =>
  import("@/components/settings/experience/ExperienceConfig")
);
const ProjectConfig = dynamic(() =>
  import("@/components/settings/projects/ProjectConfig")
);

const SettingsWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const ConfigWraps = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  flex-direction: column;
  max-height: calc(100vh - 6rem);
  overflow-x: hidden;
  overflow-y: scroll;
`;

export default function Settings() {
  return (
    <MenuLayout title="Dashboard | Settings">
      <SettingsWrapper>
        <ConfigWraps flex={2}>
          <IntroConfig />
          <SkillsConfig />
          <ExperienceConfig />
          <ProjectConfig />
        </ConfigWraps>
        {/* <ConfigWraps>
          <ConfigOrder />
        </ConfigWraps> */}
      </SettingsWrapper>
    </MenuLayout>
  );
}
