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
