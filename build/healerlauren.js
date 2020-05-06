map_key('W', 'move_up');
map_key('S', 'move_down');
map_key('A', 'move_left');
map_key('D', 'move_right');
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
    if (!laurens.includes(name)) {
        game_log("Not accepting " + name + "'s invite");
        return;
    }
    accept_party_invite(name);
}
setInterval(function () {
    if (!character.party ||
        is_moving(character) ||
        character.party == character.name) {
        return;
    }
    var leader = get_entity(character.party);
    if (!leader) {
        game_log('help im faraway');
        send_cm(character.party, { faraway: true });
        return;
    }
    var distance = Math.sqrt(Math.pow(character.x - leader.x, 2) + Math.pow(character.y - leader.y, 2));
    if (distance < Math.min(Math.max(character.range, leader.range), 80))
        return;
    game_log('moving closer to party leader');
    move(leader.x, leader.y);
}, 1000 / 4);
function on_cm(name, data) {
    if ('faraway' in data) {
        send_cm(name, { x: character.x, y: character.y });
    }
    if (name == character.party && 'x' in data && 'y' in data) {
        smart_move(data.x, data.y);
    }
}
