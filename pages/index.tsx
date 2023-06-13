import Image from "next/image";
import { Inter } from "next/font/google";
import ExportTest from "@/components/exportTest";
import GridComponent from "@/components/gridComponent";
import TabulatorGrid from "@/components/tabulatorGrid";
import EmsGridTest from "@/components/emsGridTest";
import EmsSrvr from "@/components/emsSrvr";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <EmsSrvr />
      <EmsGridTest />
      <TabulatorGrid />
      <GridComponent />
      <ExportTest />
    </>
  );
}
