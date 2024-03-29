import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box } from "@mui/material";
import { LocalOffer } from "@mui/icons-material";
import './style.css';
interface MediaCardProps {
  image: string;
  title: string;
  description: string;
  mediaType: string;
  city: string;
  detailsUrl: string;
  price: string;
  area: string;
}

export default function MediaCard({
  image,
  title,
  description,
  mediaType,
  city,
  detailsUrl,
  price,
  area,
}: MediaCardProps) {
  return (
    <Card sx={{ maxWidth: 325,minWidth:325}}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mediaType} , {city}
        </Typography>
        <Box>
          <LocalOffer />
          <span >{price}</span>
        </Box>
        <Typography style={{ marginLeft: "19px" }}>{area} sq.ft</Typography>
      </CardContent>
      <CardActions>
        <Link href={detailsUrl} style={{backgroundColor:'blue',color:'white',padding:'5px 5px'}} className="learnMoreButton">Learn More</Link>
      </CardActions>
    </Card>
  );
}
