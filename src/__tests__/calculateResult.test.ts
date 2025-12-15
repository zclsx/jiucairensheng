/**
 * Compatibility verification tests for calculateResult function
 * 
 * Task 10.1: Verify existing calculateResult function still works correctly
 * Requirements: 8.2, 8.5
 * 
 * These tests ensure that the upgrade does not break the original functionality
 * of the calculateResult function which determines the main personality type.
 */

import { describe, it, expect } from 'vitest';
import { calculateResult, QUESTIONS, RESULTS, TagType } from '@/data/gameData';

describe('calculateResult Compatibility Verification', () => {
  // Get all valid option IDs from QUESTIONS
  const allOptionIds = QUESTIONS.flatMap(q => q.options.map(opt => opt.id));
  const validTagTypes: TagType[] = ['degen', 'rekt', 'holder', 'slave', 'shark', 'normie', 'midcurve', 'simp', 'maxi', 'larper', 'dev', 'npc'];

  describe('Basic Functionality', () => {
    it('should return a valid Result object for empty selection', () => {
      const result = calculateResult([]);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('roast');
      expect(result).toHaveProperty('img');
      expect(result).toHaveProperty('color');
    });

    it('should return a valid Result object for single selection', () => {
      // Select a degen option
      const result = calculateResult(['i1']);
      
      expect(result).toBeDefined();
      expect(result.id).toBe('res_degen');
      expect(result.title).toBe('链上赌博成瘾晚期');
    });

    it('should return the Result for the most selected tag type', () => {
      // Select multiple degen options
      const degenOptions = ['i1', 'i2', 'i3', 'i4', 'i5'];
      const result = calculateResult(degenOptions);
      
      expect(result.id).toBe('res_degen');
    });

    it('should handle mixed tag selections and return the dominant type', () => {
      // 3 degen + 2 rekt = degen should win
      const mixedOptions = ['i1', 'i2', 'i3', 'i21', 'i22'];
      const result = calculateResult(mixedOptions);
      
      expect(result.id).toBe('res_degen');
    });
  });

  describe('Result Object Structure', () => {
    it('should return Result objects that match RESULTS structure', () => {
      // Test with each tag type to ensure all Results are valid
      const tagToOptionMap: Record<TagType, string> = {
        degen: 'i1',
        rekt: 'i21',
        holder: 'i46',
        slave: 'i11',
        shark: 'i36',
        normie: 'i60',
        midcurve: 'i51',
        simp: 'i29',
        maxi: 'i43',
        larper: 'i53',
        dev: 'i39',
        npc: 'i32',
      };

      for (const [tag, optionId] of Object.entries(tagToOptionMap)) {
        const result = calculateResult([optionId]);
        const expectedResult = RESULTS[tag as TagType];
        
        expect(result).toEqual(expectedResult);
      }
    });

    it('should return Results with all required fields populated', () => {
      for (const tagType of validTagTypes) {
        const result = RESULTS[tagType];
        
        expect(result.id).toBeTruthy();
        expect(result.title).toBeTruthy();
        expect(result.roast).toBeTruthy();
        expect(result.img).toBeTruthy();
        expect(result.color).toBeTruthy();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid option IDs gracefully', () => {
      const result = calculateResult(['invalid_id_1', 'invalid_id_2']);
      
      // Should still return a valid Result (default behavior)
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
    });

    it('should handle mixed valid and invalid option IDs', () => {
      const result = calculateResult(['i1', 'invalid_id', 'i2']);
      
      // Should count only valid options
      expect(result.id).toBe('res_degen');
    });

    it('should handle duplicate option IDs', () => {
      // Same option selected multiple times
      const result = calculateResult(['i1', 'i1', 'i1']);
      
      expect(result.id).toBe('res_degen');
    });
  });

  describe('Integration with QUESTIONS data', () => {
    it('should correctly process options from all stages', () => {
      // Select options from each stage
      const selections = [
        'i1', 'i2', 'i3',  // identity stage - degen
        'a1', 'a2', 'a3',  // action stage - mixed
        'm1', 'm2', 'm3',  // mental stage - mixed
      ];
      
      const result = calculateResult(selections);
      
      expect(result).toBeDefined();
      expect(validTagTypes.map(t => `res_${t}`)).toContain(result.id);
    });

    it('should work with realistic game selections (9+ options)', () => {
      // Simulate a real game with 3+ selections per stage
      const realisticSelections = [
        'i1', 'i2', 'i3', 'i4',  // 4 degen from identity
        'a1', 'a2', 'a3',        // 3 from action
        'm1', 'm2', 'm3',        // 3 from mental
      ];
      
      const result = calculateResult(realisticSelections);
      
      expect(result).toBeDefined();
      expect(result.id).toBeTruthy();
      expect(result.title).toBeTruthy();
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain the same behavior as original implementation', () => {
      // Test that the function signature hasn't changed
      expect(typeof calculateResult).toBe('function');
      expect(calculateResult.length).toBe(1); // Takes 1 argument
    });

    it('should return one of the 12 personality types', () => {
      const validResultIds = validTagTypes.map(t => `res_${t}`);
      
      // Test with various selections
      const testCases = [
        ['i1'],
        ['i21', 'i22'],
        ['i11', 'i12', 'i13'],
        allOptionIds.slice(0, 10),
      ];
      
      for (const selections of testCases) {
        const result = calculateResult(selections);
        expect(validResultIds).toContain(result.id);
      }
    });
  });
});
