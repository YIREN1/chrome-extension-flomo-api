import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="OptionsContainer">
      {title.toUpperCase()} PAGE (Comming soon)
    </div>
  );
};

export default Options;
