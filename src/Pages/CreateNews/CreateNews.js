import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import categories from "../../data/category";
import "./CreateNews.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { citiesWithState } from "../../data/citiesWithState";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const CreateNews = () => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState();
  const [source, setSource] = useState();
  const [content, setContent] = useState();
  const [pic, setPic] = useState();

  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const items = citiesWithState;

  const handleOnSelect = (item) => {
    setLocation(item.name);
  };

  const createSingleNews = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("source", source);
    formData.append("location", location);
    formData.append("pic", pic);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/news/admin/create",
        formData,
        config
      );
      setError();
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userDetail")));
  }, []);

  return (
    <div>
      <div
        style={{
          fontFamily: "Montserrat",
          fontSize: 50,
          paddingBottom: 10,
          marginTop: -10,
        }}
      >
        Create Your News
      </div>
      {error && (
        <Alert severity="error" style={{ marginBottom: 10 }}>
          {error.message}
        </Alert>
      )}
      <form noValidate autoComplete="off" className="form">
        <div className="row1">
          <TextField
            style={{ marginBottom: 10 }}
            className="title"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl variant="outlined" className="category">
            <InputLabel id="demo-simple-select-outlined-label">
              Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="row1">
          <div className="source" style={{ marginBottom: 10 }}>
            <ReactSearchAutocomplete
              placeholder="Select Location"
              items={items}
              styling={{
                borderRadius: "5px",
                height: "54px",
                boxShadow: "none",
                backgroundColor: "white",
                border: "1px solid lightgrey",
                zIndex: 1000,
              }}
              // onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              // onFocus={handleOnFocus}
              autoFocus
            />
          </div>{" "}
          <TextField
            className="source"
            id="outlined-basic"
            label="Source URL"
            variant="outlined"
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="row1">
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label="Write Your News"
            variant="outlined"
            multiline
            rows="11"
            className="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="row1">
          <input
            type="file"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid grey",
              borderRadius: "4px",
            }}
            // value={pic}
            onChange={(e) => setPic(e.target.files[0])}
          />
        </div>

        {loading && (
          <CircularProgress
            color="inherit"
            size="50px"
            style={{ marginTop: 6, alignSelf: "center" }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          size="large"
          onClick={createSingleNews}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateNews;
