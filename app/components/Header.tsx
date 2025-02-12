"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, [pathname]);

  return (
    <header className="pt-6 pb-14 flex items-center">
      <div className="flex gap-x-3 items-center">
        <Link href={"/"} className="font-semibold text-xl">
          Baradi
        </Link>
        <p className="text-sm">어떤 시라도</p>
      </div>
      <div className="ml-auto">
        {user ? (
          <div className="flex items-center gap-x-1">
            <Link
              href={"/article/write"}
              className="border border-neutral-700 py-2 px-8 rounded-full"
            >
              작성하기
            </Link>
            <Link
              href={"/auth/signout"}
              className="bg-neutral-200 text-neutral-800 py-2 px-8 rounded-full"
            >
              로그아웃
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <Link
              href={"/auth/signin"}
              className="border border-neutral-700 py-2 px-8 rounded-full"
            >
              로그인
            </Link>
            <Link
              href={"/auth/signup"}
              className="bg-neutral-200 text-neutral-800 py-2 px-8 rounded-full"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
