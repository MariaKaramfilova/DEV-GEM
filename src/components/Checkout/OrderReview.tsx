import React, { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import { getAddonById } from '../../services/addon.services.ts';
import { Alert, Snackbar } from '@mui/material';
import { AspectRatio, Box, Card, Chip, Link, Stack, Typography } from '@mui/joy';
import { Addon } from '../../context/AddonsContext.ts';
import RatingWithValue from '../Reviews/RatingWithValue.tsx';

export default function OrderReview() {
  const [addon, setAddon] = useState<Addon>({});
  const [error, setError] = useState(null);
  const params = useParams();
  const addonId = params.addon;

  console.log(addon);

  useEffect(() => {
    (async () => {
      try {
        if (addonId) {
          const response = await getAddonById(addonId);
          setAddon(response);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [addonId]);

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">The following error has ocurred: {error}</Alert>
      </Snackbar>
    )
  }

  return (
    <Fragment>
      <Typography sx={{fontWeight: "600", fontSize: "1.1em"}}>
        Selected add-on
      </Typography>
      <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        alignContent: "left",
        marginTop: "1em",
        textAlign: "left",
        transition: '250ms all',
        padding: {
          xs: 0,
          sm: 2,
        },
        boxShadow: 'none',
        borderRadius: 'sm',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        width="100%"
        spacing={2.5}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 200,
            },
            marginBottom: {
              xs: -2.5,
              sm: 0,
            },
          }}
        >
          <AspectRatio
            objectFit='contain'
            sx={(theme) => ({
              borderRadius: 'xs',
              [theme.breakpoints.down('sm')]: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          >
            {addon.logo && <img alt="" src={addon.logo} style={{ display: 'block' }} />}
            {addon.downloads && addon.downloads > 10 && (
              <Chip
                variant="soft"
                startDecorator={<i data-feather="award" />}
                size="sm"
                sx={{ position: 'absolute', bottom: 8, left: 8 }}
              >
                Top pick
              </Chip>
            )}
          </AspectRatio>
        </Box>
        <Stack
          sx={{
            padding: {
              xs: 2,
              sm: 0,
            },
          }}
          spacing={1}
          flex={1}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography color="primary" fontSize="sm" fontWeight="lg">
                {addon.targetIDE}
              </Typography>
              <Typography fontWeight="md" fontSize="lg">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  {addon.name}
                </Link>
              </Typography>
            </div>
          </Stack>
          <Stack spacing={1} direction="row">
          <RatingWithValue size="small" addonId={addon.addonId}></RatingWithValue>

          </Stack>

          <Stack spacing={3} direction="row">
            <Typography>
            {addon.ratings?.length || 0} reviews
            </Typography>
            <Typography sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong style={{fontSize: "1.6em"}}>${addon.price}</strong> <Typography>total</Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
      {/* <Typography variant="h7">
        Subscribe to ${addon.name}
      </Typography>
      <List disablePadding>
        <ListItem key={addonId} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={addon.name} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${addon.price}
          </Typography>
        </ListItem>
      </List> */}
    </Fragment>
  );
}