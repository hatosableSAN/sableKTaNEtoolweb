(() => {
  const $ = id => document.getElementById(id);
  const value = name => document.querySelector(`input[name="${name}"]:checked`).value;
  const lines = id => $(id).value.split("\n").map(x => x.trim()).filter(Boolean);
  const quoted = text => JSON.stringify(text);
  const list = id => { const items = lines(id); return items.length ? "\n" + items.map(x => `    - ${quoted(x)}`).join("\n") : " []"; };

  const itemGroups = [
    { label: "標準モジュール", mode: "vanilla", items: ["Complicated Wires", "Maze", "Memory", "Morse Code", "Password", "Simon Says", "Who's on First", "Wire Sequence", "Knob"] },
    { label: "ハードロック用モジュール", mode: "hardlock", items: ["Capacitor", "Vent Gas"] },
    { label: "MODモジュール", mode: "modded", items: ["Switches", "Chess", "Mouse in the Maze", "3D Maze", "Tic Tac Toe", "Follow the Leader", "Friendship", "The Bulb", "Blind Alley", "Rock-Paper-Scissors-Lizard-Spock", "Hexamaze", "Bitmaps", "Colored Squares", "Simon Screams", "Wire Placement", "Double-Oh", "Cheap Checkout", "FizzBuzz", "Fast Math", "Zoo", "X-Ray", "Color Morse", "Big Circle", "Morse-A-Maze", "Polyhedral Maze", "Blind Maze", "Backgrounds", "Radiator"] },
    { label: "進行・強化アイテム", mode: "common", items: ["Bomb Fragment", "Time++", "Time+", "Strike+"] },
    { label: "フィラー", mode: "modded", items: ["Empty Manual Page"] }
  ];
  const allItems = itemGroups.flatMap(group => group.items);
  const selections = { localItems: new Set(), nonLocalItems: new Set(), startHints: new Set() };
  const inventory = new Map();
  const vanillaBombs = [
    ["1.1 The First Challenge",3],["2.1 Make it Double",6],["2.2 Oh! The Lights!",3],["2.3 Remember",3],["2.4 Don't Get Lost",3],["2.5 Confusion",3],["2.6 Speedster I",3],
    ["3.1 Back in the 40s",3],["3.2 Code Breaker",3],["3.3 Verticality",3],["3.4 Learning the Alphabet",3],["3.5 Precision Time",4],["3.6 Longer Bomb",9],["3.7 Rat Nest",6],["3.8 Speedster II",5],
    ["4.1 Hold it!",4],["4.2 Master Hacker",4],["4.3 Wheel of Misfortune",4],["4.4 Speedster III",4],
    ["5.1 Miscommunication",4],["5.2 Invisible Walls",7],["5.3 Cipher Decrypter",9],["5.4 Stroboscopic",6],["5.5 Attention Needed",5],["5.6 Speedster IV",4]
  ];
  const moddedBombs = [
    ["1.1 First?",11],["2.1 Double Down",22],["2.2 What Are Those?",8],["2.3 Location of Success",8],["2.4 Family Fun",8],["2.5 Keep Talking",8],["2.6 Nobody Explodes",8],["2.7 Be Squared",8],["2.8 Quick Time Event I",11],
    ["3.1 Lost",8],["3.2 Dark Path",8],["3.3 Shock",8],["3.4 Gin",8],["3.5 Stateful",8],["3.6 Vulture's Nest",10],["3.7 Colossal I",23],["3.8 Quick Time Event II",11],
    ["4.1 Let Me In!",8],["4.2 In Your Head",8],["4.3 Magical",8],["4.4 Entrance",8],["4.5 Back in the 30s",8],["4.6 Vision",8],["4.7 Colossal II",31],["4.8 Quick Time Event III",11],
    ["5.1 Grayscale",9],["5.2 Insanity",9],["5.3 Tales of Wonders",9],["5.4 Disturbance",9],["5.5 Commonplace",9],["5.6 Unspoken",9],["5.7 Colossal III",35],["5.8 Quick Time Event IV",15],
    ["6.1 Guidance",9],["6.2 As Per Protocol",9],["6.3 Knights",9],["6.4 Pulsed",9],["6.5 Walk in the Woods",9],["6.6 Find Your Way",9],["6.7 Forbidden",9],["6.8 Quick Time Event V",15],
    ["7.1 Chromatic",11],["7.2 Let's Cook!",11],["7.3 The Green Power",11],["7.4 Company",11],["7.5 A Good Trick",11],["7.6 Fight!",11],["7.7 Conic Conductor",11],["7.8 Gargantua",39]
  ];
  const locationSelections = { startLocationHints: new Set(), excludeLocations: new Set(), priorityLocations: new Set() };

  const currentLocations = () => {
    const bombs = value("adventure") === "vanilla_vanguard" ? vanillaBombs : moddedBombs;
    const sectionCount = value("adventure") === "vanilla_vanguard" ? 5 : 7;
    const completed = Array.from({length: sectionCount}, (_, i) => ({ section: i + 1, name: `Section ${i + 1} Completed` }));
    return completed.concat(bombs.flatMap(([bomb, count]) => Array.from({length: count}, (_, i) => ({ section: Number(bomb[0]), name: `${bomb} - ${i + 1} Module${i ? "s" : ""} Solved` }))));
  };

  const isAvailable = (item, mode) => {
    const adventure = value("adventure");
    const hardlock = value("hardlock") === "true";
    const ohko = value("ohko") === "true";
    if (item === "Strike+" && ohko) return false;
    if (mode === "vanilla") return adventure === "vanilla_vanguard";
    if (mode === "hardlock") return adventure === "vanilla_vanguard" && hardlock;
    if (mode === "modded") return adventure === "praetorian_pact";
    return true;
  };

  function renderItemPicker(containerId, target) {
    const container = $(containerId);
    container.innerHTML = "";
    itemGroups.forEach(group => {
      const section = document.createElement("section");
      section.className = "item-group";
      section.innerHTML = `<h3>${group.label}</h3>`;
      const grid = document.createElement("div");
      grid.className = "item-grid";
      group.items.forEach(item => {
        const available = isAvailable(item, group.mode);
        if (!available) selections[target].delete(item);
        const label = document.createElement("label");
        label.className = `item-check${available ? "" : " unavailable"}`;
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = selections[target].has(item);
        input.disabled = !available;
        input.addEventListener("change", () => {
          if (input.checked) {
            selections[target].add(item);
            const opposite = target === "localItems" ? "nonLocalItems" : target === "nonLocalItems" ? "localItems" : null;
            if (opposite) selections[opposite].delete(item);
          } else selections[target].delete(item);
          syncSelections();
          renderAllPickers();
        });
        label.append(input, document.createTextNode(item));
        grid.append(label);
      });
      section.append(grid);
      container.append(section);
    });
  }

  function renderInventory() {
    const container = $("inventoryPicker");
    container.innerHTML = "";
    itemGroups.forEach(group => {
      const availableItems = group.items.filter(item => isAvailable(item, group.mode));
      if (!availableItems.length) return;
      const section = document.createElement("section");
      section.className = "item-group";
      section.innerHTML = `<h3>${group.label}</h3>`;
      const grid = document.createElement("div");
      grid.className = "inventory-grid";
      availableItems.forEach(item => {
        const label = document.createElement("label");
        label.innerHTML = `<span>${item}</span>`;
        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.value = inventory.get(item) || 0;
        input.setAttribute("aria-label", `${item}の開始時所持数`);
        input.addEventListener("input", () => {
          const count = Math.max(0, Number.parseInt(input.value || "0", 10));
          if (count) inventory.set(item, count); else inventory.delete(item);
          syncSelections();
        });
        label.append(input);
        grid.append(label);
      });
      section.append(grid);
      container.append(section);
    });
  }

  function syncSelections() {
    ["localItems", "nonLocalItems", "startHints"].forEach(target => $(target).value = [...selections[target]].join("\n"));
    ["startLocationHints", "excludeLocations", "priorityLocations"].forEach(target => $(target).value = [...locationSelections[target]].join("\n"));
    $("startInventory").value = [...inventory.entries()].map(([item, count]) => `${item}: ${count}`).join("\n");
  }

  function renderLocationPicker(containerId, target) {
    const container = $(containerId);
    const locations = currentLocations();
    const validNames = new Set(locations.map(location => location.name));
    [...locationSelections[target]].forEach(name => { if (!validNames.has(name)) locationSelections[target].delete(name); });
    container.innerHTML = `<div class="location-toolbar"><input type="search" placeholder="location名を検索" aria-label="location名を検索"><span>${locationSelections[target].size}件選択中 / ${locations.length}件</span></div><div class="location-results"></div>`;
    const search = container.querySelector("input");
    const results = container.querySelector(".location-results");
    const draw = () => {
      const query = search.value.trim().toLowerCase();
      const matches = locations.filter(location => location.name.toLowerCase().includes(query));
      results.innerHTML = "";
      for (let sectionNumber = 1; sectionNumber <= 7; sectionNumber++) {
        const inSection = matches.filter(location => location.section === sectionNumber);
        if (!inSection.length) continue;
        const details = document.createElement("details");
        details.open = Boolean(query) || inSection.some(location => locationSelections[target].has(location.name));
        details.innerHTML = `<summary>セクション ${sectionNumber}<span>${inSection.length}件</span></summary>`;
        const grid = document.createElement("div");
        grid.className = "location-grid";
        inSection.forEach(location => {
          const label = document.createElement("label");
          label.className = "item-check";
          const input = document.createElement("input");
          input.type = "checkbox";
          input.dataset.location = location.name;
          input.checked = locationSelections[target].has(location.name);
          input.addEventListener("change", () => {
            if (input.checked) {
              locationSelections[target].add(location.name);
              const opposite = target === "excludeLocations" ? "priorityLocations" : target === "priorityLocations" ? "excludeLocations" : null;
              if (opposite) {
                locationSelections[opposite].delete(location.name);
                const oppositeInput = $(`${opposite}Picker`).querySelector(`input[data-location="${CSS.escape(location.name)}"]`);
                if (oppositeInput) oppositeInput.checked = false;
              }
            } else locationSelections[target].delete(location.name);
            syncSelections();
            updateLocationCounts();
          });
          label.append(input, document.createTextNode(location.name));
          grid.append(label);
        });
        details.append(grid);
        results.append(details);
      }
      if (!matches.length) results.innerHTML = '<p class="no-results">一致するlocationがありません。</p>';
    };
    search.addEventListener("input", draw);
    draw();
  }

  function updateLocationCounts() {
    const total = currentLocations().length;
    ["startLocationHints", "excludeLocations", "priorityLocations"].forEach(target => {
      const count = $(`${target}Picker`).querySelector(".location-toolbar span");
      if (count) count.textContent = `${locationSelections[target].size}件選択中 / ${total}件`;
    });
  }

  function renderAllLocationPickers() {
    renderLocationPicker("startLocationHintsPicker", "startLocationHints");
    renderLocationPicker("excludeLocationsPicker", "excludeLocations");
    renderLocationPicker("priorityLocationsPicker", "priorityLocations");
    syncSelections();
  }

  function renderAllPickers() {
    renderItemPicker("localItemsPicker", "localItems");
    renderItemPicker("nonLocalItemsPicker", "nonLocalItems");
    renderItemPicker("startHintsPicker", "startHints");
    renderInventory();
    const adventure = value("adventure");
    const hardlock = value("hardlock") === "true";
    const ohko = value("ohko") === "true";
    const availableCount = itemGroups.flatMap(group => group.items.map(item => ({item, mode: group.mode}))).filter(entry => isAvailable(entry.item, entry.mode)).length;
    $("poolSummary").innerHTML = `<b>現在のアイテムプール候補：${availableCount}種類</b><span>${adventure === "vanilla_vanguard" ? `Vanilla Vanguard${hardlock ? "＋ハードロック用モジュール" : ""}` : "Praetorian Pact"}${ohko ? "／OHKOのため Strike+ なし" : ""}</span>`;
    syncSelections();
    renderAllLocationPickers();
  }

  function yaml() {
    const inventoryLines = lines("startInventory").map(x => x.match(/^(.+?):\s*(\d+)$/)).filter(Boolean);
    const inventoryYaml = inventoryLines.length ? "\n" + inventoryLines.map(x => `    ${quoted(x[1].trim())}: ${x[2]}`).join("\n") : " {}";
    const raw = id => { const items = lines(id); return items.length ? "\n" + items.map(x => `    ${x}`).join("\n") : " []"; };
    const random = value("randomRuleSeed");
    return `# Archipelago Keep Talking and Nobody Explodes 設定ファイル\nname: ${quoted($("playerName").value)}\ndescription: ${quoted($("description").value)}\n\ngame: Keep Talking and Nobody Explodes\nrequires:\n  version: 0.6.7\n  game:\n    Keep Talking and Nobody Explodes: 0.3.0\n\nKeep Talking and Nobody Explodes:\n  progression_balancing:\n    ${$("progression").value}: 50\n\n  accessibility:\n    ${value("accessibility")}: 50\n\n  random_rule_seed:\n    '${random}': 50\n\n  rule_seed:\n    ${random === "true" ? "1" : $("ruleSeed").value}: 50\n\n  adventure_mode:\n    ${value("adventure")}: 50\n\n  hardlock_modules:\n    '${value("hardlock")}': 50\n\n  ohko_mode:\n    '${value("ohko")}': 50\n\n  death_link:\n    '${value("deathLink")}': 50\n\n  death_link_behaviour:\n    ${value("deathBehaviour")}: 50\n\n  local_items:${list("localItems")}\n\n  non_local_items:${list("nonLocalItems")}\n\n  start_inventory:${inventoryYaml}\n\n  start_hints:${list("startHints")}\n\n  start_location_hints:${list("startLocationHints")}\n\n  exclude_locations:${list("excludeLocations")}\n\n  priority_locations:${list("priorityLocations")}\n\n  item_links:${raw("itemLinks")}\n\n  plando_items:${raw("plandoItems")}\n`;
  }

  $("progression").addEventListener("input", e => $("progressionValue").textContent = e.target.value);
  document.querySelectorAll('input[name="randomRuleSeed"]').forEach(x => x.addEventListener("change", () => $("seedField").hidden = value("randomRuleSeed") === "true"));
  document.querySelectorAll('input[name="adventure"], input[name="hardlock"], input[name="ohko"]').forEach(x => x.addEventListener("change", renderAllPickers));
  $("gameForm").addEventListener("submit", e => { e.preventDefault(); renderAllPickers(); $("gameForm").hidden = true; $("itemForm").hidden = false; $("step1tab").className = ""; $("step2tab").className = "active"; $("step2tab").disabled = false; window.scrollTo({top:0,behavior:"smooth"}); });
  $("back").addEventListener("click", () => { $("itemForm").hidden = true; $("gameForm").hidden = false; $("step1tab").className = "active"; $("step2tab").className = ""; window.scrollTo({top:0,behavior:"smooth"}); });
  $("step1tab").addEventListener("click", () => { if (!$("gameForm").hidden) return; $("back").click(); });
  $("download").addEventListener("click", () => { const blob = new Blob(["\uFEFF", yaml()], {type:"application/yaml;charset=utf-8"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "Player_ktane_defuser.yaml"; a.click(); URL.revokeObjectURL(a.href); });
})();
