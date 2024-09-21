## Deployed [here](https://iridescent-griffin-d67dee.netlify.app/)

# Catan Companion
Catan is one of the few board games I can convince my family to play, but there's one part of the game that some of them find frustrating - resource gathering. 

In Catan, you build settlements on game board tiles, and each tile has an associated roll number and resource. At the start of every turn, two dice are rolled. If the dice match the number on one of your settled tiles, you gain some cards of that resource. 

In practice, this leads to the following gameplay: Someone starts their turn, and rolls the dice (let's say they get a total of 6). We spend the next couple minutes trying to find all the "6" tiles on the board, seeing if the robber is on any of them, figuring out what resources they give, figuring out who has settlements on them, how many, are there any cities, have we missed anything, and then handing out cards. Then we get around to actually playing the game. 

I needed to brush up on my React, so I decided to make an app to keep track of all that for us. 

## Usage
On starting a game, click the "Players" button. Enter the name of each person playing, and then return home. If you add a name incorrectly, click the "Remove" button next to that name.  

Each time someone creates a new settlement (including during the starting phase), or upgrades a settlement to a city, click the "Settlements" button. Enter the roll number, owning player, resource type, settlement type and click Add. If you're building a settlement on a tile currently occupied by the Robber, untick "Enabled" before adding.  If you add a settlement incorrectly, click the "Remove" button next to that settlement. To upgrade a settlement to a city (or switch back if you click one by accident) use the "Switch" button. 
You can filter the list of settlements using the dropdowns at the top of the table. To disable a filter, just set the dropdown back to its default value, e.g. "Roll Filter". 

Once you've entered everyone's names and added any settlements or cities, you're ready to play. Whenever the dice are rolled, just click the corresponding dice on the main page. It doesn't have to be exact - the app is just checking what the total number is. So if you roll a 3 and a 5 (total 8) you could just press 4 and 4 (still totals 8). The colours of the dice also don't matter - just select one from each. 

For any roll that isn't a 7, the app will then display which cards each player needs to draw. Once finished, click "Done". 

When a 7 is rolled, the Robber triggers and may be moved to a new tile. Any settlements with the Robber on their tile are disabled and provide no resources. When entering a 7 on the dice, you will be navigated to the Robber page. Filtering works the same as the Settlements page. Use the tickboxes to choose which settlements are disabled by the robber. Disabled settlements will be displayed at the top of the table and are unaffected by filters. Once you've finished slecting which settlements to enable/disable, click "Done". If a settlement is disabled, it will not be included in the resource draws when its number is rolled. 

## Other notes
This app uses your browser's local storage. If you refresh or close the page, or possibly even when you restart your device, your data will still be there. For starting a new game, the data can be cleared on the Players and Settlements pages. If you want to completely remove the data (including the empty arrays), you will need to delete it through your browser's settings (this differs per browser, but will probably be bundled near your cookie-clearing options). 

Currently designed for use on my tablet, might make it phone-compatible at some point but I hate CSS. 