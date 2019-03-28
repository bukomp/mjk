import React from "react";
import Tr from "./tr";

export default function Table(props) {
  let trAll = [];
  for(let i = 0; i < props.picArray.length; i++)
  {
    trAll.push(<Tr num={i} picArray={props.picArray}/>);
  }
  console.log(trAll);
  console.log(<Tr num={1} picArray={props.picArray}/>);
  return(

    <table>
      <tbody>
      {trAll}
      </tbody>
    </table>
  );
}