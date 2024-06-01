import { getCookie } from "cookies-next";

export const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
  };
  