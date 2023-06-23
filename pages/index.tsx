import Image from "next/image";
import { Inter } from "next/font/google";
import SimpleDropdown from "@/components/dropdown/SimpleDropdown";
import SingleTabulatorDropdown from "@/components/dropdown/Single/SingleTabultorDropdown";
import MultiGroupDropdown from "@/components/dropdown/Multi/MultiGroupDropdown";
import SimpleCategoryDropdown from "@/components/dropdown/SimpleCategoryDropdown";
import MultiTabulatorDropdown from "@/components/dropdown/Multi/MultiTabulatorDropdown";
import MultiBothSearchDropdown from "@/components/dropdown/Multi/MultiBothSearchDropdown";
import GridDropdown from "@/components/dropdown/GridDropdown";
import SelectQueueTopicTest from "@/components/Modal/SelectQueueTopicTest";
import SimpleGridComponent from "@/components/GridTest/simpleGridComponent";
import ExportTest from "@/components/GridTest/exportTest";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div style={{ height: "800px", background: "#f7ddd1" }}>
        {/* <SelectQueueTopicTest />
        <div style={{ display: "flex", gap: 50, marginBottom: 100 }}>
          <SelectQueueTopicTest />
          <br />
          <br />
          <SimpleDropdown />
          <br />
          <SimpleCategoryDropdown />
          <br />
          <MultiGroupDropdown />
          <br />
        </div> */}
        {/* <div style={{ display: "flex", gap: 60, marginBottom: 100 }}>
          <br />
          <SingleTabulatorDropdown />
          <br />
          <MultiTabulatorDropdown />
          <br />
          <MultiBothSearchDropdown />
          <br />
          <MultiGroupDropdown />
          <br />
          <GridDropdown />
        </div> */}
        <SimpleGridComponent />
        <ExportTest />
      </div>
    </>
  );
}
