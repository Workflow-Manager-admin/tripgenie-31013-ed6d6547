/**
 * Kavia AI Documentation:
 * TripPdf.jsx - React component to render and export an itinerary as a PDF and on-screen table.
 * 
 * - Exports trip details to PDF using jsPDF/autotable.
 * - Renders trip overview and each day as a table.
 * 
 * Props:
 *   trip (object): Contains userSelection ({noOfDays, location}) and tripData (itinerary)
 */

import PropTypes from "prop-types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

// PUBLIC_INTERFACE
const TripPdf = ({ trip }) => {
  /**
   * handleExportPdf - Generates and downloads the trip PDF
   */
  const handleExportPdf = () => {
    const doc = new jsPDF();

    const tableHeaders = ["Location", "Description", "Charges"];
    const tableRows = [];

    trip?.tripData?.itinerary.forEach((item) => {
      item?.plan.forEach((ele) => {
        tableRows.push([
          ele.placeName || "N/A",
          ele.placeDetails || "N/A",
          ele.ticketPricing || "N/A",
        ]);
      });
    });

    // Add the title to the PDF
    doc.text(
      `${trip?.userSelection.noOfDays} Days trip for ${trip?.userSelection.location.label}`,
      10,
      10
    );

    // Generate the table using autoTable
    autoTable(doc, {
      head: [tableHeaders],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save(
      `${trip?.userSelection.noOfDays}_days_trip_in_${trip?.userSelection.location.label}.pdf`
    );
  };

  // Render trip export controls and itinerary day-wise table
  return (
    trip && (
      <div>
        <button onClick={handleExportPdf}>Export PDF</button>
        <div className="flex my-5 items-start justify-center gap-3 w-40">
          <img
            className="border-2 border-[#21BCBE] h-12 w-12 rounded-full"
            src={logo2}
            alt="logo"
          />
          <Link to={"/"}>
            <img className="w-[80%]" src={EiRa} alt="logo" />
          </Link>
        </div>

        {trip?.tripData?.itinerary.map((item, index) => (
          <div className="my-4" key={index}>
            <div className="my-8">
              <h1 className="font-bold text-2xl">
                {trip?.userSelection.noOfDays} Days trip for{" "}
                {trip?.userSelection.location.label}
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
                {item?.plan.map((ele, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {ele.placeName}
                    </TableCell>
                    <TableCell className="text-center">
                      {ele.placeDetails}
                    </TableCell>
                    <TableCell className="text-right">
                      {ele.ticketPricing}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    )
  );
};

// PropTypes validation to prevent lint errors and improve reliability
TripPdf.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      noOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      location: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
    tripData: PropTypes.shape({
      itinerary: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  }),
};

export default TripPdf;
