import React from 'react';
import { CustomInput } from '../../common/CustomInput';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <CustomInput type='text' value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
