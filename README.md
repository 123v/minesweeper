# Minesweeper
It's the basic boilerplate of react, babel, webpack 4 and scss. 

# Setting Up
- Install all the dependencies.
`npm install`

- Start the project.
`npm start`

- Open [http://localhost:9000/](http://localhost:9000/) in the browser.

# Getting Started
We have 3 components.

1. Cell : The cell component renders a cell div that represents each square in the board.
2. Board: The board component renders a 8x8 board containing a total of 64 cells and 10 of the cells will contain mines.
3. Game: The game component renders the board component.


Rules of the game
- The goal of the game is to find all the mines on the board.
- You reveal mines by clicking the cells, if you reveal a mine you loose.
- If you reveal a cell without mine it will show number of mines surrounding the cell.
- You can flag a field by right clicking it.
- You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.

# Game component
The Game component stores the height and width of the board along with number of mines in its state which is later on passed as props to Board component.

# Cell component
The Cell component renders each square. We use the `getValue()` method to determine a suitable value to be rendered by each cell.
- If the cell is not yet revealed we return a null value.
- If the cell is not revealed but is flagged by the user we return a flag(🚩).
- If the cell is revealed and is a mine we return a bomb(💣).
- If the cell is revealed we return the number of neighbour mines for that cell.
- If the cell is revealed and has zero mines in its neighbouring cells, we return a null value.

# Board component
This is the component where all the magic happens. In its basic form Board component maintains `boardData` state to hold the values of each cell, `gameStatus` state to distinguish if a game is in progress or won, `mineCount` state to keep a track of mines that remain to be found(flagged). It renders a section containing information on number of mines remaining & whether game has been won and the board itself.

The `initiBoard()` function prepares the initial array containing the data for each cell. It can be divided into 3 functions: `createEmptyArray()`, `plantMines()` and `getNeighbours()`.

`createEmptyArray()` initializes a two dimensional array and each cell represented by two dimensional item `data[x][y]` which contains default values of different attributes.

`plantMines()` randomly plants 10 mines by randomly selecting cells as assigning the `isMine` key with `true`.

`getNeighbours()` processes every cell which is not a mine, get its surrounding cells, calculate the number of surrounding cells that are mines and updates `neighbour` attribute of that cell with the total number of mines.

However, we will need some way to find the surrounding cells. I created a `traverseBoard()` method just to do that.

# Rendering the board
The `renderBoard` function is self explanatory. It takes a two dimension array and loops through each item in the array and returns a Cell component for each item. 

# Handling Click Event
When a user clicks a cell we need to reveal the field to the user. The reveal logic is dead simple.
- If the cell clicked and is not empty, reveal the value of the field.
- If the cell field is a mine, game over.
- If the cell is empty, recursively reveal all the empty neighbouring fields.
- If the cell is already revealed or flagged don’t do anything.

The `revealEmpty()` function recursively reveals all the empty cells when a user clicks an empty cell.

# Flagging and Handling Right Click Event
We need to flag a cell as a possible mine when the user right clicks on a cell. To do this we add a `handleContextMenu()` function on the Board component and pass it down to Cell component to be used as  `onContextMenu` attribute value. The cool thing is that we can pass down the right-click event down to the Cell component along with the handler function.

The `handleContextMenu` function
- flags the cell if it’s not revealed and not already flagged.
- removes the flag if its already flagged.