import React from "react";
import styled from "styled-components";
import SettingsHeader from "../common/SettingsHeader";

const Wrapper = styled.div`
  flex: 2;
  background-color: ${(props) => props.theme.colors.primaryShade};
  margin-bottom: 1rem;

  ${SettingsHeader} {
    border-radius: 0px;
  }

  form {
    height: auto;
  }

  &:last-child {
    margin-bottom: 0px;
  }

  .component-data-loading {
    opacity: 0.8;
    pointer-events: none;
    filter: blur(4px);
    cursor: not-allowed;
  }
`;

const Loader = styled(Wrapper)`
  padding: 0 0 1rem 0;
`;

class SettingsBlockWrapper extends React.Component {
  render() {
    return (
      <Wrapper>
        <Loader
          aria-disabled={!this.props.dataLoaded}
          className={!this.props.dataLoaded && "component-data-loading"}
        >
          <SettingsHeader title={this.props.title} />
          {this.props.children}
        </Loader>
      </Wrapper>
    );
  }
}

export default SettingsBlockWrapper;
