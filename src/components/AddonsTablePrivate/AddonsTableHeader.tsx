import React, { Dispatch, SetStateAction } from 'react';
import { Link } from '@mui/joy'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ASC, DESC } from '../../common/common.ts';
import { Order } from './table.utils.ts';

type Props = {
  order: string;
  setOrder: Dispatch<SetStateAction<Order>>;
}

function AddonsTableHeader({ order, setOrder }: Props) {

  return (
    <thead style={{width: "fit-content"}}>
      <tr>
        <th style={{ width: 100, padding: '12px 6px' }}>
          <Link
            underline="none"
            color="primary"
            component="button"
            onClick={() => setOrder(order === ASC ? DESC : ASC)}
            fontWeight="lg"
            endDecorator={<ArrowDropDownIcon />}
            sx={{
              '& svg': {
                transition: '0.2s',
                transform:
                  order === DESC ? 'rotate(0deg)' : 'rotate(180deg)',
              },
            }}
          >
            Publish Date
          </Link>
        </th>
        <th style={{ width: 130, padding: '12px 6px' }}>Name</th>
        <th style={{ width: 80, padding: '12px 6px' }}>IDE</th>
        <th style={{ width: 90, padding: '12px 6px' }}>Status</th>
        <th style={{ width: 100, padding: '12px 6px' }}>Tags</th>
        <th style={{ width: 70, padding: '12px 6px' }}>Owner</th>
        <th style={{ width: 50, padding: '12px 6px' }}> </th>
        <th style={{ width: 80, padding: '12px 6px' }}> </th>
        <th style={{ width: 20, padding: '12px 6px' }}> </th>
        <th style={{ width: 50, padding: '12px 6px' }}> </th>
      </tr>
    </thead>
  )
}

export default AddonsTableHeader