import { Card, CardContent, Typography, Box } from '@mui/material';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { variance, std_dev } = result;

  const riskLabel = std_dev < 0.15
    ? "🟢 Low"
    : std_dev < 0.25
    ? "🟠 Medium"
    : "🔴 High";

  return (
    <Card elevation={6} sx={{ mt: 4, maxWidth: 600, mx: 'auto', background: '#F9FAFB' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          📉 Portfolio Risk Summary
        </Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="body1">Variance:</Typography>
          <Typography variant="body1" fontWeight={600}>
            {variance.toFixed(6)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="body1">Standard Deviation:</Typography>
          <Typography variant="body1" fontWeight={600}>
            {std_dev.toFixed(4)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body1">Risk Level:</Typography>
          <Typography variant="body1" fontWeight={600}>
            {riskLabel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
