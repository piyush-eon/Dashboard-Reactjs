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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    color: "black",
  },
  media: {
    height: 150,
  },
  badge: {
    padding: 4,
    color: "white",
    fontSize: 10,
  },
}));

export default function NewsCard({
  singleNews,
  deleteNews,
  approve,
  approveNews,
}) {
  const classes = useStyles();

  const date = (d) => {
    let getdate = new Date(d);

    return getdate.toDateString();
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={singleNews.pic} />
        <CardContent>
          <Typography
            variant="caption"
            className={classes.badge}
            style={{
              backgroundColor: "orangered",
            }}
          >
            {singleNews.category}
          </Typography>
          <Typography
            variant="caption"
            className={classes.badge}
            style={{
              backgroundColor: "#6b5b95",
            }}
          >
            {singleNews.location}
          </Typography>
          <Typography
            variant="caption"
            className={classes.badge}
            style={{
              backgroundColor: "#86af49",
            }}
          >
            {date(singleNews.updatedAt)}
          </Typography>

          <Typography
            gutterBottom
            style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}
          >
            {singleNews.title}
          </Typography>
          <Typography
            variant="caption"
            className={classes.badge}
            style={{
              backgroundColor: "#3e4444",
              marginTop: 4,
            }}
          >
            By - {singleNews.user.name || `+91${singleNews.user.phone}`}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ fontSize: 15, marginTop: 4 }}
          >
            {singleNews.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="default" variant="outlined">
          <a
            href={singleNews.source}
            style={{ textDecoration: "none", color: "inherit" }}
            target="__blank"
          >
            Learn More
          </a>
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => deleteNews(singleNews._id)}
        >
          Delete
        </Button>
        {approve && (
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => approveNews(singleNews._id)}
          >
            Approve
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
