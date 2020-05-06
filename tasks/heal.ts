function _healHp(character: Character) {
  const hpDiff = character.max_hp - character.hp;
  if (hpDiff < 50) return;
  if (
    !is_on_cooldown('regen_mp') &&
    !is_on_cooldown('regen_hp') &&
    !is_on_cooldown('use_mp') &&
    !is_on_cooldown('use_hp')
  ) {
    game_log('using regen hp');
    use_skill('regen_hp', character);
    return;
  }
  if (hpDiff < 200 || is_on_cooldown('use_hp')) return;
  game_log('using hp potion');
  use_skill('use_hp');
}

function _healMp(character: Character) {
  const mpDiff = character.max_mp - character.mp;
  if (mpDiff < 100) return;
  if (
    !is_on_cooldown('regen_mp') &&
    !is_on_cooldown('regen_hp') &&
    !is_on_cooldown('use_mp') &&
    !is_on_cooldown('use_hp')
  ) {
    game_log('using regen mp');
    use_skill('regen_mp', character);
    return;
  }
  if (mpDiff < 200 || is_on_cooldown('use_mp')) return;
  game_log('using mp potion');
  use_skill('use_mp');
}
