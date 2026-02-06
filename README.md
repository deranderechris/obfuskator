# Obfuskator

Static GitHub Pages tool to obfuscate and deobfuscate text in the browser.

## Features

- Obfuscate and deobfuscate with Base64, Hex, Gzip+Base64, XOR, AES-GCM, ROT13
- Single or chain mode (up to three steps)
- Drag-and-drop upload, paste, copy, and download
- Dark and light theme toggle
- UI languages: German, English, Italian

## Usage

Open [index.html](index.html) in a browser or enable GitHub Pages for the repo.

## Notes

- All processing runs locally in your browser.
- AES-GCM output format: `v1:base64(salt):base64(iv):base64(cipher)`
- Gzip requires modern browser APIs (CompressionStream/DecompressionStream).