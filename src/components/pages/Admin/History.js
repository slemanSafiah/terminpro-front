import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { AssuredWorkload, Person } from "@mui/icons-material";

export default function History() {
  const [subs, setSubs] = useState({});
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/user",
      method: "GET",
    }).then((res) => {
      setCounts(() => [
        { type: "cutomers", count: res.data.customers },
        { type: "Institutions", count: res.data.Institutions },
      ]);
    });
  }, []);

  useEffect(() => {
    let token =
      localStorage.getItem("token") &&
      JSON.parse(
        Buffer.from(localStorage.getItem("token"), "base64")
          .toString("utf-8")
          .split("}")[1] + "}"
      );

    axios({
      url: `https://terminpro2022.herokuapp.com/api/payment/subscription?user=${token.id}`,
      method: "GET",
    }).then((res) => {
      setSubs(res.data);
    });
  }, []);

  return (
    <div className="container" style={{ height: "auto" }}>
      <div className="title">Statistics</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "250px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChartContainer counts={counts} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="statistics">Types of Users</div>
          <div className="statistics-type">
            Customers :{" "}
            <span
              style={{
                color: "rgb(206, 57, 174)",
              }}
            >
              {counts[0]?.count}
            </span>
            <Person
              style={{
                marginLeft: "8px",
              }}
            />
          </div>
          <div className="statistics-type">
            Institutions :{" "}
            <span
              style={{
                color: "rgb(206, 57, 174)",
              }}
            >
              {counts[1]?.count}
            </span>{" "}
            <AssuredWorkload
              style={{
                marginLeft: "8px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="title">History</div>
      <Table subs={subs} />
    </div>
  );
}

function Table({ subs: { data, count } }) {
  return (
    <div
      style={{
        height: "450px",
      }}
    >
      <div className="category-table">
        <div>Institution</div>
        <div>SKU - plan</div>
        <div>Start</div>
        <div>End</div>
      </div>
      {data?.map((item) => {
        return (
          <div
            className="category-table"
            style={{
              marginTop: "1em",
              fontSize: "smaller",
            }}
          >
            <div
              style={{
                width: "25%",
              }}
            >
              {item.institution.institutionName}
            </div>
            <div>{item.plan}</div>
            <div>{new Date(item.start).toLocaleString()}</div>
            <div>{new Date(item.end).toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}

function ChartContainer({ counts }) {
  return (
    <Chart
      style={{
        position: "relative",
        // height: "600px",
      }}
    >
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={counts}
          categoryField="type"
          field="count"
        >
          <ChartSeriesLabels
            color="#fff"
            background="none"
            content={(e) => e.category}
          />
        </ChartSeriesItem>
      </ChartSeries>
      <ChartLegend visible={false} />
    </Chart>
  );
}
