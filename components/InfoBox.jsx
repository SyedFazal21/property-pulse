import React from "react";
import Link from "next/link";

export default function InfoBox({
    heading,
    backGroundColor='bg-gray-100',
    textColor = 'text-gray-800',
    buttonInfo,
    children
}) {
  return (
    <div className={`${backGroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
        {children}
      </p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backGroundColor} inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
