"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { observer } from "mobx-react-lite";
import User from "./User";
import Task from "./Task";

const Home = observer(() => {
  return (
    <>
      {/* <User /> */}
      <Task />
    </>
  );
});
export default Home;
