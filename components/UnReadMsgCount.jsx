import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";

export default function UnReadMsgCount({session}) {

    const {count, setCount} = useGlobalContext();

    useEffect(() => {
        if(!session) return;

        const fetchCount = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/messages/unread-count`);
                if(res.status === 200) {
                    const data = await res.json();
                    setCount(data);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchCount();
    }, [])
  return count > 0 && (
    <span
      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 
                text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2
                bg-red-600 rounded-full"
    >
      {count}
    </span>
  );
}
