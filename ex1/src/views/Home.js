import React from 'react';
import Table from "../components/table";

function Home(props) {
  return (
    <React.Fragment>
      <Table picArray={props.picArray}/>
    </React.Fragment>
  );
}

export {Home};