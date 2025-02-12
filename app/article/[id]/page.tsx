"use client";

import { supabase } from "@/app/libs/supabase";
import { Article } from "@/app/types/Article";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchId = async () => {
      const { id: paramId } = await params;
      setId(paramId);
    };
    fetchId();
  }, [params]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const fetchArticle = async () => {
      const { data: articleData } = await supabase
        .from("article")
        .select("*")
        .eq("id", id);
      setArticle(articleData?.at(0));
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return (
    <div>
      {user?.id == article?.user_id && (
        <Link
          href={`/article/update/${article?.id}`}
          className="text-neutral-500"
        >
          수정하기
        </Link>
      )}
      <h1 className="mt-3 mb-8 font-semibold text-2xl">{article?.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            article?.content?.replace(/\n/g, "<br/>") ?? ""
          ),
        }}
      ></div>
    </div>
  );
}
