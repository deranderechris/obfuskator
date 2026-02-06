#!/usr/bin/env python3
"""
Obfuskator - A text obfuscation tool with configurable methods and iterations

This tool allows you to obfuscate text using various methods:
- char_replace: Replace characters with unicode lookalikes
- whitespace: Insert random whitespace
- case_random: Randomize character case
- reverse_chunks: Reverse chunks of text

You can combine methods and apply them multiple times.
"""

import argparse
import random
import string
from typing import List, Callable


class Obfuskator:
    """Main obfuscation engine with pluggable methods"""
    
    # Unicode lookalike mappings
    CHAR_REPLACEMENTS = {
        'a': ['а', 'ạ', 'ă', 'ā'],  # Cyrillic a, a with dot below, a with breve, a with macron
        'e': ['е', 'ė', 'ĕ', 'ē'],  # Cyrillic e, e with dot above, e with breve, e with macron
        'o': ['о', 'ọ', 'ŏ', 'ō'],  # Cyrillic o, o with dot below, o with breve, o with macron
        'i': ['і', 'ɪ', 'ĭ', 'ī'],  # Cyrillic i, small capital i, i with breve, i with macron
        'c': ['с', 'ċ', 'ć', 'č'],  # Cyrillic c, c with dot above, c with acute, c with caron
        'p': ['р', 'ṗ', 'ṕ'],       # Cyrillic p, p with dot above, p with acute
        's': ['ѕ', 'ṡ', 'ś', 'š'],  # Cyrillic s, s with dot above, s with acute, s with caron
        'x': ['х', 'ẋ'],            # Cyrillic x, x with dot above
        'y': ['у', 'ẏ', 'ý', 'ŷ'],  # Cyrillic y, y with dot above, y with acute, y with circumflex
    }
    
    def __init__(self):
        """Initialize the obfuscator"""
        self.methods = {
            'char_replace': self._char_replace,
            'whitespace': self._whitespace_insert,
            'case_random': self._case_randomize,
            'reverse_chunks': self._reverse_chunks,
        }
    
    def _char_replace(self, text: str) -> str:
        """Replace characters with unicode lookalikes"""
        result = []
        for char in text:
            lower_char = char.lower()
            if lower_char in self.CHAR_REPLACEMENTS:
                # Randomly decide whether to replace (50% chance)
                if random.random() < 0.5:
                    replacement = random.choice(self.CHAR_REPLACEMENTS[lower_char])
                    # Preserve case
                    if char.isupper():
                        replacement = replacement.upper()
                    result.append(replacement)
                else:
                    result.append(char)
            else:
                result.append(char)
        return ''.join(result)
    
    def _whitespace_insert(self, text: str) -> str:
        """Insert random invisible/zero-width spaces"""
        result = []
        invisible_spaces = ['\u200b', '\u200c', '\u200d']  # Zero-width spaces
        
        for i, char in enumerate(text):
            result.append(char)
            # Add invisible space randomly (30% chance, but not after whitespace)
            if char not in string.whitespace and random.random() < 0.3:
                result.append(random.choice(invisible_spaces))
        
        return ''.join(result)
    
    def _case_randomize(self, text: str) -> str:
        """Randomize the case of letters"""
        result = []
        for char in text:
            if char.isalpha():
                # Randomly decide case
                if random.random() < 0.5:
                    result.append(char.upper())
                else:
                    result.append(char.lower())
            else:
                result.append(char)
        return ''.join(result)
    
    def _reverse_chunks(self, text: str) -> str:
        """Reverse random chunks of text"""
        if len(text) < 2:
            return text
        
        result = list(text)
        # Reverse 2-5 character chunks randomly
        num_chunks = max(1, len(text) // 10)
        
        for _ in range(num_chunks):
            chunk_size = random.randint(2, min(5, len(text)))
            start_pos = random.randint(0, len(text) - chunk_size)
            
            # Reverse the chunk
            chunk = result[start_pos:start_pos + chunk_size]
            result[start_pos:start_pos + chunk_size] = reversed(chunk)
        
        return ''.join(result)
    
    def obfuscate(self, text: str, methods: List[str], iterations: int = 1) -> str:
        """
        Obfuscate text using specified methods and iterations
        
        Args:
            text: The text to obfuscate
            methods: List of method names to apply
            iterations: Number of times to apply the methods
        
        Returns:
            Obfuscated text
        """
        result = text
        
        for _ in range(iterations):
            for method_name in methods:
                if method_name in self.methods:
                    result = self.methods[method_name](result)
                else:
                    raise ValueError(f"Unknown obfuscation method: {method_name}")
        
        return result
    
    def get_available_methods(self) -> List[str]:
        """Return list of available obfuscation methods"""
        return list(self.methods.keys())


def main():
    """CLI interface for the obfuscator"""
    parser = argparse.ArgumentParser(
        description='Obfuskator - Configurable text obfuscation tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Apply character replacement once
  python obfuskator.py -t "Hello World" -m char_replace
  
  # Apply multiple methods
  python obfuskator.py -t "Hello World" -m char_replace whitespace case_random
  
  # Apply methods 3 times
  python obfuskator.py -t "Hello World" -m char_replace -i 3
  
  # Combine all methods with 2 iterations
  python obfuskator.py -t "Hello World" -m char_replace whitespace case_random reverse_chunks -i 2
  
  # List available methods
  python obfuskator.py --list-methods
        """
    )
    
    parser.add_argument(
        '-t', '--text',
        help='Text to obfuscate'
    )
    
    parser.add_argument(
        '-m', '--methods',
        nargs='+',
        help='Obfuscation methods to use (can specify multiple)',
        choices=['char_replace', 'whitespace', 'case_random', 'reverse_chunks']
    )
    
    parser.add_argument(
        '-i', '--iterations',
        type=int,
        default=1,
        help='Number of times to apply obfuscation methods (default: 1)'
    )
    
    parser.add_argument(
        '--list-methods',
        action='store_true',
        help='List all available obfuscation methods and exit'
    )
    
    parser.add_argument(
        '--seed',
        type=int,
        help='Random seed for reproducible obfuscation'
    )
    
    args = parser.parse_args()
    
    obfuskator = Obfuskator()
    
    # List methods if requested
    if args.list_methods:
        print("Available obfuscation methods:")
        for method in obfuskator.get_available_methods():
            print(f"  - {method}")
        return
    
    # Validate required arguments
    if not args.text or not args.methods:
        parser.error("Both --text and --methods are required (unless using --list-methods)")
    
    # Set random seed if provided
    if args.seed is not None:
        random.seed(args.seed)
    
    # Perform obfuscation
    try:
        result = obfuskator.obfuscate(args.text, args.methods, args.iterations)
        print(result)
    except ValueError as e:
        parser.error(str(e))


if __name__ == '__main__':
    main()
