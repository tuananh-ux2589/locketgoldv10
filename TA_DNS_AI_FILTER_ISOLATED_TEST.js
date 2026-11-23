// TA DNS: isolated AI Filter diagnostic script (2026-11-23).
// Test purpose: change ONLY camera_filter_config in Firebase Remote Config.
// Does not bypass login, subscription, server authorization, or Firebase App Check.
// Other remote configuration keys are left as returned by the server.
const TA_FALLBACK = {"allows_custom_filters":false,"show_filter_button":false,"sheet_enabled":true,"open_sheet_immediately":true,"sheet_filters":[{"title":{"en":"Goofy"},"filter_ids":["okay_wig","influencer","looks_maxxing","toothless","bye_brows"]},{"title":{"en":"Looks"},"filter_ids":["bowling_ball","blonde_bleached","beard","bob_cut","buns","tatted","mohawk","braces","bye_brows"]},{"title":{"en":"Celebrate"},"filter_ids":["slimed","princess","disco_lights","cash_money","happy_birthday"]},{"title":{"en":"Cute"},"filter_ids":["cutesy","sticker_face","flower_crown","love_bug"]},{"title":{"en":"Costumes"},"filter_ids":["wedding","cowboy_cowgirl","giraffe","clown"]},{"title":{"en":"Holidays"},"filter_ids":["easter_bunney_cutout","easter_chick_cutout","bearded","leprechaun","lucky_face","sweet_hearts","elf_cutout","santa_cutout","frosty"]}],"picker_filters":["okay_wig","influencer","looks_maxxing","toothless","bye_brows","bowling_ball","blonde_bleached","beard","bob_cut","buns","tatted","mohawk","braces","slimed","princess","disco_lights","cash_money","happy_birthday","cutesy","sticker_face","flower_crown","love_bug","wedding","cowboy_cowgirl","giraffe","clown","easter_bunney_cutout","easter_chick_cutout","bearded","leprechaun","lucky_face","sweet_hearts","elf_cutout","santa_cutout","frosty"]};
(function () {
  try {
    const response = JSON.parse($response.body);
    if (!response || !response.entries || typeof response.entries !== 'object') {
      $done({}); return;
    }
    const raw = response.entries.camera_filter_config;
    let config;
    if (typeof raw === 'string' && raw.trim()) {
      try { config = JSON.parse(raw); } catch (_) { config = null; }
    } else if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      config = raw;
    }
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      config = TA_FALLBACK;
    }
    // Test only the known presentation switches, preserving server-defined fields.
    config.allows_custom_filters = true;
    config.show_filter_button = true;
    response.entries.camera_filter_config = JSON.stringify(config);
    $done({ body: JSON.stringify(response) });
  } catch (error) {
    // If any part fails, preserve the original response.
    $done({});
  }
})();
