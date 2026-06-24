"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { ssr: false }
);

export default function CyberMannequin() {
  return (
    <Spline scene="https://prod.spline.design/nDALZbRhw6oSRd1s/scene.splinecode" />
  );
}