import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: string | number;
  duration?: number;
}

export default function AnimatedNumber({ value, duration = 1500 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const stringVal = String(value);
    // Extract number and surrounding text
    const match = stringVal.match(/^([^0-9.-]*)([0-9.,-]+)([^0-9.-]*)$/);

    if (!match) {
      setDisplayValue(stringVal);
      return;
    }

    const prefix = match[1] || '';
    const numericPart = match[2].replace(/,/g, ''); // strip commas for numerical processing
    const suffix = match[3] || '';

    const isFloat = numericPart.includes('.');
    const target = parseFloat(numericPart);

    if (isNaN(target)) {
      setDisplayValue(stringVal);
      return;
    }

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercent = Math.min(progress / duration, 1);

      // Eased output (easeOutQuad)
      const easedPercent = progressPercent * (2 - progressPercent);
      const current = easedPercent * target;

      let formattedNum = '';
      if (isFloat) {
        // Match precision
        const precision = (numericPart.split('.')[1] || '').length;
        formattedNum = current.toFixed(precision);
      } else {
        formattedNum = Math.floor(current).toString();
      }

      // Add commas if original number had them
      if (stringVal.includes(',')) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(stringVal);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [value, duration]);

  return <span className="font-mono">{displayValue}</span>;
}
