const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');
const exec = require('child_process').exec;

const _build_folder = 'build/';
const _extract_definitions_js_file_name = 'extract-definitions.js';

function _compile_extract_definitions() {
  let config = tsConfig.compilerOptions;
  config.outFile = _extract_definitions_js_file_name;
  return gulp
    .src('definitions/extract-definitions.ts')
    .pipe(ts(config).on('error', console.log))
    .pipe(gulp.dest(_build_folder));
}

function _run_extract_definitions(done) {
  let extract_definitions_file_path =
    _build_folder + _extract_definitions_js_file_name;
  exec(`node ${extract_definitions_file_path}`);
  exec(`rm ${extract_definitions_file_path}`);
  done();
}

function _compile_character(character) {
  let config = tsConfig.compilerOptions;
  config.outFile = `${character}.js`;
  return gulp
    .src([`characters/${character}.ts`])
    .pipe(ts(config).on('error', console.log))
    .pipe(gulp.dest(_build_folder));
}

function _watch(done) {
  gulp.watch(
    'definitions/**/*',
    gulp.series(_compile_extract_definitions, _run_extract_definitions)
  );
  gulp.watch(['characters/*.ts', 'tasks/*.ts'], exports.compile_all_characters);
  done();
}

exports.extract_definitions = _compile_extract_definitions;

exports.compile_all_characters = gulp.parallel(
  () => _compile_character('archerlauren'),
  () => _compile_character('healerLauren'),
  () => _compile_character('magicLauren'),
  () => _compile_character('richLauren')
);

exports.default = gulp.series(
  exports.extract_definitions,
  exports.compile_all_characters,
  _watch
);
