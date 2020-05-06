/// <reference path="parameter-model.ts" />

class FunctionModel {
  constructor(
    private function_name: string,
    private parameter_models: ParameterModel[]
  ) {}

  get return_type(): string {
    if (this.function_name.startsWith('is_')) return 'boolean';
    switch (this.function_name) {
      case 'get_player':
        return 'Character';
      case 'say':
      case 'loot':
        return 'void';
      case 'get_monster':
      case 'get_nearest_hostile':
      case 'get_nearest_monster':
        return 'Target';
    }
    return 'any';
  }

  toString(): string {
    let parameters = this.parameter_models
      .map((model) => `${model}`)
      .join(', ');
    return (
      `function ${this.function_name}(${parameters}) : ` +
      `${this.return_type};`
    );
  }
}
