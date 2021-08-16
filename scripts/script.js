/**
 * @file script.js
 * @author Mit Bailey (mitbailey99@gmail.com)
 * @brief JavaScript for website.
 * 
 * @version 0.1
 * @date 2021.07.14
 * 
 * @copyright Copyright (c) 2021
 */

// Globals...

/**
 * @brief Data structure which translates an alpabetical index to the ASCII letter, and other data.
 * 
 * Contains the ASCII letter, how many of that letter are currently in play, how many can be in play maximum, and how many points Scrabble alots to the tile.
 * 
 */
var letterBag = [
    // Letters to Scores
    // A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
    // 1  3  3  2  1  4  2  4  1  8  5  1  3  1  1  3  10 1  1  1  1  4  4  8  4  10

    //  ['Letter', Number In Use, Max Amount, Score]
    ['A', 0, 9, 1],
    ['B', 0, 2, 3],
    ['C', 0, 2, 3],
    ['D', 0, 4, 2],
    ['E', 0, 12, 1],
    ['F', 0, 2, 4],
    ['G', 0, 3, 2],
    ['H', 0, 2, 4],
    ['I', 0, 9, 1],
    ['J', 0, 1, 8],
    ['K', 0, 1, 5],
    ['L', 0, 4, 1],
    ['M', 0, 2, 3],
    ['N', 0, 6, 1],
    ['O', 0, 8, 1],
    ['P', 0, 2, 3],
    ['Q', 0, 1, 10],
    ['R', 0, 6, 1],
    ['S', 0, 4, 1],
    ['T', 0, 6, 1],
    ['U', 0, 4, 1],
    ['V', 0, 2, 4],
    ['W', 0, 2, 4],
    ['X', 0, 1, 8],
    ['Y', 0, 2, 4],
    ['Z', 0, 1, 10],
    ['Blank', 0, 2, 0]
];

/**
 * @brief Representation of the board for proximity / valid placement detection.
 * 
 */
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Runs once on startup...
addHitboxes();
deal();

/**
 * @brief Starts a new game by removing all tiles, resetting the score, and dealing a new hand.
 * 
 */
function newGame() {
    // Removes unused tiles.
    for (var i = 0; i < 7; i++) {
        $(".tile" + i).remove();
    }

    // Removes tiles dropped on normal spaces.
    $(".tile-dropped").remove();

    // Removes tiles dropped on double-letter spaces.
    $(".tile-droppedDL").remove();

    // Removes tiles dropped on double-word spaces.
    $(".tile-droppedDW").remove();

    // Resets the score display.
    $(".score").html("SCORE: 0");

    // Resets the letter bag's used-letters count.
    for (var i = 0; i < letterBag.length; i++) {
        letterBag[i][1] = 0;
    }

    // Resets the board structure.
    for (var i = 0; i < board.length; i++) {
        board[i] = 0;
    }

    // Deals the player a hand.
    deal();
}

/**
 * @brief Starts a new round by removing tiles on the board, and only dealing tiles to top off the player's hand.
 * 
 */
function newRound() {
    // Removes tiles dropped on normal spaces.
    $(".tile-dropped").remove();

    // Removes tiles dropped on double-letter spaces.
    $(".tile-droppedDL").remove();

    // Removes tiles dropped on double-word spaces.
    $(".tile-droppedDW").remove();

    // Resets the board structure.
    for (var i = 0; i < board.length; i++) {
        board[i] = 0;
    }

    // Deals the player a hand without clobbering their currently unused tiles.
    newRoundDeal();
}

/**
 * @brief Tallies the score based on the number of tiles, what letters they are, and which spaces they are on.
 * 
 */
function updateScore() {
    // Makes sure to reset the score each time.
    var score = 0;

    // Add the values of each tile on the board to the score.
    for (var i = 0; i < $("[class*='tile-dropped']").length; i++) {
        score += litov(Number($("[class*='tile-dropped']").eq(i).attr("id")));
    }

    // For tiles on double letter score spaces, add their score in again.
    for (var i = 0; i < $("[class*='tile-droppedDL']").length; i++) {
        score += litov(Number($("[class*='tile-droppedDL']").eq(i).attr("id")));
    }

    // If any tiles are on the double word score space, double the score.
    if ($("[class*='tile-droppedDW']").length > 0) {
        score *= 2;
    }

    // Display the score.
    $(".score").html("SCORE: " + score);
}

