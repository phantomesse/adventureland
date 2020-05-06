// Stay close to party leader if in a party.

setInterval(function () {
  if (
    !character.party ||
    is_moving(character) ||
    character.party == character.name
  ) {
    return;
  }

  let leader = get_entity(character.party);
  if (!leader) {
    game_log("Help! I'm far away.", character_color);
    send_cm(character.party, { faraway: true });
    return;
  }

  let distance = Math.sqrt(
    Math.pow(character.x - leader.x, 2) + Math.pow(character.y - leader.y, 2)
  );
  if (distance < Math.min(Math.max(character.range, leader.range), 80)) return;
  game_log(`${character.party}, I'm coming!`, character_color);
  move(leader.x, leader.y);
}, 1000 / 4);

function on_cm(name: string, data: any) {
  if ('faraway' in data) {
    // Someone is saying that they are far away, so send them my units.
    send_cm(name, { x: character.x, y: character.y });
  }
  if (name == character.party && 'x' in data && 'y' in data) {
    // Party leader has sent her coordinates, so move there.
    smart_move(data.x, data.y);
  }
}
