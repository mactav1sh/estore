import { BsStarFill } from 'react-icons/bs';

interface IProps {
  maxValue?: number;
  rating?: number;
  additionalClasses?: string;
}

export const RatingStars = ({
  maxValue = 5,
  rating = 3,
  additionalClasses,
}: IProps) => {
  return (
    <div
      className={`h flex h-auto items-center space-x-1 ${additionalClasses}`}
    >
      {Array(maxValue)
        .fill(null)
        .map((_num, i) =>
          rating >= i + 1 ? (
            <BsStarFill key={i} className="text-yellow-400" />
          ) : (
            <BsStarFill key={i} className="text-gray-300" />
          )
        )}
    </div>
  );
};