/**
 * @brief Adds the invisible hitbox images to allow drag and dropping of tiles onto the board.
 * 
 */
function addHitboxes() {
    // Loops over each of the board's spaces.
    for (var i = 0; i < 15; i++) {

        // If space 2 or 12, make it a double-word score space.
        if (i == 2 || i == 12) {

            // Double Word Score Hitbox
            // We stash this space's index number in the ID and add 100 to avoid conflicts with the similarly numbered tiles.
            // Class of hitboxDWn signifies a Double Word Score box.
            $(".board").append('<img class="hitboxDW' + i + '" id="' + (i + 100) + '" src="images/hitbox.png" alt="hitbox"></img>');

            // Adjusts the CSS programmatically so each is in the correct location.
            $(".hitboxDW" + i).css("left", (75 * i) + "px");

            // Adds droppable functions.
            $(".hitboxDW" + i).droppable({

                // The procedure for if something is dropped on this box.
                drop: function (event, ui) {

                    // Mark this tile as filled in the board data structure.
                    board[(Number($(this).attr("id")) - 100)] = 1;

                    // Remove the basic tilen class and substitute it with a tile-dropped class.
                    for (var i = 0; i < 7; i++) {
                        $(ui.draggable).removeClass("tile" + i);
                    }
                    $(ui.draggable).addClass("tile-droppedDW");

                    // Disable dragging on the dropped tile.
                    $(ui.draggable).draggable("disable");

                    // Printout to confirm the program understands what is happening in full.
                    console.log("Dropped a(n) ", letterBag[Number($(ui.draggable).attr("id"))][0], " worth ", letterBag[Number($(ui.draggable).attr("id"))][3], " points onto a double-word-score square, square of index " + (Number($(this).attr("id")) - 100) + ". There are currently ", letterBag[Number($(ui.draggable).attr("id"))][1], " of this letter out of the bag and ", letterBag[Number($(ui.draggable).attr("id"))][2] - letterBag[Number($(ui.draggable).attr("id"))][1], " remain to be pulled from the bag.");

                    // Updates the score.
                    updateScore();
                },

                // Determines whether to accept or reject the drop.
                accept: function (element) {
                    // Send the function our space's index number to determine placement validity.
                    return placementValidityChecker((Number($(this).attr("id")) - 100));
                }
            });
        }

        // If space 6 or 8, make it a double-letter score space.
        else if (i == 6 || i == 8) {

            // Double Letter Score Hitbox
            // We stash this space's index number in the ID and add 100 to avoid conflicts with the similarly numbered tiles.
            // Class of hitboxDLn signifies a Double Letter Score box.
            $(".board").append('<img class="hitboxDL' + i + '" id="' + (i + 100) + '" src="images/hitbox.png" alt="hitbox"></img>');

            // Adjusts the CSS programmatically so each is in the correct location.
            $(".hitboxDL" + i).css("left", (75 * i) + "px");

            // Adds droppable functions.
            $(".hitboxDL" + i).droppable({

                // The procedure for if something is dropped on this box.
                drop: function (event, ui) {

                    // Mark this tile as filled in the board data structure.
                    board[(Number($(this).attr("id")) - 100)] = 1;

                    // Remove the basic tilen class and substitute it with a tile-dropped class.
                    for (var i = 0; i < 7; i++) {
                        $(ui.draggable).removeClass("tile" + i);
                    }
                    $(ui.draggable).addClass("tile-droppedDL");

                    // Disable dragging on the dropped tile.
                    $(ui.draggable).draggable("disable");

                    // Printout to confirm the program understands what is happening in full.
                    console.log("Dropped a(n) ", letterBag[Number($(ui.draggable).attr("id"))][0], " worth ", letterBag[Number($(ui.draggable).attr("id"))][3], " points onto a double-letter-score square, square of index " + (Number($(this).attr("id")) - 100) + ". There are currently ", letterBag[Number($(ui.draggable).attr("id"))][1], " of this letter out of the bag and ", letterBag[Number($(ui.draggable).attr("id"))][2] - letterBag[Number($(ui.draggable).attr("id"))][1], " remain to be pulled from the bag.");

                    // Updates the score.
                    updateScore();
                },

                // Determines whether to accept or reject the drop.
                accept: function (element) {
                    // Send the function our space's index number to determine placement validity.
                    return placementValidityChecker((Number($(this).attr("id")) - 100));
                }
            });
        }

        // If any other space, make it a normal score space.
        else {

            // Normal Score Hitbox
            // We stash this space's index number in the ID and add 100 to avoid conflicts with the similarly numbered tiles.
            // Class of hitboxn signifies a normal score box.
            $(".board").append('<img class="hitbox' + i + '" id="' + (i + 100) + '" src="images/hitbox.png" alt="hitbox"></img>');

            // Adjusts the CSS programmatically so each is in the correct location.
            $(".hitbox" + i).css("left", (75 * i) + "px");

            // Adds droppable functions.
            $(".hitbox" + i).droppable({

                // The procedure for if something is dropped on this box.
                drop: function (event, ui) {

                    // Mark this tile as filled in the board data structure.
                    board[(Number($(this).attr("id")) - 100)] = 1;

                    // Remove the basic tilen class and substitute it with a tile-dropped class.
                    for (var i = 0; i < 7; i++) {
                        $(ui.draggable).removeClass("tile" + i);
                    }
                    $(ui.draggable).addClass("tile-dropped");

                    // Disable dragging on the dropped tile.
                    $(ui.draggable).draggable("disable");

                    // Printout to confirm the program understands what is happening in full.
                    console.log("Dropped a(n) ", letterBag[Number($(ui.draggable).attr("id"))][0], " worth ", letterBag[Number($(ui.draggable).attr("id"))][3], " points onto a normal square, square of index " + (Number($(this).attr("id")) - 100) + ". There are currently ", letterBag[Number($(ui.draggable).attr("id"))][1], " of this letter out of the bag and ", letterBag[Number($(ui.draggable).attr("id"))][2] - letterBag[Number($(ui.draggable).attr("id"))][1], " remain to be pulled from the bag.");

                    // Updates the score.
                    updateScore();
                },

                // Determines whether to accept or reject the drop.
                accept: function (element) {
                    // Send the function our space's index number to determine placement validity.
                    return placementValidityChecker((Number($(this).attr("id")) - 100));
                }
            });
        }
    }
}

