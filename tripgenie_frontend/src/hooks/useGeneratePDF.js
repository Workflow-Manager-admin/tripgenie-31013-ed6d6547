/**
 * Kavia AI Documentation:
 * useGeneratePDF.js - Custom React hook for generating travel itineraries as PDFs.
 *
 * Purpose:
 * - Provides a function (generatePdf) that transforms a trip object into a styled PDF file, ready for download.
 * - Utilizes jsPDF & autotable to format tables and headings.
 * - Used for itinerary export in TripGenie.
 *
 * Usage:
 *   const { generatePdf } = useGeneratePDF();
 *   generatePdf(tripObject);
 */

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// PUBLIC_INTERFACE
const useGeneratePDF = () => {
  /**
   * generatePdf - Takes structured trip data and builds a PDF itinerary with tables.
   * @param {Object} trip - The full trip object (should have userSelection and tripData)
   */
  const generatePdf = (trip) => {
    // Defensive: Ensure data is valid before proceeding.
    if (!trip || !trip?.userSelection) {
      console.error("Invalid trip data provided.");
      return;
    }

    const doc = new jsPDF();

    // Title e.g. "3 Days trip in Jaipur"
    const title = `${trip?.userSelection.noOfDays} Days trip in ${trip?.userSelection.location.label}`;
    doc.setFontSize(18);
    doc.text(title, 10, 10);

    // Prepare array of rows for the table (all places for all days)
    const tableHeaders = ["Location", "Description", "Charges"];
    const tableRows = [];

    // For each day, push each planned place as a row to the table
    trip?.tripData?.itinerary.forEach((item) => {
      item?.plan.forEach((ele) => {
        tableRows.push([
          ele.placeName || "N/A",
          ele.placeDetails || "N/A",
          ele.ticketPricing || "N/A",
        ]);
      });
    });

    // Render the itinerary as a table at the top of the PDF
    autoTable(doc, {
      head: [tableHeaders],
      body: tableRows,
      startY: 20,
    });

    // Build a readable filename using the trip metadata
    const fileName = `${trip?.userSelection.noOfDays}_days_trip_in_${trip?.userSelection.location.label.replace(/\s+/g, "_")}.pdf`;

    // Trigger download
    doc.save(fileName);
  };

  return { generatePdf };
};

export default useGeneratePDF;
