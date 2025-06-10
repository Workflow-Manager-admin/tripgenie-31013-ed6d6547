/**
 * ============================================================================
 *  TripPdf.jsx - PDF Export/Display Component (Improved)
 *  Used in: Trip Planner apps (e.g. EiRa, Vistara)
 *  Function: Exports trip itinerary to PDF and displays in-page summary.
 * ============================================================================
 */

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import EiRa from "../assets/EiRa1.png";
import logo2 from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const TripPdf = ({ trip }) => {
  const tripData = Array.isArray(trip) ? trip[0] : trip;

  if (
    !tripData ||
    !tripData.tripData?.itinerary ||
    !tripData.userSelection ||
    !tripData.userSelection.location
  ) {
    return <p className="text-center text-gray-500">Loading trip details...</p>;
  }

  const { noOfDays, location } = tripData.userSelection;

  const handleExportPdf = () => {
    try {
      const doc = new jsPDF();
      const tableHeaders = ["Location", "Description", "Charges"];
      const tableRows = [];

      tripData.tripData.itinerary.forEach((item) => {
        item.plan.forEach((ele) => {
          tableRows.push([
            ele.placeName || "N/A",
            ele.placeDetails || "N/A",
            ele.ticketPricing || "N/A",
          ]);
        });
      });

      doc.text(`${noOfDays || "?"} Days trip for ${location.label || "Unknown"}`, 10, 10);

      autoTable(doc, {
        head: [tableHeaders],
        body: tableRows,
        startY: 20,
      });

      doc.save(`${noOfDays}_days_trip_in_${location.label}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Something went wrong while exporting PDF.");
    }
  };

  return (
    <div className="p-4">
      {/* ==== Export Button ==== */}
      <button
        onClick={handleExportPdf}
        className="bg-[#21BCBE] text-white px-4 py-2 rounded hover:bg-[#1aa7a9]"
      >
        Export PDF
      </button>

      {/* ==== Branding Section ==== */}
      <div className="flex my-5 items-start justify-center gap-3 w-40">
        <img
          className="border-2 border-[#21BCBE] h-12 w-12 rounded-full"
          src={logo2}
          alt="logo"
        />
        <Link to="/">
          <img className="w-[80%]" src={EiRa} alt="EiRa" />
        </Link>
      </div>

      {/* ==== Display itinerary day-by-day ==== */}
      {tripData.tripData.itinerary.map((item) => (
        <div className="my-4" key={item.day}>
          <div className="my-8">
            <h1 className="font-bold text-2xl">
              {noOfDays} Days trip for {location.label}
            </h1>
          </div>
          <h2 className="font-bold text-xl mb-3">Day {item.day}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Location</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-right w-[200px]">Charges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.plan.map((ele, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{ele.placeName || "N/A"}</TableCell>
                  <TableCell className="text-center">{ele.placeDetails || "N/A"}</TableCell>
                  <TableCell className="text-right">{ele.ticketPricing || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

// Updated PropTypes to allow array or object
TripPdf.propTypes = {
  trip: PropTypes.oneOfType([
    PropTypes.shape({
      tripData: PropTypes.shape({
        itinerary: PropTypes.arrayOf(
          PropTypes.shape({
            day: PropTypes.number,
            plan: PropTypes.arrayOf(
              PropTypes.shape({
                placeName: PropTypes.string,
                placeDetails: PropTypes.string,
                ticketPricing: PropTypes.string,
              })
            ),
          })
        ),
      }),
      userSelection: PropTypes.shape({
        noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location: PropTypes.shape({
          label: PropTypes.string,
        }),
      }),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        tripData: PropTypes.shape({
          itinerary: PropTypes.array,
        }),
        userSelection: PropTypes.shape({
          noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          location: PropTypes.shape({
            label: PropTypes.string,
          }),
        }),
      })
    ),
  ]),
};

export default TripPdf;
