function _healHp(character: Character) {
  const hpDiff = character.max_hp - character.hp;
  if (hpDiff < 50) return;
  if (!_is_on_hp_mp_cooldown()) return use_skill('regen_hp', character);
  if (hpDiff < 200 || is_on_cooldown('use_hp')) return;
  use_skill('use_hp');
}

function _healMp(character: Character) {
  const mpDiff = character.max_mp - character.mp;
  if (mpDiff < 100) return;
  if (!_is_on_hp_mp_cooldown()) return use_skill('regen_mp', character);
  if (mpDiff < 200 || is_on_cooldown('use_mp')) return;
  use_skill('use_mp');
}

function _is_on_hp_mp_cooldown() {
  const actions = ['regen_mp', 'regen_hp', 'use_mp', 'use_hp'];
  return actions.filter(is_on_cooldown).length > 0;
}
