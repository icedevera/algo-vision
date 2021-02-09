import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface IProps {
  infoModalOpen: boolean;
  handleInfoModalClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "60%",
      height: "60%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      transform: `translate(-50%, -50%)`,
      outline: "none",
    },
    tabsBar: {
      width: "100%",
      borderRadius: "5px 5px 0 0",
      backgroundColor: "#1976d2",
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `info-tab-${index}`,
    "aria-controls": `info-tabpanel-${index}`,
  };
}

const InfoModal: React.FC<IProps> = ({
  infoModalOpen,
  handleInfoModalClose,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [tab, setTab] = React.useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <Modal
        open={infoModalOpen}
        onClose={handleInfoModalClose}
        aria-labelledby="info-modal-title"
        aria-describedby="Get up to speed with the algorithm visualizer through this information modal"
      >
        <div className={classes.paper}>
          <AppBar className={classes.tabsBar} position="static">
            <Tabs value={tab} onChange={handleTabChange} aria-label="info tabs">
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Pathfinding Algorithms" {...a11yProps(1)} />
              <Tab label="Mazes & Patterns" {...a11yProps(2)} />
              <Tab label="Barriers & Weights" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={tab} index={2}>
            Item Three
          </TabPanel>
        </div>
      </Modal>
    </>
  );
};

export default InfoModal;
