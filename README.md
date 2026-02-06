# 🔒 Obfuskator

Ein webbasiertes Tool zum Obfuskieren (Verschleiern) von Text mit Upload/Download und Copy-Paste Funktionalität.

## Features

- ✅ **Text Eingabe**: Direktes Eingeben von Text im Browser
- ✅ **Datei Upload**: Hochladen von Textdateien (.txt)
- ✅ **Copy-Paste**: Einfügen und Kopieren von Text aus/in die Zwischenablage
- ✅ **Obfuskierung**: Kombinierte Verschleierung mit ROT13 + Base64
- ✅ **Download**: Speichern des obfuskierten Textes als Datei
- ✅ **Responsive Design**: Funktioniert auf Desktop und Mobile

## Verwendung

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Geben Sie Text ein oder laden Sie eine Datei hoch
3. Klicken Sie auf "Obfuskieren"
4. Kopieren oder laden Sie das Ergebnis herunter

### Funktionen im Detail

#### Eingabe (Input)
- **📁 Datei hochladen**: Wählen Sie eine .txt Datei von Ihrem Computer
- **📋 Einfügen**: Fügen Sie Text aus der Zwischenablage ein (Strg+V)
- **🗑️ Löschen**: Löschen Sie den Eingabetext

#### Ausgabe (Output)
- **📋 Kopieren**: Kopieren Sie den obfuskierten Text in die Zwischenablage
- **💾 Herunterladen**: Speichern Sie den Text als `obfuscated_text.txt`
- **🗑️ Löschen**: Löschen Sie den Ausgabetext

### Keyboard Shortcuts

- `Strg + Enter`: Text obfuskieren

## Technologie

- Pure HTML, CSS, JavaScript (keine Abhängigkeiten)
- Moderne Browser APIs (File API, Clipboard API)
- Responsive CSS Grid Layout

## Browser Kompatibilität

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Opera

**Hinweis**: Für Copy-Paste Funktionen benötigt der Browser entsprechende Berechtigungen.