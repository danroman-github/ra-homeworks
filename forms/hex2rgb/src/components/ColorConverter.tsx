import { useState, useEffect, useCallback } from 'react';

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

const ColorConverter = () => {
    const [hexValue, setHexValue] = useState('#9921ff');
    const [rgbValue, setRgbValue] = useState('rgb(153, 33, 255)');
    const [isError, setIsError] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#9921ff');

    const hexToRgb = useCallback((hex: string): RgbColor | null => {
        if (!hex || typeof hex !== 'string') return null;

        const cleanHex = hex.trim();
        if (cleanHex.length !== 7 || cleanHex[0] !== '#') return null;

        const hexPattern = /^#([0-9A-Fa-f]{6})$/;
        const match = cleanHex.match(hexPattern);
        if (!match) return null;

        const hexValue = match[1];
        const r = parseInt(hexValue.substring(0, 2), 16);
        const g = parseInt(hexValue.substring(2, 4), 16);
        const b = parseInt(hexValue.substring(4, 6), 16);

        if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null;

        return { r, g, b };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value;

        if (value.length === 1 && value !== '#') {
            value = '#' + value;
        }

        if (value.length > 7) {
            value = value.slice(0, 7);
        }

        setHexValue(value);
    };

    useEffect(() => {
        if (hexValue.length !== 7) {
            return;
        }

        const rgb = hexToRgb(hexValue);

        if (rgb) {
            setIsError(false);
            const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            setRgbValue(rgbString);
            setBackgroundColor(hexValue);
        } else {
            setIsError(true);
            setRgbValue('Ошибка!');
            setBackgroundColor('#ff0000');
        }
    }, [hexValue, hexToRgb]);

    const handleBlur = () => {
        if (hexValue.length !== 7) {
            setIsError(true);
            setRgbValue('Ошибка!');
            setBackgroundColor('#ff0000');
        }
    };

    return (
        <div
            className="container"
            style={{
                backgroundColor: isError ? '#ff0000' : backgroundColor,
                transition: 'background-color 0.3s ease'
            }}
        >
            <label className="color-converter">
                <input
                    type="text"
                    className={`input-field ${isError ? 'error-input' : ''}`}
                    id="colorInput"
                    placeholder="#34495e"
                    value={hexValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    maxLength={7}
                />
                <span className={`result ${isError ? 'error' : ''}`}>
                    {rgbValue}
                </span>
            </label>
        </div>
    );
};

export default ColorConverter;