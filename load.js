// Paste the following code snippet into the game.

let fileName = character.name.toLowerCase() + '.js';
let filePath = 'file:///Users/laurenzou/Documents/adventureland/' + fileName;
$.getScript(filePath)
  .done(() => game_log(`Done loading ${filePath}`, '#639a67'))
  .fail(() => game_log(`Couldn't load ${filePath}`, '#e43f5a'));
