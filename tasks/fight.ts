/// <reference path="../global.d.ts" />
/// <reference path="heal.ts" />

setInterval(function () {
  _healHp(character);
  _healMp(character);
  loot();

  if (is_moving(character)) return;

  let target = get_target();
  if (!target) target = get_nearest_monster({ max_att: 120, path_check: true });
  if (!target) return; // No monsters.
  change_target(target);

  // Move as close to the monster as we are in range.
  if (!is_in_range(target)) {
    move(
      character.x + (target.x - character.x) / 3,
      character.y + (target.y - character.y) / 3
    );
  }

  _moveWithinRange(character, target);

  if (can_attack(target)) attack(target);

  _moveOutOfRange(character, target);
}, 1000 / 4);

function _moveWithinRange(character: Character, target: Target): void {
  let distance = Math.sqrt(
    Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2)
  );
  if (distance < character.range) return;
  move(
    character.x + (target.x - character.x) / 4,
    character.y + (target.y - character.y) / 4
  );
}

function _moveOutOfRange(character: Character, target: Target): void {
  let distance = Math.sqrt(
    Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2)
  );
  if (distance > target.range + (character.range - target.range) / 2) return;
  move(
    character.x - (target.x - character.x) / 4,
    character.y - (target.y - character.y) / 4
  );
}
