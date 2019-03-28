import React from "react";
import {Link} from "react-router-dom";

function Nav(){
  return (
    <nav>
      <ul>
        <li key={1}>
          <Link to="/">Home</Link>
        </li>
        <li key={2}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export {Nav};