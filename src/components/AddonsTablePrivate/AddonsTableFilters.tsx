import React, { Fragment } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

type Props = {
  setValueStatus: (value: string) => void;
  setValueTargetIDE: (value: string) => void;
  setValueTag: (value: string) => void;
  targetIDEs: string[];
  tags: string[];
}

function AddonsTableFilters({ setValueStatus, setValueTargetIDE, setValueTag, targetIDEs, tags }: Props) {

  const renderTargetIDEsFilter = targetIDEs.map(IDE => {
    return (<Option key={IDE} value={IDE}>{IDE}</Option>);
  })

  const renderTagsFilter = tags.map(tag => {
    return (<Option key={tag} value={tag}>{tag}</Option>);
  })

  return (
    <Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          onChange={(value) => {
            setValueStatus(value?.target.innerText);
          }}
        >
          <Option value="all">All</Option>
          <Option value="paid">Published</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Draft</Option>
          <Option value="cancelled">Rejected</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Target IDE</FormLabel>
        <Select size="sm" placeholder="All"
          onChange={(value) => {
            setValueTargetIDE(value?.target.innerText);
          }}
        >
          {renderTargetIDEsFilter}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Tags</FormLabel>
        <Select size="sm" placeholder="All"
          onChange={(value) => {
            setValueTag(value?.target.innerText);
          }}
        >
          {renderTagsFilter}
        </Select>
      </FormControl>
    </Fragment>
  )
}

export default AddonsTableFilters