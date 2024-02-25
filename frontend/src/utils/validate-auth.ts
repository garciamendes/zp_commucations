import { redirect } from "react-router-dom";
import { token } from "../service/api";

export const validatedAuth = async () => {
  if (!token) {
    return redirect("/")
  }

  return null
}