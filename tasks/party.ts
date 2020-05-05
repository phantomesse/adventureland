// Invite other Laurens to the party.
const laurens = ['MagicLauren', 'ArcherLauren'];

let otherLaurens = laurens.filter((lauren) => lauren != character.name);
for (const lauren of laurens) {
  send_party_invite(lauren);
}
