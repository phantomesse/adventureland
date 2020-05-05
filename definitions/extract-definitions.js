const https = require('https');
const fs = require('fs');
const runnerFunctions =
  'https://raw.githubusercontent.com/kaansoral/adventureland/master/runner_functions.js';

class Function {
  constructor(fnDeclaration) {
    this.fnDeclaration = fnDeclaration;
    this.name = fnDeclaration.substring(
      'function '.length,
      fnDeclaration.indexOf('(')
    );
    this.parameters = fnDeclaration
      .substring(fnDeclaration.indexOf('(') + 1, fnDeclaration.indexOf(')'))
      .split(',')
      .filter((parameterName) => parameterName != '')
      .map((parameterName) => new Parameter(parameterName));
  }

  get declaration() {
    let parameters = this.parameters
      .map((parameter) => parameter.toString())
      .join(', ');
    return `function ${this.name}(${parameters}) : any;`;
  }
}

class Parameter {
  constructor(name) {
    this.name = name;
    this.type = Parameter._getType(name);
  }

  static _getType(name) {
    switch (name) {
      case 'name':
      case 'color':
      case 'message':
        return 'string';
      case 'num':
      case 'x':
      case 'y':
      case 'real_x':
      case 'real_y':
        return 'number';
      case 'target':
        return 'Target';
      case 'character':
        return 'Character';
      default:
        return 'any';
    }
  }

  toString() {
    return `${this.name}?: ${this.type}`;
  }
}

let interfaces = [
  _createInterface('definitions/target.md', 'Target'),
  _createInterface('definitions/character.md', 'Character'),
];

https.get(runnerFunctions, function (response) {
  let headers = [];
  response.on('data', (data) => {
    headers = headers.concat(_extractHeaders(data.toString('utf8')));
  });
  response.on('end', function () {
    _writeToHeadersFile(interfaces, headers);
  });
});

function _createInterface(propertiesFileName, interfaceName) {
  let parameters = fs
    .readFileSync(propertiesFileName, 'utf8')
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => new Parameter(line))
    .map((parameter) => '  ' + parameter.toString() + ';')
    .join('\n');
  return `interface ${interfaceName} {\n${parameters}\n}\n`;
}

function _extractHeaders(data) {
  return data
    .split('\n')
    .filter(
      (line) =>
        line.startsWith('function ') && line.includes('(') && line.includes(')')
    )
    .map((line) => new Function(line).declaration);
}

function _writeToHeadersFile(interfaces, headers) {
  let data = [
    `let ${new Parameter('character')};`,
    ...headers,
    ...interfaces,
  ].join('\n');
  let file = fs.createWriteStream('global.d.ts');
  file.on('error', console.log);
  file.write(data);
  file.end();
}
