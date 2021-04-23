import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Index() {
  return (
    <div>
      HOME PAGE
      <button>
        <Link to={`/room/${uuid()}`}>Create a room</Link>
      </button>
    </div>
  );
}
