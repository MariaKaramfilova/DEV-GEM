import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, IconButton, Modal, ModalClose, ModalDialog } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Addon, AddonsContext } from '../../context/AddonsContext.ts';
import { removeAddonContributor } from '../../services/addon.services.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReportIcon from '@mui/icons-material/Report';
import ContributorsList from './ContributorsList.tsx';
import AddContributors from './AddContributors.tsx';

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => boolean;
  addon: Addon;
}

function ManageContributors({ isOpen, setIsOpen, addon }: Props) {
  const {allAddons} = useContext(AddonsContext);
  const [maintainers, setMaintainers] = useState<string[]>(addon.maintainers || []);
  const [error, setError] = useState<null | string>(null);
  const [view, setView] = useState<string>("manage");

  const handleRemoveContributor = async (userId: string, addonId: string) => {
    try {
      await removeAddonContributor(userId, addonId);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    setMaintainers(allAddons.find(el => el.addonId === addon.addonId)?.maintainers || []);
  }, [allAddons])

  return (
    <Modal open={isOpen} onClick={() => setIsOpen(false)}>

      <ModalDialog aria-labelledby="dialog-vertical-scroll-title" layout='center' onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={() => setIsOpen(false)} />
        <Typography id="dialog-vertical-scroll-title" level="h2">
          Manage contributors
        </Typography>
        {error && (
          <Alert
            key="Error"
            sx={{ alignItems: 'flex-start' }}
            startDecorator={(<ReportIcon />)}
            variant="soft"
            color="danger"
            endDecorator={
              <IconButton variant="soft" color="danger">
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <div>
              <div>Error</div>
              <Typography level="body-sm" color="danger">
                The following error has occurred: {error}
              </Typography>
            </div>
          </Alert>
        )}
        {view === "manage" ? (
          <ContributorsList {...maintainers} />
        ) : (
          <AddContributors addon={addon} setView={setView}/>
        )}
        {view === "manage" && <Button onClick={() => setView("add")}>Add new contributors</Button>}
      </ModalDialog>
    </Modal>
  )
}

export default ManageContributors