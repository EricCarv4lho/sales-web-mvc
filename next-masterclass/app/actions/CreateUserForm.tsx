"use server";
import { cookies } from "next/headers";

export async function CreateUserForm(
  formData: FormData,
  mode: "login" | "signup"
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const dataBody: {
    email: string;
    password: string;
    confirmPassword?: string;
  } = { email, password };

  if (formData.has("confirmPassword")) {
    dataBody.confirmPassword = formData.get("confirmPassword") as string;
  }

  const uri = mode === "login" ? "login" : "register";

  const response = await fetch(`http://localhost:5225/api/Auth/${uri}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataBody),
    credentials: "include",
  });

  if (!response.ok) {
    // ler o JSON de erro da API
    const errorJson = await response.json();
    return { success: false, message: errorJson.message };
  }

  const result = await response.json();

  if (result.token) {
    const cookieStore = await cookies();

    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 20,
    });
  }

  return { success: true, data: result };
}
