class ParameterModel {
  constructor(
    private parameter_name: string,
    private is_required: boolean = false
  ) {}

  get parameter_type(): string {
    switch (this.parameter_name) {
      case 'color':
      case 'message':
      case 'name':
        return 'string';
      case 'num':
      case 'real_x':
      case 'real_y':
      case 'x':
      case 'x2':
      case 'y':
      case 'y2':
        return 'number';
      case 'target':
        return 'Target';
      case 'character':
        return 'Character';
      default:
        return 'any';
    }
  }

  toString(): string {
    return (
      this.parameter_name +
      (this.is_required ? '' : '?') +
      `: ${this.parameter_type}`
    );
  }
}
