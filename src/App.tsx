/* eslint-disable array-callback-return */
import React, { useMemo } from "react";
import "./App.css";

function App() {
  const timeZoneList = useMemo(() => {
    const unique: any[] = [];

    Intl.supportedValuesOf("timeZone").map((timeZone) => {
      const obj = {
        offset: {},
        timeZone: "",
      };

      const offset = new Intl.DateTimeFormat("en", {
        timeZone: timeZone,
        timeZoneName: "shortOffset",
      }).formatToParts();

      const timeZoneAbbrivation = new Intl.DateTimeFormat("en", {
        timeZone: timeZone,
        timeZoneName: "long",
      }).formatToParts();

      obj["offset"] = offset[6].value;
      obj["timeZone"] = timeZoneAbbrivation[6].value;

      const result = unique.filter((x: any) => x.offset === obj.offset);

      if (result.length === 0) {
        unique.push(obj);
      }
    });

    return unique;
  }, []);

  const sort = useMemo(() => {
    return timeZoneList.sort((a, b) => {
      const re = /^\GMT([+-]\d{1,2}):?(\d{1,2})?\.*$/;
      let bOffset = 0;

      if (b["offset"] !== "GMT") {
        bOffset = parseFloat(b["offset"].replace(re, "$1.$2"));
      }

      const aOffset = parseFloat(a["offset"].replace(re, "$1.$2"));

      return aOffset < bOffset ? -1 : aOffset > bOffset ? 1 : 0;
    });
  }, [timeZoneList]);

  return (
    <div>
      {sort.map((item, index) => (
        <div key={index}>
          <p>
            {item.offset} {item.timeZone}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
