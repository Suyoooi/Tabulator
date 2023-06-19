import Image from "next/image";
import { Inter } from "next/font/google";
import ExportTest from "@/components/exportTest";
import GridComponent from "@/components/gridComponent";
import TabulatorGrid from "@/components/tabulatorGrid";
import EmsGridTest from "@/components/emsGridTest";
import DataAppend from "@/components/data/dataAppend";
import DataPreAppend from "@/components/data/dataPreAppend";
import MultiSelectDropdown from "@/components/dropdown/Multi/MultiSelectDropdown";
import SingleSelectDropdown from "@/components/dropdown/Single/SingleSelectDropdown";
import DropdownTest from "@/components/dropdown/dropdownTest";
import TabulatorDataTree from "@/components/tabulatorDataTree";
import BasicDropdown from "@/components/dropdown/BasicDropdown";
import SimpleDropdown from "@/components/dropdown/SimpleDropdown";
import SingleTabulatorDropdown from "@/components/dropdown/Single/SingleTabultorDropdown";
import MultiGroupDropdown from "@/components/dropdown/Multi/MultiGroupDropdown";
import MultiSearchDropdown from "@/components/dropdown/Multi/MultiSearchDropdown";
import SimpleCategoryDropdown from "@/components/dropdown/SimpleCategoryDropdown";
import SingleSearchDropdown from "@/components/dropdown/Single/SingleSearchDropdown";
import MultiTabulatorDropdown from "@/components/dropdown/Multi/MultiTabulatorDropdown";

const inter = Inter({ subsets: ["latin"] });

const emsOptions = [
  { value: "ems1", label: "ems1" },
  { value: "ems2", label: "ems2" },
  { value: "ems3", label: "ems3" },
];

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const subMenuOptions = [
  { value: "subOption1", label: "Sub Option 1" },
  { value: "subOption2", label: "Sub Option 2" },
  { value: "subOption3", label: "Sub Option 3" },
];

export default function Home() {
  return (
    <>
      <div>관리자 화면 정의서 Dropdown</div>
      <br />
      <SimpleDropdown />
      <br />
      <SimpleCategoryDropdown />
      <br />
      <MultiGroupDropdown />
      <br />
      <div>모니터 화면 정의서 Dropdown</div>
      <br />
      <SingleTabulatorDropdown />
      <br />
      <MultiTabulatorDropdown />
      {/* <MultiSearchDropdown /> */}
      {/* <BasicDropdown /> */}
      {/* <SimpleDropdown /> */}
      <br />
      {/* <SingleSelectDropdown /> */}
      <br />
      {/* <SingleTabulatorDropdown /> */}
      <br />
      {/* <MultiSelectDropdown /> */}
      <br />
      {/* <MultiTabulatorDropdown /> */}
      {/* <TabulatorDataTree /> */}
      {/* <DataAppend /> */}
      {/* <DataPreAppend /> */}
      {/* <EmsGridTest /> */}
      {/* <TabulatorGrid /> */}
      {/* <GridComponent /> */}
      {/* <ExportTest /> */}
    </>
  );
}
