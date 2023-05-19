/**
 * Generates a random number between 0 and 255
 * 
 * @returns {number} A number between 0 and 255
 */
export const randomNumber = (max = 255) => {
    if (max > 255) max = 255;
    if (max < 0) max = 0;
    return Math.floor(Math.random() * (max + 1))
}

/**
 * Converts number to hex string
 * 
 * @param {number} number The number to convert
 * @returns {string} The hex representation of the number
 */
export const hexConverter = (number) => {
    const hex = number.toString(16)
    return hex.length === 1 ? "0" + hex : hex
}

/**
 * Creates a random hexadecimal color code by 
 * generating 3 random numbers between 0 and 255 and
 * converting the numbers to hex code.
 * 
 * @returns {string} The hex representation of an rgb code
 */
export const rgbToHex = () => {
    const r = randomNumber()
    const g = randomNumber()
    const b = randomNumber()
    return `#${hexConverter(r)}${hexConverter(g)}${hexConverter(b)}`
}

const memoizedRgbToHex = (() => {
    const cache = {};

    return () => {
        const key = 'rgbToHex';
        
        if (cache[key]) {
            console.log("true")
            return cache[key]
        }

        const r = randomNumber()
        const g = randomNumber()
        const b = randomNumber()
        const result = `#${hexConverter(r)}${hexConverter(g)}${hexConverter(b)}`
        cache[key] = result;
        console.log(result)
        return result;
    }
})();

export const expMemRgbToHex = memoizedRgbToHex;