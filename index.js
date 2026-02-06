/**
 * Simple string obfuscator
 * Converts text into a more obscured format
 */

class Obfuskator {
  /**
   * Obfuscate a string by encoding it
   * @param {string} text - The text to obfuscate
   * @returns {string} The obfuscated text
   */
  static obfuscate(text) {
    if (typeof text !== 'string') {
      throw new TypeError('Input must be a string');
    }
    
    // Convert to base64
    const base64 = Buffer.from(text).toString('base64');
    
    // Add some character substitution
    return base64
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        return String.fromCharCode(code + 1);
      })
      .join('');
  }

  /**
   * Deobfuscate a string
   * @param {string} obfuscated - The obfuscated text
   * @returns {string} The original text
   */
  static deobfuscate(obfuscated) {
    if (typeof obfuscated !== 'string') {
      throw new TypeError('Input must be a string');
    }
    
    // Reverse character substitution
    const base64 = obfuscated
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        return String.fromCharCode(code - 1);
      })
      .join('');
    
    // Decode from base64
    return Buffer.from(base64, 'base64').toString('utf8');
  }
}

module.exports = Obfuskator;
