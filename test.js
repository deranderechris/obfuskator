const Obfuskator = require('./index');

// Test cases
console.log('Running Obfuskator tests...\n');

// Test 1: Basic obfuscation
const original1 = 'Hello, World!';
const obfuscated1 = Obfuskator.obfuscate(original1);
const deobfuscated1 = Obfuskator.deobfuscate(obfuscated1);

console.log('Test 1: Basic obfuscation');
console.log('Original:', original1);
console.log('Obfuscated:', obfuscated1);
console.log('Deobfuscated:', deobfuscated1);
console.log('Success:', original1 === deobfuscated1 ? '✓' : '✗');
console.log();

// Test 2: Empty string
const original2 = '';
const obfuscated2 = Obfuskator.obfuscate(original2);
const deobfuscated2 = Obfuskator.deobfuscate(obfuscated2);

console.log('Test 2: Empty string');
console.log('Original:', `"${original2}"`);
console.log('Obfuscated:', `"${obfuscated2}"`);
console.log('Deobfuscated:', `"${deobfuscated2}"`);
console.log('Success:', original2 === deobfuscated2 ? '✓' : '✗');
console.log();

// Test 3: Special characters
const original3 = 'Special chars: !@#$%^&*()';
const obfuscated3 = Obfuskator.obfuscate(original3);
const deobfuscated3 = Obfuskator.deobfuscate(obfuscated3);

console.log('Test 3: Special characters');
console.log('Original:', original3);
console.log('Obfuscated:', obfuscated3);
console.log('Deobfuscated:', deobfuscated3);
console.log('Success:', original3 === deobfuscated3 ? '✓' : '✗');
console.log();

// Test 4: Error handling
console.log('Test 4: Error handling');
try {
  Obfuskator.obfuscate(123);
  console.log('Success: ✗ (should have thrown error)');
} catch (e) {
  console.log('Success: ✓ (correctly threw error for non-string input)');
}
console.log();

console.log('All tests completed!');
