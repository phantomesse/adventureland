const fs = require('fs');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');

function _compileCharacter(character) {
  let config = tsConfig.compilerOptions;
  config.outFile = `${character}.js`;
  return gulp
    .src([`characters/${character}.ts`, 'tasks/*.ts'])
    .pipe(ts(config).on('error', console.log))
    .pipe(gulp.dest(`build`));
}

function _watch(done) {
  // Get all the characters.
  let characters = fs
    .readdirSync('characters')
    .map((file) => file.split('.')[0]);

  // Compile all the characters initially.
  for (let character of characters) {
    _compileCharacter(character);
  }

  // Watch for changes and compile appropriately.
  for (let character of characters) {
    gulp.watch(`characters/${character}.ts`, _compileCharacter(character));
  }
  done();
}

gulp.task('default', _watch);
