import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

const TabulatorGrid = () => {
  const columns = [
    {
      formatter: "responsiveCollapse",
      width: 30,
      minWidth: 30,
      hozAlign: "center",
      resizable: false,
      headerSort: false,
    },
    { title: "ID", field: "id", width: 50, sorter: "number" },

    { title: "Product", field: "product", hozAlign: "center", editor: true },
    { title: "Price", field: "price", hozAlign: "left" },
    { title: "Quantity", field: "quantity", responsive: 1 },
    {
      title: "Availability",
      field: "availability",
      editor: "select",
      editorParams: { values: ["Enable", "Disable"] },
    },
  ];

  var list = [
    {
      id: 1,
      price: 2,
      quantity: 6,
      product: "Apples",
      availability: "Enable",
    },
    {
      id: 2,
      price: 2,
      quantity: 2,
      product: "Oranges",
      availability: "Enable",
    },
    {
      id: 3,
      price: 1,
      quantity: 2,
      product: "Bananas",
      availability: "Enable",
    },
    {
      id: 4,
      price: 5,
      quantity: 1,
      product: "Strawberry",
      availability: "Disable",
    },
  ];

  const options = {
    responsiveLayoutCollapseStartOpen: true,
    responsiveLayout: "collapse",
    layout: "fitColumns",
  };

  return (
    <>
      <div>
        <ReactTabulator options={options} data={list} columns={columns} />
      </div>
    </>
  );
};

export default TabulatorGrid;
