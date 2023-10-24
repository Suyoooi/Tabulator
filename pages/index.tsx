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
import QueueProertyTest from "@/components/Modal/List/genericTableModalButton";
import DoubleCalendarWithTimePicker from "@/components/timeSetting/DoubleCalenderWithTimePicker";
import OneDoubleDatePicker from "@/components/timeSetting/OneDoubleDatePicker";
import QuickDatePicker from "@/components/timeSetting/QuickDatePicker";
import SingleCalendarWithTimePicker from "@/components/timeSetting/SingleCalendarWithTimePicker";
import GenericTableModalButton from "@/components/Modal/List/genericTableModalButton";
import SimpleGridComponent from "@/components/GridTest/simpleGridComponent";
import ExportTest from "@/components/Export/exportTest";
import TabulatorDataTree from "@/components/GridTest/tabulatorDataTree";
import Component1 from "@/components/Project/component1";
import RadioBtnT from "@/components/Project/RadioBtnT";
import RadioBtnF from "@/components/Project/RadioBtnF";
import MiddleBtn from "@/components/Project/MiddleBtn";
import MiddleBtnBlack from "@/components/Project/MiddleBtnBlack";

const inter = Inter({ subsets: ["latin"] });

const columns = [
  { title: "QueueProperty", field: "queueProperty", hozAlign: "center" },
  { title: "Value", field: "value", hozAlign: "center" },
];

const rowData = [
  { queueProperty: "a", value: "EMS1" },
  { queueProperty: "a", value: "EMS2" },
  { queueProperty: "b", value: "EMS3" },
  { queueProperty: "c", value: "EMS4" },
  { queueProperty: "d", value: "EMS5" },
  { queueProperty: "e", value: "EMS6" },
  { queueProperty: "b", value: "EMS7" },
];

const title = "Queue Property";

export default function Home() {
  return (
    <>
      <div style={{ height: "100%", background: "#fde5d2" }}>
        {/* <div style={{ display: "flex", gap: 50, marginBottom: 100 }}>
          <div>
            <TabulatorDataTree />
            <SimpleGridComponent />
          </div>
          <div>
            <SelectQueueTopicTest />
            <GenericTableModalButton
              columns={columns}
              rowData={rowData}
              title={title}
            />
          </div>
          <br />
          <SimpleDropdown />
          <br />
          <SimpleCategoryDropdown />
          <br />
          <MultiGroupDropdown />
          <br />
        </div>
        <div style={{ display: "flex", gap: 60, marginBottom: 50 }}>
          <br />
          <ExportTest />
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginBottom: 100,
          }}
        >
          <br />
          <DoubleCalendarWithTimePicker />
          <br />
          <OneDoubleDatePicker />
          <br />
          <QuickDatePicker />
          <br />
          <SingleCalendarWithTimePicker />
          <br />
        </div> */}
      </div>
    </>
  );
}
