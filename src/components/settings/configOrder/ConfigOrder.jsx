import React from "react";
import styled from "styled-components";

const ConfigOrderWrapper = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primaryShade};
  margin-left: 1rem;
`;

const ConfigOrder = (props) => {
  const circleConfig = {
    viewBox: "0 0 38 38",
    radius: 25,
    strokeWidth: 6,
    displayPercentage: 75,
  };

  const circumference = 2 * Math.PI * circleConfig.radius;
  const cx = circleConfig.radius + circleConfig.strokeWidth;
  const cy = circleConfig.radius + circleConfig.strokeWidth;

  return (
    <ConfigOrderWrapper>
      {/* <figure>
        <svg
          style={{
            height: 2 * circleConfig.radius + 2 * circleConfig.strokeWidth,
            width: 2 * circleConfig.radius + 2 * circleConfig.strokeWidth,
          }}
        >
          <circle
            className="ring"
            cx={cx}
            cy={cy}
            r={circleConfig.radius}
            strokeWidth={circleConfig.strokeWidth}
            fill="transparent"
            stroke="#bababa"
          />
          <circle
            className="ring"
            cx={cx}
            cy={cy}
            r={circleConfig.radius}
            strokeWidth={circleConfig.strokeWidth}
            fill="transparent"
            stroke="teal"
            strokeDasharray={[
              (circleConfig.displayPercentage * circumference) / 100,
              ((100 - circleConfig.displayPercentage) * circumference) / 100,
            ].join(",")}
            strokeDashoffset={(25 * circumference) / 100}
          />
          <g>
            <text
              x={cx - circleConfig.radius / 4}
              y={cy + circleConfig.radius / 4}
              writingMode={"rl"}
              fontSize={circleConfig.radius / 2}
            >
              {`${circleConfig.displayPercentage}`}
            </text>
          </g>
        </svg>
      </figure> */}
    </ConfigOrderWrapper>
  );
};

export default ConfigOrder;
