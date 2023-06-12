import Image from "next/image";
import { Inter } from "next/font/google";
import ExportTest from "@/components/exportTest";
import GridComponent from "@/components/gridComponent";
import TabulatorGrid from "@/components/tabulatorGrid";
import EmsGridTest from "@/components/emsGridTest";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <EmsGridTest />
      <TabulatorGrid />
      <GridComponent />
      <ExportTest />
    </>
  );
}
