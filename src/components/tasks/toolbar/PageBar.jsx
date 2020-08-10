import React from "react";
import styled from "styled-components";
import SquaredButton from "@/components/common/inputs/buttons/SquaredButton";
import Banner from "@/components/common/banner/Banner";

const PageBarWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageBarBody = styled.div`
  max-width: 25rem;
  min-width: 25rem;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${SquaredButton} {
    margin: 0;
  }
`;

function PageBar(props) {
  //console.log("Rendering PageBar");
  return (
    <PageBarWrapper>
      <PageBarBody>
        <SquaredButton
          backColor={"primaryShade"}
          color={"secondary"}
          icon="dash-icon-prev"
          onClick={props.onPrevPage}
          disabled={props.currentPage === 0}
        />

        <Banner>
          Displaying Page {props.currentPage + 1 || 0} of{" "}
          {parseInt(Math.ceil(props.totalPage / props.pageSize)) || 0}
        </Banner>

        <SquaredButton
          backColor={"primaryShade"}
          color={"secondary"}
          icon="dash-icon-next"
          onClick={props.onNextPage}
          disabled={props.totalPage - props.currentPage >= 1}
        />
      </PageBarBody>
    </PageBarWrapper>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (selection) => dispatch(deleteTask(selection)),
});

const mapStateToProps = (state) => ({ ...state.tasks });

export default PageBar;
