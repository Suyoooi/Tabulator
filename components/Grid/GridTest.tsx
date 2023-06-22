import React, { useState } from "react";
import Grid from "./Grid";

interface IDataItem {
  id: number;
  group: string;
  server: string;
}

const initialData: IDataItem[] = [
  { id: 1, group: "a", server: "EMS1" },
  { id: 2, group: "a", server: "EMS2" },
  { id: 3, group: "b", server: "EMS3" },
  { id: 5, group: "c", server: "EMS4" },
  { id: 6, group: "d", server: "EMS5" },
  { id: 7, group: "e", server: "EMS6" },
  { id: 8, group: "b", server: "EMS7" },
];

const GridTest: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>(initialData);

  const [headers, setHeaders] = useState(["id", "group", "server", "test"]);

  const addColumn = () => {
    const newData = data.map((item) => ({ ...item, state: "unknown" }));
    const newHeaders = [...headers, "state"];
    setData(newData);
    setHeaders(newHeaders);
  };

  return (
    <div>
      <Grid
        data={initialData}
        headers={headers}
        fieldLabel={"grid component test"}
      />
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
};

export default GridTest;
