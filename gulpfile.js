const fs = require('fs');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');

function _compileCharacter(character) {
  let config = tsConfig.compilerOptions;
  config.outFile = `${character}.js`;
  return gulp
    .src([`characters/${character}.ts`])
    .pipe(ts(config).on('error', console.log))
    .pipe(gulp.dest(`build`));
}

function _watch(done) {
  gulp.watch(['**/*.ts'], exports.compileAllCharacters);
  done();
}

exports.compileArcherLauren = function compileArcherLauren() {
  return _compileCharacter('archerLauren');
};

exports.compileHealerLauren = function compileHealerLauren() {
  return _compileCharacter('healerLauren');
};

exports.compileMagicLauren = function compileMagicLauren() {
  return _compileCharacter('magicLauren');
};

exports.compileRichLauren = function compileRichLauren() {
  return _compileCharacter('richLauren');
};

exports.compileAllCharacters = gulp.parallel(
  exports.compileArcherLauren,
  exports.compileHealerLauren,
  exports.compileMagicLauren,
  exports.compileRichLauren
);
exports.default = gulp.series(exports.compileAllCharacters, _watch);
