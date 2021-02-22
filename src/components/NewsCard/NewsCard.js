import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: 3,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  media: {
    height: 150,
  },
}));

export default function NewsCard() {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: "white", color: "black" }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2021/02_feb/22_mon/img_1613990432021_546.jpg"
        />
        <CardContent>
          <Typography gutterBottom style={{ fontSize: 18, fontWeight: 700 }}>
            Base fares of autos, taxis in Mumbai increased by ₹3 amid fuel price
            rise
          </Typography>
          <Typography variant="body2" component="p" style={{ fontSize: 15 }}>
            The base fares for autorickshaws and taxis in Mumbai have been hiked
            by ₹3 across the Mumbai Metropolitan Region (MMR) amid a rise in
            prices of petrol and diesel. The minimum fare for autos has been
            hiked to ₹21 from ₹18 while for Kaali Peeli taxi, the price has gone
            up to ₹25 from ₹22.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="default" variant="outlined">
          Learn More
        </Button>
        <Button size="small" color="secondary" variant="outlined">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
