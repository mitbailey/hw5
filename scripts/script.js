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

// On startup...
addHitboxes();
deal();

$(function() {
    $(".tile").draggable();
    $(".rack").draggable();

    // $(".hitbox").droppable({
    //     drop: function(event, ui) {
    //         $(ui.draggable).removeClass("tile");
    //         $(ui.draggable).addClass("tile-dropped");
    //         $(ui.draggable).draggable("disable");
    //     }
    // });

    $(".rack").droppable({
        drop: function(event, ui) {
            $(ui.draggable).removeClass("tile");
            $(ui.draggable).addClass("tile-dropped");
            $(ui.draggable).draggable("disable");
        }
    })
});

function updateScore() {
    
    for (var i = 0; i < $("[class*='tile']").length; i++)
    {
        // console.log($("[class^='hitbox']")[i].class);
        console.log($("[class*='tile']").length, i);
    }

    var score = 0;

    // Add the values of each tile on the board to the score.
    for (var i = 0; i < $("[class*='tile-dropped']").length; i++)
    {
        console.log("Letter Score: ", Number($("[class*='tile-dropped']").eq(i).attr("id")));
        score += Number($("[class*='tile-dropped']").eq(i).attr("id"));
    }

    // For tiles on double letter score spaces, add their score in again.
    for (var i = 0; i < $("[class*='tile-droppedDL']").length; i++)
    {
        console.log("Double Letter: ", Number($("[class*='tile-droppedDL']").eq(i).attr("id")));
        score += Number($("[class*='tile-droppedDL']").eq(i).attr("id"));
    }

    // If any tiles are on the double word score space, double the score.
    if ($("[class*='tile-droppedDW']").length > 0)
    {
        score *= 2;
    }

    console.log("SCORE:", score);
    $(".score").html(score);
}

function addHitboxes() {
    for (var i = 0; i < 15; i++)
    {
        if (i == 2 || i == 12)
        {
            // Double Word Score Hitbox
            $(".board").append('<img class="hitboxDW' + i + '" src="images/hitbox.png" alt="hitbox"></img>');
            $(".hitboxDW" + i).css("left", (75 * i) + "px");
            $(".hitboxDW" + i).droppable({
                drop: function(event, ui) {
                    $(ui.draggable).removeClass("tile");            
                    $(ui.draggable).addClass("tile-droppedDW");
                    $(ui.draggable).draggable("disable");
                    updateScore();
                }
            });
        }
        else if (i == 6 || i == 8)
        {
            // Double Letter Score Hitbox
            $(".board").append('<img class="hitboxDL' + i + '" src="images/hitbox.png" alt="hitbox"></img>');
            $(".hitboxDL" + i).css("left", (75 * i) + "px");
            $(".hitboxDL" + i).droppable({
                drop: function(event, ui) {
                    $(ui.draggable).removeClass("tile");            
                    $(ui.draggable).addClass("tile-droppedDL");
                    $(ui.draggable).draggable("disable");
                    updateScore();
                }
            });
        }
        else
        {
            // Normal Score Hitbox
            $(".board").append('<img class="hitbox' + i + '" src="images/hitbox.png" alt="hitbox"></img>');
            $(".hitbox" + i).css("left", (75 * i) + "px");
            $(".hitbox" + i).droppable({
                drop: function(event, ui) {
                    $(ui.draggable).removeClass("tile");            
                    $(ui.draggable).addClass("tile-dropped");
                    $(ui.draggable).draggable("disable");
                    updateScore();
                }
            });
        }
    }
}

function deal() {
    $(".tile").remove();

    for(var i = 0; i < 7; i++)
    {
        // Random integer between 0 and 26 inclusive.
        li = Math.floor(Math.random() * 27);

        val = 0;

        // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
        // A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
        // 1  3  3  2  1  4  2  4  1  8  5  1  3  1  1  3  10 1  1  1  1  4  4  8  4  10

        if (li == 0 || li == 4 || li == 8 || li == 11 || li == 13 || li == 14 || (li > 16 && li < 21))
        {
            val = 1;
        }
        else if (li == 3 || li == 6)
        {
            val = 2;
        }
        else if (li == 1 || li == 2 || li == 12 || li == 15)
        {
            val = 3;
        }
        else if (li == 5 || li == 7 || li == 21 || li == 22 || li == 24)
        {
            val = 4;
        }
        else if (li == 10)
        {
            val = 5;
        }
        else if (li == 9 || li == 23)
        {
            val = 8;
        }
        else if (li == 16 || li == 25)
        {
            val = 10;
        }
        
        console.log(li);

        if (li == 26)
        {
            // Spawn a blank.
            $(".rack-area").append('<img class="tile" id="0" src="images/Scrabble_Tile_Blank.jpg" alt="Tile Blank" width="65">');
        }
        else
        {
            // Else spawn a letter.
            $(".rack-area").append('<img class="tile" id="' + val + '" src="images/Scrabble_Tile_' + String.fromCharCode(li + 65) + '.jpg" alt="Tile Blank" width="65">');
        }
    }

    // Makes sure the newly spawned stuff is draggable.
    $(".tile").draggable();
}

// Toggle navbar visibility.
function collapseNavbar() {
    var sideNavbar = document.getElementById("side_navbar");
    if (sideNavbar.style.visibility === "visible") {
        sideNavbar.style.visibility = "hidden";
    } else {
        sideNavbar.style.visibility = "visible";
    }
}