Obfuskator – Deutsche Beschreibung
Obfuskator  
Ein statisches GitHub‑Pages‑Tool, um Text direkt im Browser zu verschleiern (obfuscate) und wieder zu entschlüsseln (deobfuscate).

✨ Funktionen
Verschlüsseln und entschlüsseln mit:

Base64

Hex

Gzip + Base64

XOR

AES‑GCM

ROT13

Einzelmodus oder Kettenmodus (bis zu drei Schritte hintereinander)

Drag‑and‑Drop Upload, Einfügen, Kopieren und Herunterladen

Dunkles und helles Design (Dark/Light Mode)

Benutzeroberfläche in Deutsch, Englisch, Italienisch

🧑‍💻 Benutzung
Du kannst das Tool auf zwei Arten verwenden:

1. Lokal
Einfach die Datei index.html im Browser öffnen.
Es ist keine Installation nötig.

2. Online über GitHub Pages
GitHub Pages aktivieren → Seite öffnen → fertig.
Alles läuft direkt im Browser.

📝 Hinweise
Die komplette Verarbeitung passiert lokal im Browser.
Es werden keine Daten hochgeladen.

AES‑GCM Ausgabeformat:
v1:base64(salt):base64(iv):base64(cipher)

Gzip benötigt moderne Browser‑APIs
(CompressionStream / DecompressionStream)
