// baseQuery.ts
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const defaultBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { auth = false } = args as { auth?: boolean };

  const headers = new Headers();
  if (auth) {
    const token = sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  let fetchArgs: FetchArgs;
  if (typeof args === "string") {
    fetchArgs = { url: args, method: "GET", headers };
  } else {
    fetchArgs = {
      ...args,
      headers: new Headers(args.headers).set(
        "Authorization",
        headers.get("Authorization") || "",
      ),
    };
  }

  return defaultBaseQuery(fetchArgs, api, extraOptions);
};
