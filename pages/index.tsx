import Image from "next/image";
import { Inter } from "next/font/google";
import ExportTest from "@/components/exportTest";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ExportTest />
    </>
  );
}
