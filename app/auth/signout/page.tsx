"use client";

import { supabase } from "@/app/libs/supabase";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const fetchSignOut = async () => {
      const { error } = await supabase.auth.signOut();
      console.log(error?.cause);
    };
    fetchSignOut();

    redirect("/");
  }, []);

  return <></>;
}
