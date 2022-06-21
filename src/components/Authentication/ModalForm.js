import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "./Login";
import Signup from "./Signup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: "gold" }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ModalForm({handleClose}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "gray" }}>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
                  aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "tomato",
            },
          }}
        >
          <Tab
            label="LOGIN"
            {...a11yProps(0)}
            sx={{
              "&.MuiTab-root": {
                color: "#fff",
                },
                width: '50%'
            }}
            disableRipple
          />
          <Tab
            label="SIGN UP"
            {...a11yProps(1)}
            sx={{
              "&.MuiTab-root": {
                color: "#fff",
                },
                width: '50%'
                
            }}
            disableRipple
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login handleClose={handleClose}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup handleClose={handleClose}/>
      </TabPanel>
    </Box>
  );
}
