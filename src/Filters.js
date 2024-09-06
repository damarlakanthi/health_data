import React from "react";
import "./App.css";

export const Filters = ({
  yearStart,
  setYearStart,
  availableLocations,
  availableYears,
  locationAbbr,
  setLocationAbbr,
  availableTopics,
  topic,
  setTopic,
  availableBreakOut,
  setAvilableBreakOut,
}) => {
  console.log("breakout", typeof availableBreakOut);
  console.log(availableBreakOut);
  console.log("location", typeof locationAbbr);
  return (
    <div className="filters">
      <label>
        Year:
        <select
          value={yearStart}
          onChange={(e) => setYearStart(e.target.value)}
        >
          <option value="">All</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label>
        Location:
        <select
          value={locationAbbr}
          onChange={(e) => setLocationAbbr(e.target.value)}
        >
          <option value="">All</option>
          {availableLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>
      <label>
        Topic:
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="">All</option>
          {availableTopics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        Breakout:
        <select
          value={availableBreakOut}
          onChange={(e) => setAvilableBreakOut(e.target.value)}
        >
          <option value="">All</option>
          {availableBreakOut?.map((br) => (
            <option key={br} value={br}>
              {br}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;
