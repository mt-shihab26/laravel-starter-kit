import { cn, isCurrentUrl, toUrl } from '@/lib/utils';
import { describe, expect, it, vi } from 'vitest';

describe('cn', () => {
    it('merges class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
        expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });

    it('merges conflicting tailwind classes', () => {
        expect(cn('px-2', 'px-4')).toBe('px-4');
    });

    it('returns empty string for no inputs', () => {
        expect(cn()).toBe('');
    });

    it('handles undefined and null values', () => {
        expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });

    it('merges array inputs', () => {
        expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    });

    it('merges object inputs', () => {
        expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });
});

describe('toUrl', () => {
    it('returns href when no route is provided', () => {
        expect(toUrl({ href: '/about' })).toBe('/about');
    });

    it('returns empty string when neither route nor href is provided', () => {
        expect(toUrl({})).toBe('');
    });

    it('returns route url when route is provided', () => {
        const mockRoute = vi.fn().mockReturnValue('/dashboard');
        vi.stubGlobal('route', mockRoute);

        expect(toUrl({ route: 'dashboard' })).toBe('/dashboard');
        expect(mockRoute).toHaveBeenCalledWith('dashboard');

        vi.unstubAllGlobals();
    });

    it('prefers route over href when both are provided', () => {
        const mockRoute = vi.fn().mockReturnValue('/from-route');
        vi.stubGlobal('route', mockRoute);

        expect(toUrl({ route: 'home', href: '/from-href' })).toBe(
            '/from-route',
        );

        vi.unstubAllGlobals();
    });
});

describe('isCurrentUrl', () => {
    it('returns false when neither route nor href is provided', () => {
        expect(isCurrentUrl({})).toBe(false);
    });

    it('returns true when route matches current route', () => {
        const currentFn = vi.fn().mockReturnValue(true);
        const mockRoute = vi.fn().mockReturnValue({ current: currentFn });
        vi.stubGlobal('route', mockRoute);

        expect(isCurrentUrl({ route: 'dashboard' })).toBe(true);
        expect(currentFn).toHaveBeenCalledWith('dashboard');

        vi.unstubAllGlobals();
    });

    it('returns false when route does not match current route', () => {
        const currentFn = vi.fn().mockReturnValue(false);
        const mockRoute = vi.fn().mockReturnValue({ current: currentFn });
        vi.stubGlobal('route', mockRoute);

        expect(isCurrentUrl({ route: 'settings' })).toBe(false);

        vi.unstubAllGlobals();
    });

    it('returns true when href matches current window location', () => {
        Object.defineProperty(window, 'location', {
            value: { href: 'http://localhost/about' },
            writable: true,
        });

        expect(isCurrentUrl({ href: 'http://localhost/about' })).toBe(true);
    });

    it('returns false when href does not match current window location', () => {
        Object.defineProperty(window, 'location', {
            value: { href: 'http://localhost/home' },
            writable: true,
        });

        expect(isCurrentUrl({ href: 'http://localhost/about' })).toBe(false);
    });

    it('resolves relative href against current url', () => {
        Object.defineProperty(window, 'location', {
            value: { href: 'http://localhost/about' },
            writable: true,
        });

        expect(isCurrentUrl({ href: '/about' })).toBe(true);
    });

    it('returns false for empty href', () => {
        expect(isCurrentUrl({ href: '' })).toBe(false);
    });
});
