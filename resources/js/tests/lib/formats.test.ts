import { formatInitials } from '@/lib/formats';
import { describe, expect, it } from 'vitest';

describe('formatInitials', () => {
    it('returns both initials for a full name', () => {
        expect(formatInitials('John Doe')).toBe('JD');
    });

    it('returns single initial for a single name', () => {
        expect(formatInitials('John')).toBe('J');
    });

    it('returns first and last initials for three or more names', () => {
        expect(formatInitials('John Michael Doe')).toBe('JD');
    });

    it('returns uppercase initials for lowercase input', () => {
        expect(formatInitials('john doe')).toBe('JD');
    });

    it('handles leading and trailing whitespace', () => {
        expect(formatInitials('  John Doe  ')).toBe('JD');
    });

    it('returns empty string for whitespace-only input', () => {
        expect(formatInitials('   ')).toBe('');
    });

    it('returns empty string for an empty string', () => {
        expect(formatInitials('')).toBe('');
    });
});
