import { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

interface IProps {
  maxValue?: number;
  callbackFn?: Function;
}

export const Rating = ({ maxValue = 5, callbackFn }: IProps) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number>(-1);
  const [selectedStarIndex, setSelectedStarIndex] = useState<number>(1);

  // Handle star click
  const handleClick = (value: number) => {
    console.log(value);
    setSelectedStarIndex(value);
    callbackFn?.(value);
  };

  return (
    <div
      className="flex space-x-1"
      onMouseLeave={() => setHoveredStarIndex(selectedStarIndex)}
    >
      {Array(maxValue)
        .fill(null)
        .map((_num, i) => (
          <label key={i} htmlFor={`star-${i}`} className="cursor-pointer">
            <input
              id={`star-${i}`}
              type="radio"
              value={i + 1}
              className="hidden"
            />
            {hoveredStarIndex >= i + 1 ? (
              <BsStarFill
                onClick={() => handleClick(i + 1)}
                onMouseEnter={() => setHoveredStarIndex(i + 1)}
              />
            ) : (
              <BsStar onMouseEnter={() => setHoveredStarIndex(i + 1)} />
            )}
          </label>
        ))}
    </div>
  );
};
