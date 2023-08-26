import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

interface CardInvertedColorsProps {
  child: string;
  count: number;
  cardColor: string; // Rename the prop here
}

export const CardInvertedColors: React.FC<CardInvertedColorsProps> = ({ child, count }) => {
  return (
    <Card>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={count}>
          <SvgIcon>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{child}</Typography>
          <Typography level="h2">{count}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
