import React from "react";
import { v4 as uuid } from "uuid";

import Button from "../util/Button";
import Link from "../util/Link";

export default function Index() {
  return (
    <div>
      HOME PAGE
      <Button color="blue">
        <Link to={`/room/create`}>Create a room</Link>
      </Button>
    </div>
  );
}
