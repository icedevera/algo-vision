import React from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import logo from "../../Assets/logo.svg";
import neural from "../../Assets/neural.svg";
import rocket from "../../Assets/rocket.svg";
import maze from "../../Assets/maze.svg";
import "./infoModal.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import addBarrier from "../../Assets/gifs/add-barriers.gif";
import addWeights from "../../Assets/gifs/add-weights.gif";
import animationSpeed from "../../Assets/gifs/animation-speed.gif";
import clearReset from "../../Assets/gifs/clear-reset.gif";
import darkMode from "../../Assets/gifs/dark-mode.gif";
import gridSize from "../../Assets/gifs/grid-size.gif";
import selectAlgorithm from "../../Assets/gifs/select-algorithm.gif";
import selectMaze from "../../Assets/gifs/select-maze.gif";
import quickAnalyze from "../../Assets/gifs/quick-analyze.gif";
import moveNodes from "../../Assets/gifs/move-nodes.gif";
import randomNodes from "../../Assets/gifs/random-nodes.gif";
import analysisReport from "../../Assets/analysis-report.png";
import Button from "@material-ui/core/Button";

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
      height: "80%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      transform: `translate(-50%, -50%)`,
      outline: "none",
      overflowY: "auto",
      [theme.breakpoints.down("lg")]: {
        width: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "85%",
        height: "85%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "95%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "95%",
        height: "95%",
      },
    },
    tabsBar: {
      width: "100%",
      borderRadius: "5px 5px 0 0",
      backgroundColor: "#1976d2",
    },
    indicator: {
      backgroundColor: "white",
    },
    tabsFlex: {},
    algoHeading: {
      marginRight: "10px",
    },
    closeButton: {
      position: "fixed",
      bottom: "40px",
      right: "20px",
      zIndex: 100,
    },
    offline: {
      marginTop: "50px",
      fontStyle: "italic",
      textIndent: "0px"
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
      id={`info-tabpanel-${index}`}
      aria-labelledby={`info-tab-${index}`}
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
  const theme = useTheme();
  const classes = useStyles(theme);
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [tab, setTab] = React.useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const mobile = useMediaQuery("(max-width:750px)");
  const mobileClose = useMediaQuery("(max-width:960px)");

  return (
    <>
      <Modal
        open={infoModalOpen}
        onClose={handleInfoModalClose}
        aria-labelledby="info-modal-title"
        aria-describedby="Get up to speed with the algorithm visualizer through this information modal"
      >
        <>
          {mobileClose ? (
            <Button
              className={classes.closeButton}
              onClick={handleInfoModalClose}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          ) : null}
          <div className={classes.paper}>
            <AppBar className={classes.tabsBar} position="sticky">
              <Tabs
                style={{
                  backgroundColor: theme.palette.warning.main,
                }}
                classes={{
                  indicator: classes.indicator,
                  flexContainer: classes.tabsFlex,
                }}
                value={tab}
                onChange={handleTabChange}
                aria-label="info tabs"
              >
                <Tab label="About" {...a11yProps(0)} />
                <Tab
                  label={mobile ? "Algos" : "Pathfinding Algorithms"}
                  {...a11yProps(1)}
                />
                <Tab
                  label={mobile ? "Mazes" : "Mazes & Patterns"}
                  {...a11yProps(2)}
                />
                <Tab label="Tutorial" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
              <div className="heading-container">
                <a
                  className="source-code"
                  href="https://github.com/icedevera/algo-vision"
                  rel="noreferrer"
                  target="_blank"
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >
                  <GitHubIcon fontSize="large" />
                </a>
                <img
                  className="heading-icon"
                  src={logo}
                  alt="algo vision logo"
                />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ fontWeight: "bolder" }}
                >
                  Welcome to Algo Vision!
                </Typography>
              </div>
              <div className="introduction-text">
                <Typography color="textPrimary" variant="h5">
                  The Algo Vision project is an extensive algorithm visualizer
                  with the goal of enabling humans to understand and experience
                  the beauty of algorithms past the zeroes and ones. It has been
                  proven that humans respond and process visual data better than
                  any other form of data. In fact, the human computer (the
                  brain) processes images 60,000 times faster than plain text.
                  Humans are so visually oriented that 90 percent of information
                  transmitted to the brain is visual. Hence, Algo Vision was
                  created as a form of "translator", which relays computer
                  processed data into a human comprehensible one. Therefore, as
                  you interact with the program, I urge you to realize the
                  artistry of mere zeroes and ones orchestrated to optimize the
                  world.
                </Typography>
                <Typography
                  className={classes.offline}
                  color="textPrimary"
                  variant="body1"
                >
                  *Algo Vision is a PWA which means it works offline!
                </Typography>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div className="heading-container">
                <img
                  className="heading-icon"
                  src={neural}
                  alt="neural algorithm icon"
                />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ fontWeight: "bolder" }}
                >
                  Meet the Algorithms
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Dijkstra's
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  A weighted algorithm that guarantees the shortest path.
                  Dijkstra's is one of the most famous algorithms for finding
                  the shortest path between nodes. Some even consider it to be
                  the father of pathinding algorithms. The algorithm finds the
                  shortest distance neighboring node that has been unvisited and
                  updates the distance if it's the shortest one so far. Once it
                  has done this for all the nodes, it picks the shortest one to
                  the target and traces back to the start node to reveal the
                  shortest path.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  A* Search
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  A weighted algorithm that guarantees the shortest path.
                  Arguably the most efficient way to find a shortest path. A* is
                  derived from Dijkstra's but uses a heuristic (total distance
                  from start node to end node) in order to determine which node
                  to analyze. Analysis becomes even quicker if incorporated with
                  a binary min-heap (utilized in this project).
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Greedy Best-first Search
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  A weighted algorithm that does not guarantee the shortest
                  path. The Greedy Best-first Search algorithm is similar to A*
                  but rather than using the total distance as the heuristic for
                  determining which nodes to analyze, it uses the distance to
                  the end node. This makes analysis much quicker, but also
                  sacrifices the guarantee of resulting in the optimal path.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Breadth-first Search (BFS)
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  A non-weighted algorithm that guarantees the shortest path.
                  This algorithm utilizes a tree data structure in order to
                  traverse and anlayze the nodes. It runs through each nodes
                  starting at the top depth of the tree and works its way to the
                  bottom until it reaches the end node.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Depth-first Search (DFS)
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  A non-weighted algorithm that does not guarantee the shortest
                  path. The Depth-first Search algorithm is similar to BFS, but
                  instead of starting at the top of the tree it starts from the
                  bottom. Tt is not the most efficient algorithm, but it has its
                  use-cases such as topological sorting, scheduling problems,
                  cycle detection, and solving puzzles with exactly one solution
                  like soduku.
                </Typography>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <div className="heading-container">
                <img className="heading-icon" src={maze} alt="maze icon" />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ fontWeight: "bolder" }}
                >
                  Fun with Mazes!
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Recursive Division
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  This algorithm constructs a maze through a recursive process.
                  A recusive process is basically repeating the same function
                  until an end case is reached. To generate a maze recursively,
                  this algorithm draws a line on a random coordinate leaving one
                  node empty. It then repeats this process until the graph its
                  working with does not allow it to draw any more lines. This
                  algorithm determines whether to draw a horizontal or vertical
                  line depending on the ratio of the remaining graph's width and
                  height.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Recursive Division (Horizontal)
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  The same recursive division algorithm but horizontally skewed.
                  Meaning that the algorithm decides to place a horizonal line
                  more often than a vertical one.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Recursive Division (Vertical)
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  The same recursive division algorithm but vertically skewed.
                  Meaning that the algorithm decides to place a vertical line
                  more often than a Horizontal one.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Spiral
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  An interesting mathematical pattern that generates the longest
                  possible maze path on the given grid. Be careful not to get
                  hypnotized!
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Random Barriers
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  Places barriers randomly on the grid.
                </Typography>
              </div>
              <div className="algorithm-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Random weights
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  Places weights randomly on the grid based on the weight size
                  selected.
                </Typography>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <div className="heading-container">
                <img className="heading-icon" src={rocket} alt="rocket icon" />
                <Typography
                  color="textPrimary"
                  variant="h4"
                  style={{ fontWeight: "bolder" }}
                >
                  Optimize your Experience
                </Typography>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Select and Run Algorithm
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can select an algorithm from the dropdown on the
                    toolbar. Once you've set the algorithm you would want to
                    visualize, you can click the play button on the bottom left
                    of your screen.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={selectAlgorithm}
                    alt="select an algorithm demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Quick Analyze
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can quickly compare and analyze different algorithms,
                    barrier placements, weight placements, start placements, and
                    target placements through the quick analyze feature. Quick
                    Analyze is automatically turned on whenever you run an
                    algorithm and it turns off when you clear analysis.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={quickAnalyze}
                    alt="quick analyze demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Analysis Report
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    Everytime an analysis is done, a summary of the analysis
                    will appear on the bottom-left part of the screen.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Distance: The total distance of the path from the start node
                    to the target node. This value includes the traversed
                    Weights.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Analyzed Nodes: The total number of nodes analyzed before
                    reaching the final path.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Duration: How long your computer took to run the algorithm.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={analysisReport}
                    alt="Analysis Report"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Move Nodes
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    Click and drag the start node or end node to move it.
                    Hovering over a barrier or weight, will not remove the
                    obstacle unless you place the start or end node on it.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={moveNodes}
                    alt="Move Nodes demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Randomize Nodes
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can't move the start and target nodes on mobile. You can
                    instead use the randomize nodes button to place the start
                    and target nodes on random coordinates.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={randomNodes}
                    alt="Random Nodes demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Selecting a Maze or Pattern
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can select a maze or pattern through the dropdown on the
                    toolbar. Immediately after you select your preferred
                    pattern, the pattern will generate on the grid.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={selectMaze}
                    alt="select a maze or pattern demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Adding Barriers
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    In order to add barriers, make sure that "barriers" are
                    selected on the "Left Click Action" dropdown. From there,
                    you can left click on a node to place a barrier, and hold
                    the button to add multiple barriers. Clicking on a barrier
                    node will remove that barrier.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={addBarrier}
                    alt="Adding Barriers demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Adding Weights
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    In order to add weights, make sure that "weights" are
                    selected on the "Left Click Action" dropdown. When "weights"
                    are selected, a "weight size" selection will appear. You can
                    drag the slider in order to set the size of the weight to
                    place. If the weight size is equal to 1, the node will be
                    back to its default state. You can left click on a node to
                    place a weight, and hold the button to add multiple weights.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={addWeights}
                    alt="Adding Weights demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Clear and Reset
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can clear the grid using the clear and reset buttons on
                    the bottom of the screen. Their are 3 buttons in total that
                    clear or reset different elements on the grid.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Clear Analysis: Clears the analyzed nodes and the path
                    generated by running the algorithm.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Clear all: Clears both the analyzed nodes and all the
                    weights and barriers on the grid.
                  </Typography>
                  <Typography color="textPrimary" variant="body1">
                    Reset: Clears all elements on the grid and places the start
                    node and target node back to its default position.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={clearReset}
                    alt="Clear and Reset demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Changing Grid Size
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can change the grid size by changing the value of the
                    slider labeled "Grid Size". The value indicated on the
                    slider is the pixel height of a node on the grid.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={gridSize}
                    alt="Changing Grid Size demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Setting Animation Speed
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    You can set the animation speed through the dropdown labeled
                    "Animation Speed". Setting the animation speed will affect
                    all the animation of Algo Vision including the Analyzed
                    Nodes, Mazes and Barriers, and Optimal Path.
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={animationSpeed}
                    alt="Changing Animation Speed demo"
                  />
                </div>
              </div>

              <div className="tutorial-information">
                <Typography
                  className={classes.algoHeading}
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Dark Mode
                </Typography>
                <div className="gif-description">
                  <Typography color="textPrimary" variant="body1">
                    Algo Vision supports your vision through dark mode! Just
                    click the right-most button on the toolbar to switch modes
                  </Typography>
                  <img
                    className="tutorial-gif"
                    src={darkMode}
                    alt="Dark Mode demo"
                  />
                </div>
              </div>
            </TabPanel>
          </div>
        </>
      </Modal>
    </>
  );
};

export default InfoModal;
