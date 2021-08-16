# Assignment 5

## Notes
The two student examples from _yongcho_ and _downing_ were not referenced or viewed in any way.

No collaboration took place on this project.

The provided `.JSON` files and associative array examples were not used.

`DEAL` removes unplaced tiles and deals seven new tiles.

`NEW ROUND` removes all tiles, deals seven new tiles, and does not reset tile-use count (see rubric point 6, "any number of words can be played until the player wishes to quitor depletes all tiles").

`NEW GAME` removes all tiles, zeroes the player's score, and deals seven new tiles.

## Rubric
- Letters, when the `DRAW` button is pressed, are selected using the `letterBag` structure. This structure includes the letter, current number of the letter, initial number of the letter, and the letter's point value.
- The single row of the Scrabble board is implemented by using a containing element with the row image provided, with invisible images used as hitboxes on each square space, onto which tiles can be dragged and dropped. It includes two types of bonus squares.
- Program identifies which letter tile is dropped onto which Scrabble square, evidenced by the fact that the program works, but also shown via Console printouts when the player places a tile.
- Board does indeed include bonus squares.
- Score is accurately tallied with the proper inclusion of all tile types.
- Game is played until the player chooses to end the game.
- `NEW ROUND` button clears the board.
- If the player has tiles on the rack when they press `NEW ROUND`, they will not be replaced or removed.
- The score is not cleared until the player presses `NEW GAME`.
- Tiles bounce back if not placed on a valid board space.
- Tiles become unmovable once placed.
- Program checks for and disallows placement if (1) the space is occupied, (2) the board is not empty and there exists no space next to the current space that contains a tile.
- User can start a new game at any time by pressing `NEW GAME`.

## Other Requirement Notes
- Displays one line of the Scrabble board.
- Displays seven letter tiles on a tile rack.
- User can drag tiles to the board to make a word.
- User's score reported above the board as `SCORE:` followed by a numerical value.
- Score calculation takes into account letter values and bonus squares.

- The `DEAL` button removes any unplaced tiles in the User's rack and deals a new seven tiles.
- The `NEW GAME` button removes all tiles on the board, zeroes out the player's score, and deals.

- The rack is implemented as an element containing an image of the rack. 
- Every letter tile is a single draggable image.


- Takes into account the number of a particular letter left by (1) not spawning more if the maximum number of a letter has been used (including if its currently sitting in the tray) and (2) reducing the spawn chance of a letter that has had some of its type used (by using a cumulative weights system). You can eventually run out of all pieces.

## Extra Credit
- Full scrabble board implementation is not required and was _not implemented_.
- Word validation is not required and was _not implemented_.

## Links
| Item       | Hyperlink                                                      |
| ---------- | -------------------------------------------------------------- |
| Website    | https://mitbailey.github.io/hw5/                               |
| Repository | https://github.com/mitbailey/hw5                               |
| HTML       | https://github.com/mitbailey/hw5/blob/master/index.html        |
| CSS        | https://github.com/mitbailey/hw5/blob/master/css/style.css     |
| JavaScript | https://github.com/mitbailey/hw5/blob/master/scripts/script.js |
| README     | https://github.com/mitbailey/hw5/blob/master/README.md         |


## References
https://jqueryui.com/

Included jQuery 3.6.0 and jQuery UI.