import React from "react";

import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import Categories from "../../components/pages/Admin/Categories";
import Plans from "../../components/pages/Admin/Plans";
import History from "../../components/pages/Admin/History";

import { useNavigate } from "react-router-dom";

import "./admin.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        width: "100%",
      }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "flex-start",
        height: "100vh",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label={<span className="tabs-title">Categories</span>} />
        <Tab label={<span className="tabs-title">Plans</span>} />
        <Tab label={<span className="tabs-title">History</span>} />
        <Tab
          label={<span className="tabs-title logout-tab">Logout</span>}
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
            localStorage.removeItem("token");
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Categories />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Plans />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
    </Box>
  );
}
