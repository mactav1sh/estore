import { useState } from 'react';

const HBToggle = () => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`hb-btn ${active ? 'hb-active' : 'hb-not-active'}`}
      onClick={() => setActive((prev) => !prev)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HBToggle;
