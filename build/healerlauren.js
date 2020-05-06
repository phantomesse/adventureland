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
setInterval(function () {
    if (!character.party ||
        is_moving(character) ||
        character.party == character.name) {
        return;
    }
    let leader = get_entity(character.party);
    if (!leader) {
        game_log("Help! I'm far away.", character_color);
        send_cm(character.party, { faraway: true });
        return;
    }
    let distance = Math.sqrt(Math.pow(character.x - leader.x, 2) + Math.pow(character.y - leader.y, 2));
    if (distance < Math.min(Math.max(character.range, leader.range), 80))
        return;
    game_log(`${character.party}, I'm coming!`, character_color);
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
    const hpDiff = character.max_hp - character.hp;
    if (hpDiff < 50)
        return;
    if (!_is_on_hp_mp_cooldown())
        return use_skill('regen_hp', character);
    if (hpDiff < 200 || is_on_cooldown('use_hp'))
        return;
    use_skill('use_hp');
}
function _healMp(character) {
    const mpDiff = character.max_mp - character.mp;
    if (mpDiff < 100)
        return;
    if (!_is_on_hp_mp_cooldown())
        return use_skill('regen_mp', character);
    if (mpDiff < 200 || is_on_cooldown('use_mp'))
        return;
    use_skill('use_mp');
}
function _is_on_hp_mp_cooldown() {
    const actions = ['regen_mp', 'regen_hp', 'use_mp', 'use_hp'];
    return actions.filter(is_on_cooldown).length > 0;
}
character_color = '#DA76E0';
setInterval(function () {
    _healHp(character);
    _healMp(character);
    loot();
    if (is_moving(character))
        return;
}, 1000 / 4);
function _healParty() {
    if (is_on_cooldown('partyheal'))
        return;
    let partyMembers = get_party();
    let totalHpDiff = 0;
    for (let partyMemberName of partyMembers) {
        let player = get_player(partyMemberName);
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
