import { useState } from 'react';
import NavBar from './components/NavBar';
import PredictionBox from './components/PredictionBox';
import RiskForm from './components/RiskForm';
import RiskOutput from './components/RiskOutput';
import { Container, Typography, Divider, Box } from '@mui/material';

function App() {
  const [riskData, setRiskData] = useState(null);

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Price Prediction Section */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom>
              🔮 Stock Price Prediction
            </Typography>
            <PredictionBox />
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Risk Analysis Section */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom>
              📊 Portfolio Risk Analysis
            </Typography>
            <RiskForm onResult={setRiskData} />
          </Box>

          {/* Risk Output */}
          {riskData && (
            <Box>
              <Typography variant="h5" gutterBottom>
                ✅ Risk Analysis Results
              </Typography>
              <RiskOutput data={riskData} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;
