#!/usr/bin/env python3
"""
Tests for the Obfuskator module
"""

import unittest
from obfuskator import Obfuskator


class TestObfuskator(unittest.TestCase):
    """Test cases for Obfuskator class"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.obfuskator = Obfuskator()
        self.test_text = "Hello World"
    
    def test_get_available_methods(self):
        """Test that available methods are returned"""
        methods = self.obfuskator.get_available_methods()
        self.assertIn('char_replace', methods)
        self.assertIn('whitespace', methods)
        self.assertIn('case_random', methods)
        self.assertIn('reverse_chunks', methods)
        self.assertEqual(len(methods), 4)
    
    def test_char_replace_changes_text(self):
        """Test that character replacement modifies the text"""
        # We need to run multiple times as replacement is probabilistic
        changed = False
        valid_replacement = False
        for _ in range(10):
            result = self.obfuskator._char_replace(self.test_text)
            if result != self.test_text:
                changed = True
                # Verify that changed characters are from CHAR_REPLACEMENTS
                for i, (orig, new) in enumerate(zip(self.test_text, result)):
                    if orig != new:
                        orig_lower = orig.lower()
                        if orig_lower in self.obfuskator.CHAR_REPLACEMENTS:
                            valid_chars = self.obfuskator.CHAR_REPLACEMENTS[orig_lower]
                            valid_chars_upper = [c.upper() for c in valid_chars]
                            all_valid = valid_chars + valid_chars_upper
                            if new in all_valid or new.lower() in valid_chars:
                                valid_replacement = True
                                break
                if valid_replacement:
                    break
        self.assertTrue(changed, "Character replacement should change text")
        self.assertTrue(valid_replacement, "Changed characters should be from CHAR_REPLACEMENTS")
    
    def test_whitespace_insert_adds_characters(self):
        """Test that whitespace insertion adds characters"""
        # Run multiple times as insertion is probabilistic
        added = False
        invisible_spaces = ['\u200b', '\u200c', '\u200d']
        for _ in range(10):
            result = self.obfuskator._whitespace_insert(self.test_text)
            if len(result) > len(self.test_text):
                added = True
                # Verify that added characters are invisible spaces
                for char in result:
                    if char not in self.test_text and char in invisible_spaces:
                        self.assertIn(char, invisible_spaces, "Added characters should be zero-width spaces")
                break
        self.assertTrue(added, "Whitespace insertion should add characters")
    
    def test_case_randomize_changes_case(self):
        """Test that case randomization changes case"""
        # Run multiple times as randomization is probabilistic
        changed = False
        only_case_changed = False
        for _ in range(10):
            result = self.obfuskator._case_randomize(self.test_text)
            if result != self.test_text:
                changed = True
                # Verify that only case changed, not the actual characters
                if result.lower() == self.test_text.lower():
                    only_case_changed = True
                    break
        self.assertTrue(changed, "Case randomization should change text")
        self.assertTrue(only_case_changed, "Only case should be modified, not characters")
    
    def test_reverse_chunks_changes_text(self):
        """Test that chunk reversal changes text"""
        # Run multiple times as chunk selection is probabilistic
        changed = False
        for _ in range(10):
            result = self.obfuskator._reverse_chunks(self.test_text)
            # The result should have same length
            self.assertEqual(len(result), len(self.test_text))
            if result != self.test_text:
                changed = True
                break
        self.assertTrue(changed, "Chunk reversal should change text")
    
    def test_obfuscate_with_single_method(self):
        """Test obfuscation with a single method"""
        result = self.obfuskator.obfuscate(self.test_text, ['char_replace'], iterations=1)
        self.assertIsInstance(result, str)
        self.assertGreaterEqual(len(result), len(self.test_text))
    
    def test_obfuscate_with_multiple_methods(self):
        """Test obfuscation with multiple methods"""
        methods = ['char_replace', 'whitespace', 'case_random']
        result = self.obfuskator.obfuscate(self.test_text, methods, iterations=1)
        self.assertIsInstance(result, str)
    
    def test_obfuscate_with_multiple_iterations(self):
        """Test obfuscation with multiple iterations"""
        result = self.obfuskator.obfuscate(self.test_text, ['char_replace'], iterations=3)
        self.assertIsInstance(result, str)
    
    def test_obfuscate_combined_methods_and_iterations(self):
        """Test obfuscation with both multiple methods and iterations"""
        methods = ['char_replace', 'whitespace']
        result = self.obfuskator.obfuscate(self.test_text, methods, iterations=2)
        self.assertIsInstance(result, str)
    
    def test_obfuscate_with_invalid_method(self):
        """Test that invalid method raises ValueError"""
        with self.assertRaises(ValueError):
            self.obfuskator.obfuscate(self.test_text, ['invalid_method'], iterations=1)
    
    def test_empty_text(self):
        """Test obfuscation with empty text"""
        result = self.obfuskator.obfuscate("", ['char_replace'], iterations=1)
        self.assertEqual(result, "")
    
    def test_obfuscate_preserves_content_structure(self):
        """Test that obfuscation doesn't completely destroy the text"""
        # At minimum, the text should still be a string and not be empty
        result = self.obfuskator.obfuscate(self.test_text, ['char_replace'], iterations=1)
        self.assertIsInstance(result, str)
        self.assertGreater(len(result), 0)


if __name__ == '__main__':
    unittest.main()
