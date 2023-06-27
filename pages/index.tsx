import Image from "next/image";
import { Inter } from "next/font/google";
import SimpleDropdown from "@/components/dropdown/SimpleDropdown";
import SingleTabulatorDropdown from "@/components/dropdown/Single/SingleTabultorDropdown";
import MultiGroupDropdown from "@/components/dropdown/Multi/MultiGroupDropdown";
import SimpleCategoryDropdown from "@/components/dropdown/SimpleCategoryDropdown";
import MultiTabulatorDropdown from "@/components/dropdown/Multi/MultiTabulatorDropdown";
import MultiBothSearchDropdown from "@/components/dropdown/Multi/MultiBothSearchDropdown";
import GridDropdown from "@/components/dropdown/GridDropdown";
import SelectQueueTopicTest from "@/components/Modal/Select/SelectQueueTopicTest";
import QueueListProertyTest from "@/components/Modal/List/queueListPropertyTest";
import QueueProertyTest from "@/components/Modal/List/queuePropertyTest";
import DoubleCalendarWithTimePicker from "@/components/timeSetting/DoubleCalenderWithTimePicker";
import OneDoubleDatePicker from "@/components/timeSetting/OneDoubleDatePicker";
import QuickDatePicker from "@/components/timeSetting/QuickDatePicker";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div style={{ height: "800px", background: "#f7ddd1" }}>
        <div style={{ display: "flex", gap: 50, marginBottom: 100 }}>
          <div>
            <SelectQueueTopicTest />
            <QueueListProertyTest />
            <QueueProertyTest />
          </div>
          <br />
          <br />
          <SimpleDropdown />
          <br />
          <SimpleCategoryDropdown />
          <br />
          <MultiGroupDropdown />
          <br />
        </div>
        <div style={{ display: "flex", gap: 60, marginBottom: 100 }}>
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
        </div>
        <div style={{ display: "flex", gap: 60, marginBottom: 100 }}>
          <br />
          <DoubleCalendarWithTimePicker />
          <br />
          <OneDoubleDatePicker />
          <br />
          <QuickDatePicker />
          <br />
          <SingleTabulatorDropdown />
          <br />
        </div>
        {/* <SimpleGridComponent /> */}
      </div>
    </>
  );
}
