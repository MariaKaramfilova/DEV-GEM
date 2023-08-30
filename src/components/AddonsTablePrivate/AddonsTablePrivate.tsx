import React, { Fragment, useState } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Order, getComparator, stableSort, useFilters } from './table.utils.ts';
import RowMenu from './AddonsTableRowMenu.tsx';
import AddonsTableList from './AddonsTableList.tsx';
import moment from 'moment';
import { WarningAmber } from '@mui/icons-material';
import { DETAILED_ADDON_VIEW_ID_PATH } from '../../common/common.ts';
import Link from '@mui/material/Link/Link';
import { useNavigate } from 'react-router-dom';
import AddonsTableFilters from './AddonsTableFilters.tsx';

export default function AddonsTablePrivate() {

  const [order, setOrder] = useState<Order>('desc');
  const [open, setOpen] = useState(false);
  const {
    filteredAddons,
    targetIDEs,
    tags,
    setValueSearch,
    setValueStatus,
    setValueTag,
    setValueTargetIDE } = useFilters();
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`${DETAILED_ADDON_VIEW_ID_PATH}${id}`);
  }

  return (
    <>
      <Fragment>
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
            my: 1,
            gap: 1,
          }}
        >
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" level="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AddonsTableFilters setValueStatus={setValueStatus}
                  setValueTargetIDE={setValueTargetIDE}
                  setValueTag={setValueTag}
                  targetIDEs={targetIDEs}
                  tags={tags} />
                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
        </Sheet>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            borderRadius: 'sm',
            py: 2,
            display: {
              xs: 'none',
              sm: 'flex',
            },
            flexWrap: 'wrap',
            gap: 1.5,
            '& > *': {
              minWidth: {
                xs: '120px',
                md: '160px',
              },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for addon</FormLabel>
            <Input size="sm" placeholder="Search"
              startDecorator={<SearchIcon />}
              onChange={(value) => {
                setValueSearch(value.target.value);
              }} />
          </FormControl>
          <AddonsTableFilters setValueStatus={setValueStatus}
            setValueTargetIDE={setValueTargetIDE}
            setValueTag={setValueTag}
            targetIDEs={targetIDEs}
            tags={tags} />
        </Box>
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>

                </th>
                <th style={{ width: 120, padding: '12px 6px' }}>
                  <Link
                    underline="none"
                    color="primary"
                    component="button"
                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                    fontWeight="lg"
                    endDecorator={<ArrowDropDownIcon />}
                    sx={{
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    }}
                  >
                    Publish Date
                  </Link>
                </th>
                <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
                <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
                <th style={{ width: 240, padding: '12px 6px' }}>Tags</th>
                <th style={{ width: 140, padding: '12px 6px' }}> </th>
              </tr>
            </thead>
            <tbody>
              {stableSort(filteredAddons, getComparator(order, 'createdOn')).map((addon) => (
                <tr key={addon.addonId}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                  </td>
                  <td>
                    <Typography level="body-xs">{moment(addon.createdOn).format('D MMM YYYY')}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar size="sm" src={addon.logo}></Avatar>
                      <div>
                        <Typography level="body-xs">{addon.name}</Typography>
                        <Typography level="body-xs">{addon.targetIDE}</Typography>
                      </div>
                    </Box>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Published: <CheckRoundedIcon />,
                          Draft: <WarningAmber />,
                          Pending: <AutorenewRoundedIcon />,
                          Rejected: <BlockIcon />,
                        }[addon.status]
                      }
                      color={
                        {
                          Paid: 'success',
                          Draft: 'warning',
                          Pending: 'neutral',
                          Cancelled: 'danger',
                        }[addon.status] as ColorPaletteProp
                      }
                    >
                      {addon.status}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <div>
                        <Typography level="body-xs">{Object.keys(addon.tags).join()}</Typography>
                      </div>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Link level="body-xs" href='' onClick={() => handleViewDetails(addon.addonId)}>
                        View
                      </Link>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Link level="body-xs" href={addon.downloadLink}>
                        Download
                      </Link>
                      <RowMenu addonId={addon.addonId} />
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
          >
            Previous
          </Button>

          <Box sx={{ flex: 1 }} />
          {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
            <IconButton
              key={page}
              size="sm"
              variant={Number(page) ? 'outlined' : 'plain'}
              color="neutral"
            >
              {page}
            </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />

          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
          >
            Next
          </Button>
        </Box>
      </Fragment>
      <AddonsTableList />
    </>
  );
}
