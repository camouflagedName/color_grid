// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { randomNumber, hexConverter } from './utils';


describe('randomNumber', () => {
    it('generates a random number between 0 and 255', () => {
        let number = randomNumber();
        expect(number).toBeLessThanOrEqual(255);
        expect(number).toBeGreaterThanOrEqual(0);

        number = randomNumber(-10);
        expect(number).toEqual(0);
        number = randomNumber(-10);
        expect(number).toEqual(0);
        number = randomNumber(-10);
        expect(number).toEqual(0);

        number = randomNumber(1000);
        expect(number).toBeLessThanOrEqual(255);
        expect(number).toBeGreaterThanOrEqual(0);

    });
})

describe('hexConverter', () => {
    it('converts a number to a hex string', () => {
        let hexValue;
        hexValue = hexConverter(1);
        expect(hexValue).toBe("01");

        hexValue = hexConverter(10);
        expect(hexValue).toBe("0a");

        hexValue = hexConverter(255);
        expect(hexValue).toBe("ff");

        hexValue = hexConverter(16);
        expect(hexValue).toBe("10");
    });
})