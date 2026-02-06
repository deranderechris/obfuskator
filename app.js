const algorithms = {
  base64: {
    key: "base64",
    label: { de: "Base64", en: "Base64", it: "Base64" },
    encode: async (text) => encodeBase64(text),
    decode: async (text) => decodeBase64(text),
  },
  hex: {
    key: "hex",
    label: { de: "Hex", en: "Hex", it: "Hex" },
    encode: async (text) => hexEncode(text),
    decode: async (text) => hexDecode(text),
  },
  gzip: {
    key: "gzip",
    label: { de: "Gzip + Base64", en: "Gzip + Base64", it: "Gzip + Base64" },
    encode: async (text) => gzipBase64Encode(text),
    decode: async (text) => gzipBase64Decode(text),
  },
  xor: {
    key: "xor",
    label: { de: "XOR", en: "XOR", it: "XOR" },
    encode: async (text, ctx) => xorEncode(text, ctx.xorKey),
    decode: async (text, ctx) => xorDecode(text, ctx.xorKey),
  },
  aes: {
    key: "aes",
    label: { de: "AES-GCM", en: "AES-GCM", it: "AES-GCM" },
    encode: async (text, ctx) => aesEncrypt(text, ctx.passphrase),
    decode: async (text, ctx) => aesDecrypt(text, ctx.passphrase),
  },
  rot13: {
    key: "rot13",
    label: { de: "ROT13", en: "ROT13", it: "ROT13" },
    encode: async (text) => rot13(text),
    decode: async (text) => rot13(text),
  },
};

const translations = {
  de: {
    tagline: "Verschleiern und entschluesseln in Sekunden",
    language: "Sprache",
    themeDark: "Dark",
    themeLight: "Light",
    obfuscateTitle: "Verschluesseln",
    obfuscateSubtitle: "Text in ein teilbares Payload-Format umwandeln.",
    deobfuscateTitle: "Entschluesseln",
    deobfuscateSubtitle: "Payloads wieder in lesbaren Text rueckfuehren.",
    run: "Start",
    clear: "Leeren",
    mode: "Modus",
    single: "Einzeln",
    chain: "Kette",
    algorithm: "Algorithmus",
    chainOrder: "Reihenfolge",
    xorKey: "XOR-Schluessel",
    aesPass: "AES-Passphrase",
    reverseOrder: "Reihenfolge umkehren",
    input: "Eingabe",
    output: "Ausgabe",
    upload: "Upload",
    paste: "Einfuegen",
    copy: "Kopieren",
    download: "Download",
    dropHint: "Dateien per Drag & Drop in das Eingabefeld ziehen.",
    notesTitle: "Hinweise",
    note1: "Alles laeuft lokal im Browser.",
    note2: "AES-GCM Format: v1:base64(salt):base64(iv):base64(cipher).",
    note3: "Gzip benoetigt moderne Browser APIs.",
  },
  en: {
    tagline: "Obfuscate and deobfuscate in seconds",
    language: "Language",
    themeDark: "Dark",
    themeLight: "Light",
    obfuscateTitle: "Obfuscate",
    obfuscateSubtitle: "Encode or encrypt text into a shareable payload.",
    deobfuscateTitle: "Deobfuscate",
    deobfuscateSubtitle: "Decode payloads back into readable text.",
    run: "Run",
    clear: "Clear",
    mode: "Mode",
    single: "Single",
    chain: "Chain",
    algorithm: "Algorithm",
    chainOrder: "Chain order",
    xorKey: "XOR key",
    aesPass: "AES passphrase",
    reverseOrder: "Reverse order",
    input: "Input",
    output: "Output",
    upload: "Upload",
    paste: "Paste",
    copy: "Copy",
    download: "Download",
    dropHint: "Drag and drop files into the input panel.",
    notesTitle: "Notes",
    note1: "All processing runs locally in your browser.",
    note2: "AES-GCM format: v1:base64(salt):base64(iv):base64(cipher).",
    note3: "Gzip requires modern browser APIs.",
  },
  it: {
    tagline: "Offusca e deoffusca in pochi secondi",
    language: "Lingua",
    themeDark: "Dark",
    themeLight: "Light",
    obfuscateTitle: "Offusca",
    obfuscateSubtitle: "Codifica o cifra il testo in un payload condivisibile.",
    deobfuscateTitle: "Deoffusca",
    deobfuscateSubtitle: "Decodifica i payload in testo leggibile.",
    run: "Avvia",
    clear: "Pulisci",
    mode: "Modalita",
    single: "Singolo",
    chain: "Catena",
    algorithm: "Algoritmo",
    chainOrder: "Ordine",
    xorKey: "Chiave XOR",
    aesPass: "Passphrase AES",
    reverseOrder: "Inverti ordine",
    input: "Input",
    output: "Output",
    upload: "Upload",
    paste: "Incolla",
    copy: "Copia",
    download: "Download",
    dropHint: "Trascina i file nel pannello di input.",
    notesTitle: "Note",
    note1: "Tutto avviene localmente nel browser.",
    note2: "Formato AES-GCM: v1:base64(salt):base64(iv):base64(cipher).",
    note3: "Gzip richiede API moderne del browser.",
  },
};

