interface Props {
  onClick?: () => void;
  classes?: string;
  active?: boolean;
}

export const HBToggle = ({ onClick, classes, active = false }: Props) => {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <div
      onClick={handleClick}
      className={`hb-btn ${active ? 'hb-active' : 'hb-not-active'}${
        ' ' + classes
      }`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