/**
 * @brief Finds if this space is a valid placement.
 * 
 * Checks if its full, and if not, then requires that an adjacent space be full, unless the board is empty.
 * 
 * @return True if valid placement, false if invalid placement.
 */
function placementValidityChecker(index) {
    // If this space is occupied, return false, disallowing placement.
    if (board[index]) {
        console.log(index, "filled.");
        return false;
    }

    // If this is the first placement on the board, then we should allow any space to be placed on.
    var first_placement = true;
    for (var i = 0; i < board.length; i++) {
        if (board[i]) {
            first_placement = false;
        }
    }

    if (first_placement) {
        return true;
    }

    // If this is the first space, only check if the right space is filled.
    if (index == 0) {
        if (board[index + 1]) {
            return true;
        }
    }
    // else if this is the last space, only check if the left space is filled.
    else if (index == 14) {
        if (board[index - 1]) {
            return true;
        }
    }
    // else check both left and right spaces.
    else {
        if (board[index - 1] || board[index + 1]) {
            return true;
        }
    }

    // Default case.
    return false;
}



/**
 * @brief Translates randomly generated letter-value (0 - total weighted value) to an index (0 - 26).
 * 
 * Letter Value to Index
 * 
 * @return Alphabetical index on success, negative on failure.
 */
function lvtoli(lv) {

    // Warning if invalid lv.
    if (lv < 0) {
        console.log("lv less than zero.");
        return -1;
    }

    // Cumulative Weights
    // A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  B
    // 9  11 13 17 29 31 34 36 45 46 47 51 53 59 67 69 70 76 80 86 90 92 94 95 97 98 100

    // Adds to the cumulative weight each iteration, checking when the lv is less than the cumulative.
    var cumulative_weight = 0;
    for (var i = 0; i < letterBag.length; i++) {
        cumulative_weight += (letterBag[i][2] - letterBag[i][1]);
        if (lv < cumulative_weight) {
            return i;
        }
    }

    console.log("WARNING: Could not find valid index match for letter value ", lv, cumulative_weight);
    return -1;
}

