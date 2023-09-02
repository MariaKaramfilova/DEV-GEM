import { Avatar } from '@mui/joy';
import React from 'react';
import { components } from 'react-select';

const { Option } = components;

export const CustomOption = (props: any) => (
  <Option {...props}>
    <div style={{ display: "flex" }}>
      <Avatar src={props.data.image} alt={props.data.label} size='sm'/>
      <div>
        <div>{props.data.value}</div>
        <div style={{fontSize: "0.8em"}}>{props.data.details}</div>
      </div>
    </div>
  </Option>
);