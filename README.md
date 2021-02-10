**This project was built with create-react-app, material-ui and typescript.**

https://www.algovision.io

# Welcome to Algo Vision!

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

### Check out the site [here](https://www.algovision.io)

## Meet the Algorithms

### `Dijkstra's`

A weighted algorithm that guarantees the shortest path. Dijkstra's is one of the most famous algorithms for finding the shortest path between nodes. Some even consider it to be the father of pathinding algorithms. The algorithm finds the shortest distance neighboring node that has been unvisited and updates the distance if it's the shortest one so far. Once it has done this for all the nodes, it picks the shortest one to the target and traces back to the start node to reveal the shortest path.

### `A* Search`

A weighted algorithm that guarantees the shortest path.
Arguably the most efficient way to find a shortest path. A\* is
derived from Dijkstra's but uses a heuristic (total distance
from start node to end node) in order to determine which node
to analyze. Analysis becomes even quicker if incorporated with
a binary min-heap (utilized in this project).

### `Greedy Best-first Search`

A weighted algorithm that does not guarantee the shortest
path. The Greedy Best-first Search algorithm is similar to A\*
but rather than using the total distance as the heuristic for
determining which nodes to analyze, it uses the distance to
the end node. This makes analysis much quicker, but also
sacrifices the guarantee of resulting in the optimal path.

### `Breadth-first Search (BFS)`

A non-weighted algorithm that guarantees the shortest path.
This algorithm utilizes a tree data structure in order to
traverse and anlayze the nodes. It runs through each nodes
starting at the top depth of the tree and works its way to the
bottom until it reaches the end node.

### `Depth-first Search (DFS)`

A non-weighted algorithm that does not guarantee the shortest
path. The Depth-first Search algorithm is similar to BFS, but
instead of starting at the top of the tree it starts from the
bottom. Tt is not the most efficient algorithm, but it has its
use-cases such as topological sorting, scheduling problems,
cycle detection, and solving puzzles with exactly one solution
like soduku.

## Fun with Mazes!

### `Recursive Division`

This algorithm constructs a maze through a recursive process.
A recusive process is basically repeating the same function
until an end case is reached. To generate a maze recursively,
this algorithm draws a line on a random coordinate leaving one
node empty. It then repeats this process until the graph its
working with does not allow it to draw any more lines. This
algorithm determines whether to draw a horizontal or vertical
line depending on the ratio of the remaining graph's width and
height.

### `Spiral`

An interesting mathematical pattern that generates the longest
possible maze path on the given grid. Be careful not to get
hypnotized!

### `Random Barriers or Weights`

Places barriers or weights randomly on the grid.

### More info on the app's usage can be found on the [website](https://www.algovision.io)

# Enjoy!
