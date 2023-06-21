import axios from "../axios/axios";
import React from "react";
import { Button } from "react-bootstrap";

const CSVExport = () => {
  // Handle export CSV file
  const handleExportCSV = () => {
    axios
      .get("/api/export-csv", {
        responseType: "blob",
      })
      .then((response) => {
        // Create a download link for the CSV file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error exporting CSV:", error);
      });
  };

  return (
    <div>
      <Button
        onClick={handleExportCSV}
        className="search-right-button"
        variant="danger"
      >
        Export To Csv
      </Button>
    </div>
  );
};

export default CSVExport;