const algorithmKeys = Object.keys(algorithms);

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function decodeBase64(base64) {
  const binary = atob(base64.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function hexEncode(text) {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexDecode(hex) {
  const clean = hex.trim().replace(/\s+/g, "");
  if (clean.length % 2 !== 0) {
    throw new Error("Invalid hex length");
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

async function gzipBase64Encode(text) {
  if (!window.CompressionStream) {
    throw new Error("CompressionStream not supported");
  }
  const encoder = new TextEncoder();
  const stream = new Blob([encoder.encode(text)]).stream();
  const compressed = stream.pipeThrough(new CompressionStream("gzip"));
  const buffer = await new Response(compressed).arrayBuffer();
  let binary = "";
  new Uint8Array(buffer).forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

async function gzipBase64Decode(text) {
  if (!window.DecompressionStream) {
    throw new Error("DecompressionStream not supported");
  }
  const binary = atob(text.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const stream = new Blob([bytes]).stream();
  const decompressed = stream.pipeThrough(new DecompressionStream("gzip"));
  const buffer = await new Response(decompressed).arrayBuffer();
  return new TextDecoder().decode(buffer);
}

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    const code = char.charCodeAt(0) - base;
    return String.fromCharCode(((code + 13) % 26) + base);
  });
}

function xorEncode(text, key) {
  if (!key) {
    throw new Error("XOR key required");
  }
  const textBytes = new TextEncoder().encode(text);
  const keyBytes = new TextEncoder().encode(key);
  const result = textBytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
  let binary = "";
  result.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function xorDecode(payload, key) {
  if (!key) {
    throw new Error("XOR key required");
  }
  const binary = atob(payload.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(key);
  const result = bytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
  return new TextDecoder().decode(result);
}

async function aesEncrypt(text, passphrase) {
  if (!passphrase) {
    throw new Error("Passphrase required");
  }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const encoded = new TextEncoder().encode(text);
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  return [
    "v1",
    encodeBase64Bytes(salt),
    encodeBase64Bytes(iv),
    encodeBase64Bytes(new Uint8Array(cipher)),
  ].join(":");
}

async function aesDecrypt(payload, passphrase) {
  if (!passphrase) {
    throw new Error("Passphrase required");
  }
  const parts = payload.trim().split(":");
  if (parts.length !== 4 || parts[0] !== "v1") {
    throw new Error("Invalid AES payload");
  }
  const salt = decodeBase64Bytes(parts[1]);
  const iv = decodeBase64Bytes(parts[2]);
  const cipher = decodeBase64Bytes(parts[3]);
  const key = await deriveKey(passphrase, salt);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
  return new TextDecoder().decode(plain);
}

function encodeBase64Bytes(bytes) {
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function decodeBase64Bytes(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function deriveKey(passphrase, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function selectElements() {
  return {
    language: document.getElementById("language"),
    themeToggle: document.getElementById("theme-toggle"),
    toast: document.getElementById("toast"),
    obf: {
      run: document.getElementById("obf-run"),
      clear: document.getElementById("obf-clear"),
      input: document.getElementById("obf-input"),
      output: document.getElementById("obf-output"),
      upload: document.getElementById("obf-upload"),
      paste: document.getElementById("obf-paste"),
      copy: document.getElementById("obf-copy"),
      download: document.getElementById("obf-download"),
      algo: document.getElementById("obf-algo"),
      chain: document.getElementById("obf-chain"),
      single: document.getElementById("obf-single"),
      xor: document.getElementById("obf-xor"),
      pass: document.getElementById("obf-pass"),
      chainSteps: document.querySelectorAll("#obf-chain .chain-step"),
      modeButtons: document.querySelectorAll("button.segment[data-target='obf']"),
    },
    deobf: {
      run: document.getElementById("deobf-run"),
      clear: document.getElementById("deobf-clear"),
      input: document.getElementById("deobf-input"),
      output: document.getElementById("deobf-output"),
      upload: document.getElementById("deobf-upload"),
      paste: document.getElementById("deobf-paste"),
      copy: document.getElementById("deobf-copy"),
      download: document.getElementById("deobf-download"),
      algo: document.getElementById("deobf-algo"),
      chain: document.getElementById("deobf-chain"),
      single: document.getElementById("deobf-single"),
      xor: document.getElementById("deobf-xor"),
      pass: document.getElementById("deobf-pass"),
      reverse: document.getElementById("deobf-reverse"),
      chainSteps: document.querySelectorAll("#deobf-chain .chain-step"),
      modeButtons: document.querySelectorAll("button.segment[data-target='deobf']"),
    },
  };
}

function applyTranslations(language) {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}

function populateAlgorithms(selects, language) {
  selects.forEach((select) => {
    select.innerHTML = "";
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "-";
    select.appendChild(empty);
    algorithmKeys.forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = algorithms[key].label[language];
      select.appendChild(option);
    });
  });
}

function getSelectedSteps(section) {
  const mode = section.modeButtons[0].classList.contains("active") ? "single" : "chain";
  if (mode === "single") {
    return [section.algo.value].filter(Boolean);
  }
  return Array.from(section.chainSteps)
    .map((select) => select.value)
    .filter(Boolean);
}

async function runTransform(section, direction) {
  const input = section.input.value;
  if (!input.trim()) {
    showToast("Input is empty");
    return;
  }
  const steps = getSelectedSteps(section);
  if (steps.length === 0) {
    showToast("Select an algorithm");
    return;
  }
  let orderedSteps = steps;
  if (direction === "decode" && section.reverse && section.reverse.checked) {
    orderedSteps = [...steps].reverse();
  }
  try {
    section.run.disabled = true;
    let value = input;
    for (const step of orderedSteps) {
      const algo = algorithms[step];
      if (!algo) {
        continue;
      }
      const ctx = { xorKey: section.xor.value, passphrase: section.pass.value };
      value = direction === "encode" ? await algo.encode(value, ctx) : await algo.decode(value, ctx);
    }
    section.output.value = value;
    showToast("Done");
  } catch (error) {
    showToast(error.message || "Error");
  } finally {
    section.run.disabled = false;
  }
}

function clearSection(section) {
  section.input.value = "";
  section.output.value = "";
}

async function pasteInto(target) {
  const text = await navigator.clipboard.readText();
  target.value = text;
}

function copyFrom(source) {
  if (!source.value) {
    return;
  }
  navigator.clipboard.writeText(source.value);
  showToast("Copied");
}

function downloadFrom(source, filename) {
  const blob = new Blob([source.value || ""], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function setupDragDrop(area, target) {
  const card = area.closest(".io-card");
  area.addEventListener("dragover", (event) => {
    event.preventDefault();
    card.classList.add("active");
  });
  area.addEventListener("dragleave", () => card.classList.remove("active"));
  area.addEventListener("drop", async (event) => {
    event.preventDefault();
    card.classList.remove("active");
    const file = event.dataTransfer.files[0];
    if (!file) {
      return;
    }
    const text = await file.text();
    target.value = text;
  });
}

function setMode(section, mode) {
  section.modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  section.single.classList.toggle("hidden", mode !== "single");
  section.chain.classList.toggle("hidden", mode !== "chain");
}

function init() {
  const elements = selectElements();
  const language = elements.language.value;
  applyTranslations(language);
  populateAlgorithms([elements.obf.algo, elements.deobf.algo, ...elements.obf.chainSteps, ...elements.deobf.chainSteps], language);
  elements.themeToggle.textContent = translations[language].themeDark;

  elements.language.addEventListener("change", (event) => {
    const selected = event.target.value;
    applyTranslations(selected);
    populateAlgorithms([
      elements.obf.algo,
      elements.deobf.algo,
      ...elements.obf.chainSteps,
      ...elements.deobf.chainSteps,
    ], selected);
    elements.themeToggle.textContent = document.body.dataset.theme === "dark"
      ? translations[selected].themeDark
      : translations[selected].themeLight;
  });

  elements.themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme === "dark";
    document.body.dataset.theme = isDark ? "light" : "dark";
    const lang = elements.language.value;
    elements.themeToggle.textContent = isDark
      ? translations[lang].themeLight
      : translations[lang].themeDark;
  });

  elements.obf.run.addEventListener("click", () => runTransform(elements.obf, "encode"));
  elements.deobf.run.addEventListener("click", () => runTransform(elements.deobf, "decode"));
  elements.obf.clear.addEventListener("click", () => clearSection(elements.obf));
  elements.deobf.clear.addEventListener("click", () => clearSection(elements.deobf));
  elements.obf.paste.addEventListener("click", () => pasteInto(elements.obf.input));
  elements.deobf.paste.addEventListener("click", () => pasteInto(elements.deobf.input));
  elements.obf.copy.addEventListener("click", () => copyFrom(elements.obf.output));
  elements.deobf.copy.addEventListener("click", () => copyFrom(elements.deobf.output));
  elements.obf.download.addEventListener("click", () => downloadFrom(elements.obf.output, "obfuskated.txt"));
  elements.deobf.download.addEventListener("click", () => downloadFrom(elements.deobf.output, "deobfuskated.txt"));

  elements.obf.upload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      elements.obf.input.value = await file.text();
    }
  });
  elements.deobf.upload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      elements.deobf.input.value = await file.text();
    }
  });

  setupDragDrop(elements.obf.input, elements.obf.input);
  setupDragDrop(elements.deobf.input, elements.deobf.input);

  elements.obf.modeButtons.forEach((button) =>
    button.addEventListener("click", () => setMode(elements.obf, button.dataset.mode))
  );
  elements.deobf.modeButtons.forEach((button) =>
    button.addEventListener("click", () => setMode(elements.deobf, button.dataset.mode))
  );
}

init();
