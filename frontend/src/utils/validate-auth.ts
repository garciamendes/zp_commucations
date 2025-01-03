import { redirect } from "react-router-dom";
import { localStorage } from ".";

export const validatedAuth = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return redirect("/")
  }

  return null
}