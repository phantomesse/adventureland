// Paste the following code snippet into the game.

const fileName = character.name.toLowerCase() + '.js';
const localFilePath =
  'file:///Users/laurenzou/Documents/adventureland/build/' + fileName;
const gitHubFilePath =
  'https://phantomesse.github.io/adventureland/build/' + fileName;

// First try loading a local version.
// If that doesn't exist, load the github version.
_loadScript(localFilePath, function () {
  game_log(`Couldn't load local version, but trying to load GitHub version.`);
  _loadScript(gitHubFilePath, () =>
    game_log(`Couldn't load script.`, '#e43f5a')
  );
});

function _loadScript(filePath, failureFn) {
  $.getScript(filePath)
    .done(() => game_log(`Done loading ${filePath}!`, '#639a67'))
    .fail(failureFn);
}
