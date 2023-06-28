import { BiHeadphone } from 'react-icons/bi';
import { BsDisplay } from 'react-icons/bs';
import { BsFillMouse2Fill } from 'react-icons/bs';
import { BsKeyboard } from 'react-icons/bs';
import { BsSpeaker } from 'react-icons/bs';
import { BsLaptop } from 'react-icons/bs';
const icons = {
  headphones: BiHeadphone,
  laptops: BsLaptop,
  displays: BsDisplay,
  mice: BsFillMouse2Fill,
  keyboards: BsKeyboard,
  speakers: BsSpeaker,
};

export const getIcon = (name: string) => {
  return icons[name as keyof typeof icons];
};
