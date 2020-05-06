map_key('W', 'move_up');
map_key('S', 'move_down');
map_key('A', 'move_left');
map_key('D', 'move_right');
setInterval(function () {
    _healHp(character);
    _healMp(character);
    loot();
    if (is_moving(character))
        return;
    var target = get_target();
    if (!target)
        target = get_nearest_monster({ max_att: 120, path_check: true });
    if (!target)
        return;
    change_target(target);
    if (!is_in_range(target)) {
        move(character.x + (target.x - character.x) / 3, character.y + (target.y - character.y) / 3);
    }
    _moveWithinRange(character, target);
    if (can_attack(target))
        attack(target);
    _moveOutOfRange(character, target);
}, 1000 / 4);
function _healHp(character) {
    var hpDiff = character.max_hp - character.hp;
    if (hpDiff < 50)
        return;
    if (!is_on_cooldown('regen_hp')) {
        game_log('using regen hp');
        use_skill('regen_hp', character);
        return;
    }
    if (hpDiff < 200 || is_on_cooldown('use_hp'))
        return;
    game_log('using hp potion');
    use_skill('use_hp');
}
function _healMp(character) {
    var mpDiff = character.max_mp - character.mp;
    if (mpDiff < 100)
        return;
    if (!is_on_cooldown('regen_mp')) {
        game_log('using regen mp');
        use_skill('regen_mp', character);
        return;
    }
    if (mpDiff < 200 || is_on_cooldown('use_mp'))
        return;
    game_log('using mp potion');
    use_skill('use_mp');
}
function _moveWithinRange(character, target) {
    var distance = Math.sqrt(Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2));
    if (distance < character.range)
        return;
    move(character.x + (target.x - character.x) / 4, character.y + (target.y - character.y) / 4);
}
function _moveOutOfRange(character, target) {
    var distance = Math.sqrt(Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2));
    if (distance > target.range + (character.range - target.range) / 2)
        return;
    move(character.x - (target.x - character.x) / 4, character.y - (target.y - character.y) / 4);
}
var laurens = ['MagicLauren', 'ArcherLauren', 'HealerLauren', 'RichLauren'];
if (!character.bot) {
    var otherLaurens = laurens.filter(function (lauren) { return lauren != character.name; });
    var activeCharacters = get_active_characters();
    for (var _i = 0, otherLaurens_1 = otherLaurens; _i < otherLaurens_1.length; _i++) {
        var lauren = otherLaurens_1[_i];
        if (lauren in activeCharacters)
            stop_character(lauren);
        start_character(lauren, 'load');
        _invite_to_party(lauren);
    }
}
function _invite_to_party(name) {
    var activeCharacters = get_active_characters();
    if (name in activeCharacters && ['code'].includes(activeCharacters[name])) {
        send_party_invite(name);
        return;
    }
    setTimeout(function () { return _invite_to_party(name); }, 1000);
}
function on_party_invite(name) {
    set_message('invited to a party by ' + name);
    if (laurens.includes(name)) {
        accept_party_invite(name);
        set_message('accepted party invite!');
    }
    else {
        set_message("Not accepting " + name + "'s invite");
    }
}
