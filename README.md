# 🔐 Universal Obfuscator

Ein leistungsstarker Web-basierter Obfuscator, der Text mit mehreren Encoding-Methoden verschlüsseln und entschlüsseln kann - egal wie oft der Text verschleiert wurde!

## 🌟 Features

- **Mehrfach-Verschlüsselung**: Unterstützt ROT13, Base64 und Marshal (JSON) Encoding
- **Auto-Entschlüsselung**: Erkennt automatisch verwendete Encoding-Methoden und entschlüsselt vollständig
- **Unbegrenzte Ebenen**: Kann beliebig viele Verschlüsselungsebenen handhaben
- **Benutzerfreundlich**: Moderne, intuitive Web-Oberfläche
- **Keine Installation**: Läuft direkt im Browser über GitHub Pages

## 🚀 Live Demo

Die Anwendung ist verfügbar unter: [https://deranderechris.github.io/obfuskator/](https://deranderechris.github.io/obfuskator/)

## 📖 Verwendung

### Verschlüsseln
1. Geben Sie Ihren Text in das Eingabefeld ein
2. Wählen Sie die gewünschten Encoding-Methoden (ROT13, Base64, Marshal)
3. Klicken Sie auf "Verschlüsseln"
4. Die Methoden werden in der Reihenfolge ROT13 → Base64 → Marshal angewendet

### Entschlüsseln
1. Geben Sie den verschlüsselten Text ein
2. Klicken Sie auf "Entschlüsseln" für eine einzelne Ebene
3. ODER klicken Sie auf "Auto-Entschlüsseln" für vollständige automatische Entschlüsselung

### Auto-Entschlüsseln
Die Auto-Entschlüsselungsfunktion:
- Erkennt automatisch die verwendeten Encoding-Methoden
- Entschlüsselt den Text vollständig, egal wie oft er verschleiert wurde
- Zeigt alle entfernten Verschlüsselungsebenen an

## 🔧 Unterstützte Encoding-Methoden

- **ROT13**: Caesar-Chiffre mit 13 Zeichen Verschiebung
- **Base64**: Standard Base64-Encoding (RFC 4648)
- **Marshal**: JSON-Serialisierung mit zusätzlicher Obfuskation und Checksumme

## 💻 Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/deranderechris/obfuskator.git
cd obfuskator

# Die index.html Datei in einem Browser öffnen
# Keine Build-Schritte erforderlich!
```

## 📝 Beispiele

**Einfache Verschlüsselung:**
- Original: `Hallo Welt`
- ROT13: `Unyyb Jryg`
- Base64: `SGFsbG8gV2VsdA==`

**Mehrfache Verschlüsselung (ROT13 + Base64 + Marshal):**
- Original: `Geheimer Text`
- ROT13: `Trurvzre Grkg`
- Base64 (von ROT13): `VHJ1cnZ6cmUgR3JrZw==`
- Marshal (von Base64): `{"type":"marshaled","data":"VHJ1cnZ6cmUgR3JrZw==","timestamp":...,"checksum":...}`

## 🤝 Beitragen

Contributions sind willkommen! Öffnen Sie gerne Issues oder Pull Requests.

## 📄 Lizenz

Dieses Projekt ist Open Source und frei verfügbar.