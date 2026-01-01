"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserForm } from "@/app/actions/CreateUserForm";
import { useRouter } from "next/navigation";

export default function LoginForm(props: any) {
  type DataUserForm = {
    email: string;
    password: string;
    confirmPassword?: string;
  };

  const router = useRouter();

  const { register, handleSubmit } = useForm<DataUserForm>();

  const [mode, setMode] = useState<"login" | "signup">(props.mode);

  const [error, setError] = useState<string | null>(null);

  const onSubmitLogin = async (data: DataUserForm) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await CreateUserForm(formData, mode);

    if (!result.success) {
      setError(result.message); // mostrar erro no form
    } else {
      setError(null);

      router.push("/dashboard");
    }
  };

  const onSubmitRegister = async (data: DataUserForm) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.confirmPassword) {
      formData.append("confirmPassword", data.confirmPassword);
    }

    const result = await CreateUserForm(formData, mode);

    if (!result.success) {
      setError(result.message);
    } else {
      setError(null);
      router.push("/dashboard");

      console.log(result.data);
    }
  };

  return (
    <div className="h-auto bg-white flex flex-col gap-10 py-20 pb-40 px-15 max-w-md">
      <p className="text-3xl font-sans text-blue-600">
        {" "}
        Acesse nosso sistema de vendas para gerenciar seus produtos, clientes e
        pedidos de forma rápida e prática.
      </p>

      {mode === "login" ? (
        <>
          <p className="text-gray-400">
            Welcome back! Please login to your account.
          </p>
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="flex flex-col gap-20"
          >
            <div className="flex flex-col gap-5">
              <input
                required
                className="w-full border border-black/10 p-2 rounded-md focus:outline-none focus:border-blue-600"
                type="text"
                placeholder="email"
                {...register("email")}
              />

              <input
                required
                className="w-full border border-black/10 p-2 rounded-md focus:outline-none focus:border-blue-600"
                type="password"
                placeholder="senha"
                {...register("password")}
              />
            </div>

            <div className="flex gap-15 justify-center">
              <button
                className="bg-blue-600  py-3 px-10 text-white shadow-lg cursor-pointer "
                type="submit"
              >
                Login
              </button>

              <button
                className="border border-black/10 py-3 px-10 text-blue-600 cursor-pointer hover:border-blue-600/50"
                type="button"
                onClick={() => {
                  setMode("signup");
                }}
              >
                Sign Up
              </button>
            </div>

            <p className="text-red-500 text-center">{error}</p>
          </form>
        </>
      ) : (
        <>
          <p className="text-gray-400">
            Hello! Please register to your account.
          </p>
          <form
            onSubmit={handleSubmit(onSubmitRegister)}
            className="flex flex-col gap-20"
          >
            <div className="flex flex-col gap-5">
              <input
                required
                className="w-full border border-black/10 p-2 rounded-md focus:outline-none focus:border-blue-600"
                type="email"
                placeholder="email"
                {...register("email")}
              />

              <input
                required
                className="w-full border border-black/10 p-2 rounded-md focus:outline-none focus:border-blue-600"
                type="password"
                placeholder="senha"
                {...register("password")}
              />
              <input
                required
                className="w-full border border-black/10 p-2 rounded-md focus:outline-none focus:border-blue-600"
                type="password"
                placeholder="confirmar senha"
                {...register("confirmPassword")}
              />
            </div>

            <div className="flex gap-15 justify-center">
              <button
                className="bg-blue-600  py-3 px-10 text-white shadow-lg cursor-pointer "
                type="submit"
              >
                Sign Up
              </button>

              <button
                className="border border-black/10 py-3 px-10 text-blue-600 cursor-pointer hover:border-blue-600/50"
                type="button"
                onClick={() => {
                  setMode("login");
                }}
              >
                Login
              </button>
            </div>

            <p className="text-red-500">{error}</p>
          </form>
        </>
      )}
    </div>
  );
}
