"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, Suspense, useState } from "react";

function SearchParams({
  setEmail,
}: {
  setEmail: Dispatch<SetStateAction<string | null>>;
}) {
  const searchParams = useSearchParams();
  setEmail(searchParams.get("email"));

  return <></>;
}

export default function Page() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <div>
      <Suspense>
        <SearchParams setEmail={setEmail} />
      </Suspense>
      <h1 className="font-semibold text-2xl">인증 발송</h1>
      <div className="my-7">
        <p>{email} 으로 인증 메일이 발송되었습니다.</p>
        <p>아래의 버튼을 클릭하여, 로그인 페이지로 이동할 수 있습니다.</p>
      </div>
      <Link
        href={"auth/signin"}
        className="hover:gap-x-4 gap-x-2 flex duration-300 hover:text-neutral-500"
      >
        <a>로그인하기</a>
        <a>→</a>
      </Link>
    </div>
  );
}
