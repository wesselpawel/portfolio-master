"use client";
import React, { PropsWithChildren } from "react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";

// ThemeProvider using Redux Provider
export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  return <Provider store={store}>{children}</Provider>;
}
