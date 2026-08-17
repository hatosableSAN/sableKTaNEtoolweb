(() => {
  const $ = id => document.getElementById(id);
  const value = name => document.querySelector(`input[name="${name}"]:checked`).value;
  const lines = id => $(id).value.split("\n").map(x => x.trim()).filter(Boolean);
  const quoted = text => JSON.stringify(text);
  const list = id => { const items = lines(id); return items.length ? "\n" + items.map(x => `    - ${quoted(x)}`).join("\n") : " []"; };
  function yaml() {
    const inventory = lines("startInventory").map(x => x.match(/^(.+?):\s*(\d+)$/)).filter(Boolean);
    const inventoryYaml = inventory.length ? "\n" + inventory.map(x => `    ${quoted(x[1].trim())}: ${x[2]}`).join("\n") : " {}";
    const raw = id => { const items = lines(id); return items.length ? "\n" + items.map(x => `    ${x}`).join("\n") : " []"; };
    const random = value("randomRuleSeed");
    return `# Archipelago Keep Talking and Nobody Explodes 設定ファイル\nname: ${quoted($("playerName").value)}\ndescription: ${quoted($("description").value)}\n\ngame: Keep Talking and Nobody Explodes\nrequires:\n  version: 0.6.7\n  game:\n    Keep Talking and Nobody Explodes: 0.3.0\n\nKeep Talking and Nobody Explodes:\n  progression_balancing:\n    ${$("progression").value}: 50\n\n  accessibility:\n    ${value("accessibility")}: 50\n\n  random_rule_seed:\n    '${random}': 50\n\n  rule_seed:\n    ${random === "true" ? "1" : $("ruleSeed").value}: 50\n\n  adventure_mode:\n    ${value("adventure")}: 50\n\n  hardlock_modules:\n    '${value("hardlock")}': 50\n\n  ohko_mode:\n    '${value("ohko")}': 50\n\n  death_link:\n    '${value("deathLink")}': 50\n\n  death_link_behaviour:\n    ${value("deathBehaviour")}: 50\n\n  local_items:${list("localItems")}\n\n  non_local_items:${list("nonLocalItems")}\n\n  start_inventory:${inventoryYaml}\n\n  start_hints:${list("startHints")}\n\n  start_location_hints:${list("startLocationHints")}\n\n  exclude_locations:${list("excludeLocations")}\n\n  priority_locations:${list("priorityLocations")}\n\n  item_links:${raw("itemLinks")}\n\n  plando_items:${raw("plandoItems")}\n`;
  }
  $("progression").addEventListener("input", e => $("progressionValue").textContent = e.target.value);
  document.querySelectorAll('input[name="randomRuleSeed"]').forEach(x => x.addEventListener("change", () => $("seedField").hidden = value("randomRuleSeed") === "true"));
  $("gameForm").addEventListener("submit", e => { e.preventDefault(); $("gameForm").hidden = true; $("itemForm").hidden = false; $("step1tab").className = ""; $("step2tab").className = "active"; $("step2tab").disabled = false; window.scrollTo({top:0,behavior:"smooth"}); });
  $("back").addEventListener("click", () => { $("itemForm").hidden = true; $("gameForm").hidden = false; $("step1tab").className = "active"; $("step2tab").className = ""; window.scrollTo({top:0,behavior:"smooth"}); });
  $("step1tab").addEventListener("click", () => $("back").click());
  document.querySelector("details").addEventListener("toggle", e => { if(e.target.open) $("preview").textContent = yaml(); });
  $("download").addEventListener("click", () => { const blob = new Blob(["\uFEFF", yaml()], {type:"application/yaml;charset=utf-8"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "Player_ktane_defuser.yaml"; a.click(); URL.revokeObjectURL(a.href); });
})();
