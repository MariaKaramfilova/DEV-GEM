import React, { Fragment, useState } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { Order, getComparator, stableSort, useFilters } from './table.utils.ts';
import RowMenu from './AddonsTableRowMenu.tsx';
import moment from 'moment';
import { WarningAmber } from '@mui/icons-material';
import { ADDONS_PER_PAGE, CREATED_ON, DESC, DETAILED_ADDON_VIEW_ID_PATH, SIMPLE_DATE_FORMAT } from '../../common/common.ts';
import { useNavigate } from 'react-router-dom';
import AddonsTableFilters from './AddonsTableFilters.tsx';
import { Link } from '@mui/joy';
import AddonsTableHeader from './AddonsTableHeader.tsx';
import Pagination from '../../views/Pagination/Pagination.tsx';
import { Addon } from '../../context/AddonsContext.ts';
import { updateAddonFeatureStatus } from '../../services/addon.services.ts';

export default function AddonsTablePrivate() {
  const [order, setOrder] = useState<Order>(DESC);
  const [addonsOnPage, setAddonsOnPage] = useState<Addon[]>([]);

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
                  setValueSearch={setValueSearch}
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

          <AddonsTableFilters setValueStatus={setValueStatus}
            setValueTargetIDE={setValueTargetIDE}
            setValueTag={setValueTag}
            setValueSearch={setValueSearch}
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
            <AddonsTableHeader order={order} setOrder={setOrder} />
            <tbody>
              {stableSort(addonsOnPage, getComparator(order, CREATED_ON)).map((addon: Addon) => (
                <tr key={addon.addonId}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                  </td>
                  <td>
                    <Typography level="body-xs">{moment(addon.createdOn).format(SIMPLE_DATE_FORMAT)}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <div>
                        <Typography level="body-xs">{addon.name}</Typography>
                      </div>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <div>
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
                          published: <CheckRoundedIcon fontSize="small" />,
                          draft: <WarningAmber fontSize="small" />,
                          pending: <AutorenewRoundedIcon fontSize="small" />,
                          rejected: <BlockIcon fontSize="small" />,
                        }[addon.status]
                      }
                      color={
                        {
                          published: 'success',
                          draft: 'warning',
                          pending: 'neutral',
                          rejected: 'danger',
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
                      <RowMenu {...addon} />
                    </Box>
                  </td>
                  <td>
                    {addon.featured ? (
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Button onClick={() => {updateAddonFeatureStatus(addon.addonId, false)}}>
                        Remove Feature
                      </Button>
                    </Box>
                    ): (
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Button onClick={() => {updateAddonFeatureStatus(addon.addonId, true)}}>
                        Add Feature
                      </Button>
                    </Box>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Pagination data={filteredAddons} itemsPerPage={ADDONS_PER_PAGE} setData={setAddonsOnPage} />
      </Fragment>
    </>
  );
}
