/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CellContainer } from '@keystone-6/core/admin-ui/components';
import { CellComponent } from '@keystone-6/core/types';
import Image from 'next/image';

export const Cell: CellComponent = ({ item, field }) => {
  console.log('Image Cell Item:', item);
  console.log(`Field Name: ${field}`);
  // 'item' contains all fields fetched for this row.
  // Since 'src' is in initialColumns, it SHOULD be here.
  const src = item.preview;

  // Debugging: Check console to see what 'item' actually holds
  // console.log('Image Cell Item:', item);

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
