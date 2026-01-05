/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CellContainer } from '@keystone-6/core/admin-ui/components';
import { CellComponent } from '@keystone-6/core/types';
import Image from 'next/image';

export const Cell: CellComponent = ({ item, field }) => {
  const src = item.preview;

  if (!src) return <CellContainer>No Image</CellContainer>;

  return (
    <CellContainer>
      <img
        src={src}
        alt="Preview"
        className='w-10 h-10'
        style={{
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
    </CellContainer>
  );
};
