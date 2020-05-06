let character_color;
map_key('W', 'move_up');
map_key('S', 'move_down');
map_key('A', 'move_left');
map_key('D', 'move_right');
const laurens = ['MagicLauren', 'ArcherLauren', 'HealerLauren', 'RichLauren'];
if (!character.bot) {
    const otherLaurens = laurens.filter((lauren) => lauren != character.name);
    let activeCharacters = get_active_characters();
    for (const lauren of otherLaurens) {
        if (lauren in activeCharacters)
            stop_character(lauren);
        start_character(lauren, 'load');
        _invite_to_party(lauren);
    }
}
function _invite_to_party(name) {
    let activeCharacters = get_active_characters();
    if (name in activeCharacters && ['code'].includes(activeCharacters[name])) {
        send_party_invite(name);
        return;
    }
    setTimeout(() => _invite_to_party(name), 1000);
}
function on_party_invite(name) {
    if (!laurens.includes(name)) {
        game_log(`Not accepting ${name}'s invite`, character_color);
        return;
    }
    accept_party_invite(name);
}
character_color = '#FC504B';
