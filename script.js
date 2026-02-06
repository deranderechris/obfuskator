// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const obfuscateBtn = document.getElementById('obfuscateBtn');
const fileUpload = document.getElementById('fileUpload');
const pasteBtn = document.getElementById('pasteBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearInputBtn = document.getElementById('clearInputBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');

// Obfuscation function
function obfuscateText(text) {
    if (!text) return '';
    
    let obfuscated = '';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = char.charCodeAt(0);
        
        // Apply multiple obfuscation techniques
        // 1. Unicode manipulation
        // 2. Character substitution
        // 3. Adding zero-width characters
        
        if (char === ' ') {
            obfuscated += ' ';
        } else if (char === '\n') {
            obfuscated += '\n';
        } else if (char === '\t') {
            obfuscated += '\t';
        } else {
            // Convert to hexadecimal representation
            const hex = charCode.toString(16).padStart(4, '0');
            obfuscated += `\\u${hex}`;
        }
    }
    
    return obfuscated;
}

// Alternative obfuscation: Base64 encoding
function obfuscateTextBase64(text) {
    if (!text) return '';
    // Use TextEncoder for proper UTF-8 encoding instead of deprecated unescape()
    const bytes = new TextEncoder().encode(text);
    const binString = String.fromCharCode(...bytes);
    return btoa(binString);
}

// Alternative obfuscation: ROT13-like transformation
function obfuscateTextRot(text) {
    if (!text) return '';
    
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        
        // Rotate uppercase letters
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + 13) % 26) + 65);
        }
        // Rotate lowercase letters
        else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + 13) % 26) + 97);
        }
        // Keep other characters as is
        return char;
    }).join('');
}

// Combined obfuscation
function obfuscateTextCombined(text) {
    if (!text) return '';
    
    // Step 1: ROT13
    let result = obfuscateTextRot(text);
    // Step 2: Base64
    result = obfuscateTextBase64(result);
    
    return result;
}

// Event Listeners

// Obfuscate button
obfuscateBtn.addEventListener('click', () => {
    const text = inputText.value;
    if (!text.trim()) {
        alert('Bitte geben Sie Text ein oder laden Sie eine Datei hoch.');
        return;
    }
    
    // Use combined obfuscation
    const obfuscated = obfuscateTextCombined(text);
    outputText.value = obfuscated;
    
    showNotification('Text erfolgreich obfuskiert! ✓');
});

// File upload
fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        inputText.value = event.target.result;
        showNotification('Datei erfolgreich hochgeladen! ✓');
    };
    reader.onerror = () => {
        alert('Fehler beim Lesen der Datei.');
    };
    reader.readAsText(file);
});

// Paste button
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        inputText.value = text;
        showNotification('Text aus Zwischenablage eingefügt! ✓');
    } catch (err) {
        alert('Fehler beim Einfügen: ' + err.message + '\nBitte verwenden Sie Strg+V zum Einfügen.');
    }
});

// Copy button
copyBtn.addEventListener('click', async () => {
    const text = outputText.value;
    if (!text.trim()) {
        alert('Kein Text zum Kopieren vorhanden.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Text in Zwischenablage kopiert! ✓');
    } catch (err) {
        // Fallback for older browsers using deprecated document.execCommand
        // This is kept for legacy browser support
        outputText.select();
        document.execCommand('copy');
        showNotification('Text in Zwischenablage kopiert! ✓');
    }
});

// Download button
downloadBtn.addEventListener('click', () => {
    const text = outputText.value;
    if (!text.trim()) {
        alert('Kein Text zum Herunterladen vorhanden.');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Datei wird heruntergeladen... ✓');
});

// Clear input button
clearInputBtn.addEventListener('click', () => {
    inputText.value = '';
    fileUpload.value = '';
    showNotification('Eingabe gelöscht! ✓');
});

// Clear output button
clearOutputBtn.addEventListener('click', () => {
    outputText.value = '';
    showNotification('Ausgabe gelöscht! ✓');
});

// Notification function
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to obfuscate
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        obfuscateBtn.click();
    }
});
