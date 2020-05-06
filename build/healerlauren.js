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
function _healHp(character) {
    var hpDiff = character.max_hp - character.hp;
    if (hpDiff < 50)
        return;
    if (!is_on_cooldown('regen_mp') &&
        !is_on_cooldown('regen_hp') &&
        !is_on_cooldown('use_mp') &&
        !is_on_cooldown('use_hp')) {
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
    if (!is_on_cooldown('regen_mp') &&
        !is_on_cooldown('regen_hp') &&
        !is_on_cooldown('use_mp') &&
        !is_on_cooldown('use_hp')) {
        game_log('using regen mp');
        use_skill('regen_mp', character);
        return;
    }
    if (mpDiff < 200 || is_on_cooldown('use_mp'))
        return;
    game_log('using mp potion');
    use_skill('use_mp');
}
setInterval(function () {
    _healHp(character);
    _healMp(character);
    loot();
    if (is_moving(character))
        return;
    _healParty();
}, 1000 / 4);
function _healParty() {
    if (is_on_cooldown('partyheal'))
        return;
    var partyMembers = get_party();
    var totalHpDiff = 0;
    for (var _i = 0, partyMembers_1 = partyMembers; _i < partyMembers_1.length; _i++) {
        var partyMemberName = partyMembers_1[_i];
        var player = get_player(partyMemberName);
        if (player.hp / player.max_hp < 0.5 && !is_on_cooldown('heal')) {
            game_log('healing ' + partyMemberName);
            use_skill('heal');
            return;
        }
        totalHpDiff += player.max_hp - player.hp;
    }
    if (totalHpDiff > 500) {
        game_log('party healing');
        use_skill('partyheal');
    }
}
function _curse() {
    get_party();
}
