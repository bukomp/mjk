import React from "react";
import {Link} from "react-router-dom";

export default function Tr(props) {
  return(
    <tr key={props.num}>
      <td key={props.num}>
        <img src={"http://media.mw.metropolia.fi/wbma/uploads/"+props.picArray[props.num].filename} width={250} alt="Title" key={props.num}/>
      </td>
      <td key={props.num+1}>
        <h3 key={props.num}>{props.picArray[props.num].title}</h3>
        <p key={props.num+1}>{props.picArray[props.num].description}</p>
      </td>
      <td key={props.num+2}>
        <Link to={`/route/${props.picArray[props.num]["file_id"]}`} key={props.num}>View</Link>
      </td>
    </tr>
  );
}