/// <reference path="../tasks/variables.ts" />
/// <reference path="../global.d.ts" />
/// <reference path="../tasks/bind-keys.ts" />
/// <reference path="../tasks/party.ts" />
/// <reference path="../tasks/stay-close.ts" />
/// <reference path="../tasks/heal.ts" />

character_color = '#DA76E0';

setInterval(function () {
  _healHp(character);
  _healMp(character);
  loot();

  if (is_moving(character)) return;

  // _healParty();
}, 1000 / 4);

function _healParty() {
  if (is_on_cooldown('partyheal')) return;
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
