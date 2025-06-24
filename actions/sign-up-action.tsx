"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

const SignUpAction = async (formData: FormData) => {
  const name = String(formData.get("name"));
  if (!name) return { error: "Name can't be Empty." };

  const email = String(formData.get("email"));
  if (!email) return { error: "Email can't be Empty." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Password can't be Empty" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      const errcode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      if (errcode) return { error: error.message };
    }

    return { error: "Internal server error" };
  }

  return { error: null };
};

export default SignUpAction;