/**
 * @brief Translates alphabetical letter index to Scrabble letter point value.
 * 
 * Letter Index to Value
 * 
 * @return Scrabble point value on success, negative on failure.
 */
function litov(li) {
    if (li < 0) {
        console.log("li less than zero.");
        return -1;
    }

    // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
    // A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
    // 1  3  3  2  1  4  2  4  1  8  5  1  3  1  1  3  10 1  1  1  1  4  4  8  4  10

    // If-else block to determine Scrabble score value per li.
    if (li == 26) {
        return 0;
    }
    if (li == 0 || li == 4 || li == 8 || li == 11 || li == 13 || li == 14 || (li > 16 && li < 21)) {
        return 1;
    }
    else if (li == 3 || li == 6) {
        return 2;
    }
    else if (li == 1 || li == 2 || li == 12 || li == 15) {
        return 3;
    }
    else if (li == 5 || li == 7 || li == 21 || li == 22 || li == 24) {
        return 4;
    }
    else if (li == 10) {
        return 5;
    }
    else if (li == 9 || li == 23) {
        return 8;
    }
    else if (li == 16 || li == 25) {
        return 10;
    }

    console.log("WARNING: Could not find valid value for letter index ", li);
    return -1;
}

/**
 * @brief Deals a new hand without clobbering the already present tiles in the player's hand.
 * 
 */
function newRoundDeal() {

    // Determines the total weighted probability of all letters.
    var total_weight = 0;
    for (var i = 0, attempts = 0; i < letterBag.length; i++) {
        total_weight += (letterBag[i][2] - letterBag[i][1]);
    }

    // Iterates through each possible deal.
    for (var i = 0; i < 7; i++) {
        // Skips, instead of removing, unused tiles.
        if ($(".tile" + i).length) {
            console.log("Skipping tile ", i);
            continue;
        }

        // Loop for re-attempting to find a letter that hasn't been exhausted.
        var li = -1, attempts = 0;
        do {
            while (li < 0 && attempts < 1000) {
                li = lvtoli(Math.random() * total_weight);
                attempts++;
            }
        } while (letterBag[li][1] >= letterBag[li][2] && attempts < 1000)

        // Add one to the number-used of this letter.
        letterBag[li][1] += 1;

        // Spawn the letter.
        $(".rack-area").append('<img class="tile' + i + '" id="' + li + '" src="images/Scrabble_Tile_' + letterBag[li][0] + '.jpg" alt="Tile" width="65">');
        $(".tile" + i).css("left", (75 * i) + "px");
        $(".tile" + i).draggable({
            revert: "invalid"
        });
    }
}

/**
 * @brief Deals a new hand, removing already present tiles from the player's hand.
 * 
 */
function deal() {

    // Determines the total weighted probability of all letters.
    var total_weight = 0;
    for (var i = 0, attempts = 0; i < letterBag.length; i++) {
        total_weight += (letterBag[i][2] - letterBag[i][1]);
    }

    // Iterates through each possible deal.
    for (var i = 0; i < 7; i++) {
        // Removes unused tiles.
        if ($(".tile" + i).length) {
            letterBag[Number($(".tile" + i).attr("id"))][1] -= 1;
            $(".tile" + i).remove();
        }

        // Loop for re-attempting to find a letter that hasn't been exhausted.
        var li = -1, attempts = 0;
        do {
            while (li < 0 && attempts < 1000) {
                li = lvtoli(Math.random() * total_weight);
                attempts++;
            }
        } while (letterBag[li][1] >= letterBag[li][2] && attempts < 1000)

        // Add one to the number-used of this letter.
        letterBag[li][1] += 1;

        // Spawn the letter.
        $(".rack-area").append('<img class="tile' + i + '" id="' + li + '" src="images/Scrabble_Tile_' + letterBag[li][0] + '.jpg" alt="Tile" width="65">');
        $(".tile" + i).css("left", (75 * i) + "px");
        $(".tile" + i).draggable({
            revert: "invalid"
        });
    }
}

/**
 * @brief Toggles the collapsible navigation bar on the left of the screen.
 *  
 */
function collapseNavbar() {
    var sideNavbar = document.getElementById("side_navbar");
    if (sideNavbar.style.visibility === "visible") {
        sideNavbar.style.visibility = "hidden";
    } else {
        sideNavbar.style.visibility = "visible";
    }
}