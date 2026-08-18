(() => {
  const checkbox = document.getElementById("manualcheck");
  const fields = document.getElementById("interactive");
  const originalName = document.getElementById("original-name");
  const fileInput = document.getElementById("manual-file");
  const fileName = document.getElementById("file-name");

  checkbox.addEventListener("change", () => {
    fields.hidden = !checkbox.checked;
    originalName.required = checkbox.checked;
    if (checkbox.checked) originalName.focus();
  });

  fileInput.addEventListener("change", () => {
    const selected = fileInput.files && fileInput.files[0];
    fileName.textContent = selected ? selected.name : "ファイルが選択されていません";
    fileName.classList.toggle("selected", Boolean(selected));
  });
})();
