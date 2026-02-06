const Obfuskator = require('./index');

// Example usage
const secretMessage = 'This is a secret message!';

console.log('=== Obfuskator Example ===\n');
console.log('Original message:', secretMessage);

const obfuscated = Obfuskator.obfuscate(secretMessage);
console.log('Obfuscated:', obfuscated);

const deobfuscated = Obfuskator.deobfuscate(obfuscated);
console.log('Deobfuscated:', deobfuscated);

console.log('\nMatch:', secretMessage === deobfuscated ? 'Yes ✓' : 'No ✗');
