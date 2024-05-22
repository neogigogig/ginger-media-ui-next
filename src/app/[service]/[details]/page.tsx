import { Typography, Box } from "@mui/material";

interface DetailsProps {
  params: {
    service: string;
    details: string;
  };
}

const DetailsPage: React.FC<DetailsProps> = ({ params }) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Details of the media: {params.details}
      </Typography>
    </Box>
  );
};

export default DetailsPage;
