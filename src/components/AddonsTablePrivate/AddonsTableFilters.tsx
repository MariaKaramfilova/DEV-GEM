import React, { Fragment } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  setValueStatus: (value: string) => void;
  setValueTargetIDE: (value: string) => void;
  setValueTag: (value: string) => void;
  setValueSearch: (value: string) => void;
  targetIDEs: string[];
  tags: string[];
}

function AddonsTableFilters({ setValueStatus, setValueTargetIDE, setValueTag, setValueSearch, targetIDEs, tags }: Props) {

  const renderTargetIDEsFilter = targetIDEs.map(IDE => {
    return (<Option key={IDE} value={IDE}>{IDE}</Option>);
  })

  const renderTagsFilter = tags.map(tag => {
    return (<Option key={tag} value={tag}>{tag}</Option>);
  })

  return (
    <>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>Search for addon</FormLabel>
        <Input size="sm" placeholder="Search"
          startDecorator={<SearchIcon />}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
            setValueSearch(value.target.value);
          }} />
      </FormControl>
      <Fragment>
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by status"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
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
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
              setValueTargetIDE(value?.target.innerText);
            }}
          >
            {renderTargetIDEsFilter}
          </Select>
        </FormControl>

        <FormControl size="sm">
          <FormLabel>Tags</FormLabel>
          <Select size="sm" placeholder="All"
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
              setValueTag(value?.target.innerText);
            }}
          >
            {renderTagsFilter}
          </Select>
        </FormControl>
      </Fragment>
    </>)
}

export default AddonsTableFilters