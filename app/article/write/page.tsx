"use client";

import { supabase } from "@/app/libs/supabase";
import { User } from "@supabase/supabase-js";
import Form from "next/form";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) redirect("/");

      setUser(userData.user);
    };
    fetchUser();
  }, []);

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      if (!title || !content) {
        alert("제목이나 내용이 비어있습니다.");
        return;
      }

      if (user) {
        await supabase.from("article").insert({
          user_id: user.id,
          title: title,
          content: content,
        });
      }

      redirect("/");
    },
    [user]
  );

  return (
    <Form action={onSubmit} className="grid gap-y-3">
      <div className="grid grid-cols-6 gap-x-2">
        <input
          name="title"
          type="text"
          className="bg-neutral-800 py-3 px-5 rounded-xl col-span-5"
          placeholder="제목"
        />
        <button className="bg-neutral-800 py-3 rounded-xl col-span-1">
          작성하기
        </button>
      </div>
      <textarea
        name="content"
        className="bg-neutral-800 py-3 px-5 rounded-xl w-full h-[70vh]"
      ></textarea>
    </Form>
  );
}
