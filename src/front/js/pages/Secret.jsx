import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Secret = () => {
  const { store } = useContext(Context);

  return <div>{JSON.stringify(store)}</div>;
};

export default Secret;
