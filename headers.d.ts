export {};
export interface Target {
  a_direction?: any;
  abs?: any;
  aggro?: any;
  alpha?: any;
  angle?: any;
  armor?: any;
  attack?: any;
  base?: any;
  c?: any;
  cid?: any;
  cskin?: any;
  damage_type?: any;
  direction?: any;
  drawn?: any;
  emblems?: any;
  engaged_move?: any;
  frequency?: any;
  from_x?: any;
  from_y?: any;
  fx?: any;
  going_x?: any;
  going_y?: any;
  height?: any;
  hp?: any;
  hp_color?: any;
  hp_width?: any;
  i?: any;
  id?: any;
  in?: any;
  j?: any;
  last_ms?: any;
  level?: any;
  map?: any;
  max_hp?: any;
  max_mp?: any;
  move_num?: any;
  moving?: any;
  mp?: any;
  ms_walk?: any;
  mtype?: any;
  name?: string;
  rage?: any;
  range?: any;
  real_alpha?: any;
  real_x?: number;
  real_y?: number;
  ref_speed?: any;
  resistance?: any;
  respawn?: any;
  resync?: any;
  s?: any;
  skin?: any;
  speed?: any;
  stype?: any;
  type?: any;
  updates?: any;
  visible?: any;
  vx?: any;
  vy?: any;
  walking?: any;
  width?: any;
  x?: number;
  xp?: any;
  y?: number;
}
export interface Character {
  attack?: any;
  c?: any;
  from_x?: any;
  from_y?: any;
  going_x?: any;
  going_y?: any;
  hp?: any;
  in?: any;
  items?: any;
  level?: any;
  map?: any;
  max_hp?: any;
  max_mp?: any;
  move_num?: any;
  moving?: any;
  mp?: any;
  on?: any;
  onc?: any;
  range?: any;
  real_x?: number;
  real_y?: number;
  rip?: any;
  s?: any;
  slots?: any;
  speed?: any;
  stand?: any;
  target?: Target;
  vx?: any;
  vy?: any;
  x?: number;
  xp?: any;
  y?: number;
}
declare global {
  let character: Character;
  function start_character(name?: string, code_slot_or_name?: any): any;
  function stop_character(name?: string): any;
  function get_active_characters(): any;
  function change_server(region?: any, name?: string): any;
  function is_pvp(): any;
  function is_npc(entity?: any): any;
  function is_monster(entity?: any): any;
  function is_character(entity?: any): any;
  function is_player(e?: any): any;
  function activate(num?: number): any;
  function shift(num?: number, name?: string): any;
  function can_use(name?: string): any;
  function use(name?: string, target?: Target): any;
  function use_skill(name?: string, target?: Target, extra_arg?: any): any;
  function reduce_cooldown(name?: string, ms?: any): any;
  function bank_deposit(gold?: any): any;
  function bank_withdraw(gold?: any): any;
  function bank_store(num?: number, pack?: any, pack_slot?: any): any;
  function swap(a?: any, b?: any): any;
  function locate_item(name?: string): any;
  function quantity(name?: string): any;
  function item_properties(item?: any): any;
  function item_grade(item?: any): any;
  function transport(map?: any, spawn?: any): any;
  function is_paused(): any;
  function pause(): any;
  function get_socket(): any;
  function get_map(): any;
  function set_message(text?: any, color?: string): any;
  function game_log(message?: string, color?: string, x?: number): any;
  function log(message?: string, color?: string): any;
  function safe_log(message?: string, color?: string): any;
  function get_focus(): any;
  function get_target_of(entity?: any): any;
  function get_target(): any;
  function get_targeted_monster(): any;
  function change_target(target?: Target, public?: any): any;
  function can_move_to(x?: number, y?: number): any;
  function xmove(x?: number, y?: number): any;
  function is_in_range(target?: Target, skill?: any): any;
  function is_on_cooldown(skill?: any): any;
  function can_attack(target?: Target): any;
  function can_heal(t?: any): any;
  function is_moving(entity?: any): any;
  function is_transporting(entity?: any): any;
  function attack(target?: Target): any;
  function heal(target?: Target): any;
  function buy(name?: string, quantity?: any): any;
  function buy_with_gold(name?: string, quantity?: any): any;
  function buy_with_shells(name?: string, quantity?: any): any;
  function sell(num?: number, quantity?: any): any;
  function equip(num?: number, slot?: any): any;
  function unequip(slot?: any): any;
  function trade(
    num?: number,
    trade_slot?: any,
    price?: any,
    quantity?: any
  ): any;
  function trade_buy(target?: Target, trade_slot?: any): any;
  function compound(
    item0?: any,
    item1?: any,
    item2?: any,
    scroll_num?: any,
    offering_num?: any
  ): any;
  function craft(
    i0?: any,
    i1?: any,
    i2?: any,
    i3?: any,
    i4?: any,
    i5?: any,
    i6?: any,
    i7?: any,
    i8?: any
  ): any;
  function auto_craft(name?: string): any;
  function dismantle(item_num?: any): any;
  function exchange(item_num?: any): any;
  function say(message?: string): any;
  function pm(name?: string, message?: string): any;
  function move(x?: number, y?: number): any;
  function show_json(e?: any): any;
  function get_monster(id?: any): any;
  function get_player(name?: string): any;
  function get_entity(id?: any): any;
  function find_npc(npc_id?: any): any;
  function get_nearest_monster(args?: any): any;
  function get_nearest_hostile(args?: any): any;
  function use_hp_or_mp(): any;
  function loot(id_or_arg?: any): any;
  function get_chests(): any;
  function send_gold(receiver?: any, gold?: any): any;
  function send_item(receiver?: any, num?: number, quantity?: any): any;
  function destroy(num?: number): any;
  function send_party_invite(name?: string, is_request?: any): any;
  function send_party_request(name?: string): any;
  function accept_party_invite(name?: string): any;
  function accept_party_request(name?: string): any;
  function leave_party(): any;
  function accept_magiport(name?: string): any;
  function unfriend(name?: string): any;
  function respawn(): any;
  function handle_command(command?: any, args?: any): any;
  function send_cm(to?: any, data?: any): any;
  function on_disappear(entity?: any, data?: any): any;
  function on_party_invite(name?: string): any;
  function on_party_request(name?: string): any;
  function on_magiport(name?: string): any;
  function on_map_click(x?: number, y?: number): any;
  function on_destroy(): any;
  function on_draw(): any;
  function draw_line(
    x?: number,
    y?: number,
    x2?: any,
    y2?: any,
    size?: any,
    color?: string
  ): any;
  function draw_circle(
    x?: number,
    y?: number,
    radius?: any,
    size?: any,
    color?: string
  ): any;
  function clear_drawings(): any;
  function add_top_button(id?: any, value?: any, fn?: any): any;
  function add_bottom_button(id?: any, value?: any, fn?: any): any;
  function set_button_value(id?: any, value?: any): any;
  function set_button_color(id?: any, color?: string): any;
  function set_button_onclick(id?: any, fn?: any): any;
  function clear_buttons(): any;
  function trigger_character_event(name?: string, data?: any): any;
  function trigger_event(name?: string, data?: any): any;
  function preview_item(def?: any, args?: any): any;
  function set_skillbar(): any;
  function set_keymap(keymap?: any): any;
  function map_key(key?: any, skill?: any, code?: any): any;
  function unmap_key(key?: any): any;
  function reset_mappings(): any;
  function send_local_cm(name?: string, data?: any): any;
  function is_character_local(name?: string): any;
  function pset(name?: string, value?: any): any;
  function pget(name?: string): any;
  function set(name?: string, value?: any): any;
  function get(name?: string): any;
  function load_code(name?: string, onerror?: any): any;
  function smart_move(destination?: any, on_done?: any): any;
  function stop(action?: any): any;
  function plot(index?: any): any;
  function qpush(node?: any): any;
  function smooth_path(): any;
  function bfs(): any;
  function start_pathfinding(): any;
  function continue_pathfinding(): any;
  function smart_move_logic(): any;
  function proxy(name?: string): any;
  function eval_s(code?: any): any;
  function performance_trick(): any;
  function code_draw(): any;
}
