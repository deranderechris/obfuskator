# obfuskator

A simple string obfuscator for Node.js that encodes and obscures text.

## Features

- Simple string obfuscation using base64 encoding and character substitution
- Easy to use API
- Reversible obfuscation (deobfuscate back to original text)

## Installation

```bash
npm install
```

## Usage

```javascript
const Obfuskator = require('./index');

// Obfuscate a string
const obfuscated = Obfuskator.obfuscate('Hello, World!');
console.log(obfuscated); // Outputs obfuscated string

// Deobfuscate back to original
const original = Obfuskator.deobfuscate(obfuscated);
console.log(original); // Outputs: Hello, World!
```

## API

### `Obfuskator.obfuscate(text)`

Obfuscates the input text.

- **Parameters:**
  - `text` (string): The text to obfuscate
- **Returns:** (string) The obfuscated text
- **Throws:** TypeError if input is not a string

### `Obfuskator.deobfuscate(obfuscated)`

Deobfuscates previously obfuscated text.

- **Parameters:**
  - `obfuscated` (string): The obfuscated text
- **Returns:** (string) The original text
- **Throws:** TypeError if input is not a string

## Examples

Run the example:

```bash
node example.js
```

## Testing

Run the tests:

```bash
npm test
```

## License

MIT