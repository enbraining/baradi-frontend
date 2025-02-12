"use client";

import { supabase } from "@/app/libs/supabase";
import { useCallback } from "react";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function Page() {
  const onSignUp = useCallback(async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      alert("이메일이나 비밀번호가 비어있습니다.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    redirect("/");
  }, []);

  return (
    <div>
      <h1 className="font-semibold text-2xl">로그인</h1>
      <hr className="my-5 border-neutral-600" />
      <Form action={onSignUp} className="grid gap-y-2 w-[35rem] mt-8">
        <input
          name="email"
          type="email"
          className="bg-neutral-800 py-3 px-5 rounded-full"
          placeholder="이메일"
        />
        <input
          name="password"
          type="password"
          className="bg-neutral-800 py-3 px-5 rounded-full"
          placeholder="비밀번호"
        />
        <div className="mt-8">
          <button className="flex gap-x-2 hover:gap-x-4 hover:text-neutral-500 duration-300">
            <a>접속하기</a>
            <a>→</a>
          </button>
        </div>
      </Form>
    </div>
  );
}
