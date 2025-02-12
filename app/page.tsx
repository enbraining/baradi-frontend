"use client";

import { useEffect, useState } from "react";
import { Article } from "./types/Article";
import { supabase } from "./libs/supabase";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from("article").select("*");
      setArticles(data ?? []);
    };

    fetchArticles();
  }, [articles]);

  return (
    <div className="flex flex-wrap gap-3">
      {articles.map((article) => (
        <Link
          href={`/article/${article.id}`}
          key={article.id}
          className="text-sm px-3 py-5 border rounded-sm border-neutral-600 h-min box-border flex-1 basis-[calc(50%-16px)] md:basis-[calc(33.333%-16px)] lg:basis-[calc(25%-16px)]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              article.content?.replace(/\n/g, "<br/>") ?? ""
            ),
          }}
        ></Link>
      ))}
    </div>
  );
}
