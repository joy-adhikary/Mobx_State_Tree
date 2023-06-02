"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { observer } from "mobx-react-lite";
import Users from "./Store/store";
import User from "./User";

const Home = observer(() => {
  return (
    <>
      <User />
    </>
  );
});
export default Home;
