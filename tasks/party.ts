/// <reference path="../global.d.ts" />

const laurens = ['MagicLauren', 'ArcherLauren', 'HealerLauren', 'RichLauren'];

// Invite other Laurens to the party.
if (!character.bot) {
  const otherLaurens = laurens.filter((lauren) => lauren != character.name);
  let activeCharacters = get_active_characters();
  for (const lauren of otherLaurens) {
    if (lauren in activeCharacters) stop_character(lauren);
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
  set_message('invited to a party by ' + name);
  if (laurens.includes(name)) {
    accept_party_invite(name);
    set_message('accepted party invite!');
  } else {
    set_message(`Not accepting ${name}'s invite`);
  }
}
