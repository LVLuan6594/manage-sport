import React from "react";
import RecruitmentHeader from "@/components/recruitment-header";

export default function XetTuyenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <RecruitmentHeader />
      {children}
    </div>
  );
}
