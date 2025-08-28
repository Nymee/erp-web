import type { Login } from "../../../interfaces/interfaces";
import type { SignUp } from "../../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

async function loginUser(payload: Login) {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      //if status is not 2xx
      const error = await res.json();
      throw new Error(error || "Login failed");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function signUp(payload: SignUp) {
  try {
    const res = await fetch(`${apiUrl}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error || "Sign Up failed");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export default { loginUser, signUp };
