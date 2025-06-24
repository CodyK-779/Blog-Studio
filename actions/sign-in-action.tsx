"use server";

import { auth } from "@/lib/auth";

const SignInAction = async (formData: FormData) => {
  const email = String(formData.get("email"));
  if (!email) return { error: "Email can't be Empty." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Password can't be Empty." };

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error: any) {
    console.error("SignIn error: ", error);

    if (error.message.includes("Invalid email")) {
      return { error: "Please enter a valid email address." };
    }

    if (error.message.includes("Invalid password")) {
      return { error: "Please enter a valid password." };
    }

    return {
      error: "An error occurred during signup. Please try again later.",
    };
  }

  return { error: null };
};

export default SignInAction;
