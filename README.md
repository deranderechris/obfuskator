# obfuskator

Ein konfigurierbares Textobfuskierungs-Tool (A configurable text obfuscation tool)

## Übersicht (Overview)

Obfuskator ist ein Python-Tool zum Verschleiern von Text mit verschiedenen, kombinierbaren Methoden. Sie können auswählen, welche Verschleierungsmethoden verwendet werden sollen, wie oft sie angewendet werden und verschiedene Methoden miteinander kombinieren.

Obfuskator is a Python tool for obfuscating text with various combinable methods. You can select which obfuscation methods to use, how many times to apply them, and combine different methods together.

## Features

- **Mehrere Verschleierungsmethoden (Multiple obfuscation methods):**
  - `char_replace`: Ersetzt Zeichen durch ähnlich aussehende Unicode-Zeichen (Replaces characters with unicode lookalikes)
  - `whitespace`: Fügt unsichtbare Leerzeichen ein (Inserts invisible whitespace)
  - `case_random`: Randomisiert Groß-/Kleinschreibung (Randomizes character case)
  - `reverse_chunks`: Kehrt zufällige Textabschnitte um (Reverses random text chunks)

- **Konfigurierbare Iterationen (Configurable iterations):** Wenden Sie Methoden mehrfach an für stärkere Verschleierung (Apply methods multiple times for stronger obfuscation)

- **Methodenkombination (Method combination):** Kombinieren Sie verschiedene Methoden in einer Ausführung (Combine different methods in one execution)

## Installation

Keine zusätzlichen Abhängigkeiten erforderlich - benötigt nur Python 3.6+ (No additional dependencies required - only needs Python 3.6+)

```bash
git clone https://github.com/deranderechris/obfuskator.git
cd obfuskator
```

## Verwendung (Usage)

### Einfaches Beispiel (Basic Example)

```bash
# Eine Methode anwenden (Apply one method)
python obfuskator.py -t "Hello World" -m char_replace

# Mehrere Methoden kombinieren (Combine multiple methods)
python obfuskator.py -t "Hello World" -m char_replace whitespace case_random

# Methoden mehrfach anwenden (Apply methods multiple times)
python obfuskator.py -t "Hello World" -m char_replace -i 3

# Alle Methoden mit 2 Iterationen (All methods with 2 iterations)
python obfuskator.py -t "Hello World" -m char_replace whitespace case_random reverse_chunks -i 2
```

### Verfügbare Optionen (Available Options)

```
-t, --text TEXT           Text zum Verschleiern (Text to obfuscate)
-m, --methods METHODS     Verschleierungsmethoden (one or more)
                         Choices: char_replace, whitespace, case_random, reverse_chunks
-i, --iterations N        Anzahl der Wiederholungen (default: 1)
--list-methods           Liste aller verfügbaren Methoden (List all available methods)
--seed SEED              Zufallsseed für reproduzierbare Ergebnisse (Random seed for reproducibility)
```

### Beispiele (Examples)

```bash
# Liste verfügbare Methoden (List available methods)
python obfuskator.py --list-methods

# Nur Zeichenersetzung (Character replacement only)
python obfuskator.py -t "Geheime Nachricht" -m char_replace

# Kombination von Methoden (Combination of methods)
python obfuskator.py -t "Wichtige Information" -m char_replace whitespace -i 2

# Reproduzierbare Verschleierung mit Seed (Reproducible obfuscation with seed)
python obfuskator.py -t "Test" -m char_replace --seed 42
```

## Tests ausführen (Running Tests)

```bash
python test_obfuskator.py
```

Oder mit unittest:

```bash
python -m unittest test_obfuskator.py
```

## Verschleierungsmethoden im Detail (Obfuscation Methods in Detail)

### char_replace
Ersetzt Buchstaben durch ähnlich aussehende Unicode-Zeichen (z.B. lateinisches 'a' → kyrillisches 'а').
Replaces letters with similar-looking unicode characters (e.g., Latin 'a' → Cyrillic 'а').

### whitespace  
Fügt unsichtbare Unicode-Leerzeichen (Zero-Width Spaces) ein.
Inserts invisible unicode whitespace (Zero-Width Spaces).

### case_random
Randomisiert die Groß- und Kleinschreibung von Buchstaben.
Randomizes the case of letters.

### reverse_chunks
Kehrt zufällige Abschnitte des Textes um.
Reverses random chunks of the text.

## Lizenz (License)

MIT License