map_key('W', 'move_up');
map_key('S', 'move_down');
map_key('A', 'move_left');
map_key('D', 'move_right');
setInterval(function () {
    use_hp_or_mp();
    loot();
    if (is_moving(character))
        return;
    var target = get_nearest_monster({ max_att: 120 });
    if (!target) {
        game_log('No monsters here!');
        return;
    }
    change_target(target);
    // Move as close to the monster as we are in range.
    if (!is_in_range(target)) {
        move(character.x + (target.x - character.x) / 3, character.y + (target.y - character.y) / 3);
    }
    moveWithinRange(character, target);
    if (can_attack(target))
        attack(target);
    moveOutOfRange(character, target);
}, 1000 / 4);
function moveWithinRange(character, target) {
    var distance = Math.sqrt(Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2));
    if (distance < character.range)
        return;
    move(character.x + (target.x - character.x) / 4, character.y + (target.y - character.y) / 4);
}
function moveOutOfRange(character, target) {
    var distance = Math.sqrt(Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2));
    if (distance > target.range + (character.range - target.range) / 2)
        return;
    move(character.x - (target.x - character.x) / 4, character.y - (target.y - character.y) / 4);
}
