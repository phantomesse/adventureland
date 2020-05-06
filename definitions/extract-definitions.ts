/// <reference path="models/function-model.ts" />
/// <reference path="models/parameter-model.ts" />

const fs = require('fs');
const https = require('https');

const runner_functions_file_path =
  'https://raw.githubusercontent.com/kaansoral/adventureland/master/runner_functions.js';
const additional_function_definitions = ['get_party()'];

extract_definitions();
async function extract_definitions() {
  let function_definitions = await _get_function_definitions();
  console.log(function_definitions);
  let functions: string[] = function_definitions.map(
    (function_definition: string) => {
      let function_name = function_definition.split('(')[0];
      let parameter_names = function_definition
        .split('(')[1]
        .slice(0, -1)
        .split(',')
        .filter((parameter_name) => parameter_name.length > 0);
      let parameter_models = parameter_names.map(
        (parameter_name: string) => new ParameterModel(parameter_name)
      );
      return `  ${new FunctionModel(function_name, parameter_models)}`;
    }
  );
  let data = [
    'export {}',
    'declare global {',
    `  let ${new ParameterModel('character', true)};\n`,
    _get_class_definition('Character'),
    _get_class_definition('Target'),
    ...functions,
    '}\n',
  ].join('\n');
  let file = fs.createWriteStream('global.d.ts');
  file.on('error', console.log);
  file.write(data);
  file.end();
}

// Gets function definitions from runner functions file.
//
// An example function definition: "do_something(param1,param2)"
function _get_function_definitions(): Promise<string[]> {
  return new Promise((resolve, _) => {
    let function_definitions: string[] = additional_function_definitions;
    https.get(runner_functions_file_path, function (response) {
      response.on('data', (data) => {
        function_definitions = function_definitions.concat(
          data
            .toString('utf8')
            .split('\n')
            .filter((line: string) => line.startsWith('function '))
            .filter((line: string) => line.includes('('))
            .filter((line: string) => line.includes(')'))
            .map((line: string) =>
              line.substring('function '.length, line.indexOf(')') + 1)
            )
        );
      });
      response.on('end', () => {
        function_definitions.sort();
        resolve(function_definitions);
      });
    });
  });
}

// Gets a class definition in the form of a string for a given class name.
//
// Loads class properties from data/{{className}}.md
function _get_class_definition(className: string): string {
  let fields = fs
    .readFileSync(`definitions/data/${className.toLowerCase()}.md`, 'utf8')
    .split('\n')
    .filter((line) => line.length > 0)
    .map((field_name) => `    ${new ParameterModel(field_name)};`)
    .join('\n');
  return `  class ${className} {\n${fields}\n  }\n`;
}
