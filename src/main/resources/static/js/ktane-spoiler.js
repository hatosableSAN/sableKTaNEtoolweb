(() => {
  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[character]);
  let parsed = null;
  const metadataLabels = {
    "Filling Algorithm": "配置アルゴリズム", "Players": "プレイヤー数", "Plando Options": "Plandoオプション", "Game": "ゲーム",
    "Location Count": "ロケーション数", "Progression Balancing": "進行バランス", "Accessibility": "アクセシビリティ",
    "Local Items": "ローカルアイテム", "Non-local Items": "非ローカルアイテム", "Start Inventory": "開始時インベントリ",
    "Start Hints": "開始時アイテムヒント", "Start Location Hints": "開始時ロケーションヒント", "Excluded Locations": "除外ロケーション",
    "Priority Locations": "優先ロケーション", "Item Links": "アイテムリンク", "Plando Items": "Plandoアイテム",
    "Use Random Rule Seed": "ランダムルールシードを使用", "Rule Seed Number": "ルールシード番号", "Adventure Mode": "アドベンチャーモード",
    "Hardlock Modules": "ハードロックモジュール", "OHKO Mode": "OHKOモード", "Death Link": "Death Link",
    "Death Link Behaviour": "Death Linkの動作", "Final Challenge Composition": "最終チャレンジ構成"
  };
  function splitEntry(line) {
    const index = line.lastIndexOf(": ");
    return index < 0 ? null : { location: line.slice(0, index).trim(), item: line.slice(index + 2).trim() };
  }

  function itemClass(item) {
    if (item === "Bomb Fragment") return "item-fragment";
    if (item === "Empty Manual Page") return "item-filler";
    if (item === "Strike+") return "item-strike";
    if (item === "Time+" || item === "Time++") return "item-time";
    return "item-module";
  }

  function parseSpoiler(text) {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r/g, "");
    const locationsIndex = clean.indexOf("\nLocations:\n");
    const playthroughIndex = clean.indexOf("\nPlaythrough:\n");
    if (locationsIndex < 0 || playthroughIndex < 0 || playthroughIndex < locationsIndex) throw new Error("LocationsとPlaythroughを含むArchipelago Spoiler.txtを選択してください。");

    const headerText = clean.slice(0, locationsIndex);
    const metadata = {};
    headerText.split("\n").forEach(line => {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) metadata[match[1].trim()] = match[2].trim();
    });
    const firstLine = headerText.split("\n")[0];
    const seed = firstLine.match(/Seed:\s*(\d+)/)?.[1] || "不明";
    const version = firstLine.match(/Archipelago Version\s+([\d.]+)/)?.[1] || "不明";
    const locations = clean.slice(locationsIndex + "\nLocations:\n".length, playthroughIndex).trim().split("\n").map(splitEntry).filter(Boolean);
    if (!locations.length) throw new Error("location配置を読み取れませんでした。");

    const spheres = [];
    let current = null;
    clean.slice(playthroughIndex + "\nPlaythrough:\n".length).split("\n").forEach(line => {
      const sphere = line.match(/^(\d+): \{$/);
      if (sphere) {
        current = { number: Number(sphere[1]), entries: [] };
        spheres.push(current);
      } else if (current) {
        const entry = splitEntry(line.trim());
        if (entry) current.entries.push(entry);
      }
    });
    return { metadata, seed, version, locations, spheres };
  }

  function render(data, fileName) {
    parsed = data;
    $("resultTitle").textContent = fileName;
    $("resultSubtitle").textContent = `Archipelago ${data.version} ／ シード ${data.seed}`;
    const metadataEntries = [["シード", data.seed], ...Object.entries(data.metadata).map(([label, value]) => [metadataLabels[label] || label, value || "—"])];
    $("metadata").innerHTML = metadataEntries.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
    const itemCounts = new Map();
    data.locations.forEach(({item}) => itemCounts.set(item, (itemCounts.get(item) || 0) + 1));
    const cards = [
      ["アドベンチャー", data.metadata["Adventure Mode"] || "不明"],
      ["location", data.locations.length],
      ["アイテム種類", itemCounts.size]
    ];
    $("summary").innerHTML = cards.map(([label, value]) => `<div class="summary-card"><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("");

    const usableSpheres = data.spheres.filter(sphere => sphere.number > 0);
    $("playthrough").innerHTML = usableSpheres.map((sphere, index) => `<div class="sphere"><button class="sphere-button${index === 0 ? " active" : ""}" type="button" data-sphere="${sphere.number}"><b>Step${sphere.number}</b><span>${sphere.entries.length} location</span></button></div>`).join("");
    const showSphere = number => {
      const sphere = usableSpheres.find(value => value.number === number);
      document.querySelectorAll(".sphere-button").forEach(button => button.classList.toggle("active", Number(button.dataset.sphere) === number));
      $("sphereDetail").innerHTML = `<h4>Step${number}</h4><ul>${sphere.entries.map(entry => `<li>${escapeHtml(entry.location)}：<b class="item-name ${itemClass(entry.item)}">${escapeHtml(entry.item)}</b></li>`).join("")}</ul>`;
    };
    document.querySelectorAll(".sphere-button").forEach(button => button.addEventListener("click", () => showSphere(Number(button.dataset.sphere))));
    if (usableSpheres.length) showSphere(usableSpheres[0].number);

    $("itemFilter").innerHTML = '<option value="">すべてのアイテム</option>' + [...itemCounts.keys()].sort().map(item => `<option>${escapeHtml(item)}</option>`).join("");
    $("locationSearch").value = "";
    renderLocations();
    $("visualization").hidden = false;
    $("visualization").scrollIntoView({behavior: "smooth", block: "start"});
  }

  function renderLocations() {
    if (!parsed) return;
    const query = $("locationSearch").value.trim().toLowerCase();
    const item = $("itemFilter").value;
    const rows = parsed.locations.filter(entry => (!query || entry.location.toLowerCase().includes(query)) && (!item || entry.item === item));
    $("locationCount").textContent = `${rows.length} / ${parsed.locations.length}件`;
    $("locationRows").innerHTML = rows.length ? rows.map(entry => `<tr><td>${escapeHtml(entry.location)}</td><td><span class="item-name ${itemClass(entry.item)}">${escapeHtml(entry.item)}</span></td></tr>`).join("") : '<tr><td class="empty-result" colspan="2">一致するlocationがありません。</td></tr>';
  }

  async function loadFile(file) {
    if (!file) return;
    $("fileError").hidden = true;
    try {
      render(parseSpoiler(await file.text()), file.name);
    } catch (error) {
      $("visualization").hidden = true;
      $("fileError").textContent = error.message;
      $("fileError").hidden = false;
    }
  }

  $("spoilerFile").addEventListener("change", event => loadFile(event.target.files[0]));
  $("locationSearch").addEventListener("input", renderLocations);
  $("itemFilter").addEventListener("change", renderLocations);
  ["dragenter", "dragover"].forEach(type => $("dropZone").addEventListener(type, event => { event.preventDefault(); $("dropZone").classList.add("dragging"); }));
  ["dragleave", "drop"].forEach(type => $("dropZone").addEventListener(type, event => { event.preventDefault(); $("dropZone").classList.remove("dragging"); }));
  $("dropZone").addEventListener("drop", event => loadFile(event.dataTransfer.files[0]));
})();
