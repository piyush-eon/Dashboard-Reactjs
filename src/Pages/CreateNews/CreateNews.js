import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import categories from "../../data/category";
import "./CreateNews.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { citiesWithState } from "../../data/citiesWithState";

const CreateNews = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const items = citiesWithState;

  // const handleOnSearch = (string, results) => {
  //   console.log(string, results);
  // };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  const handleOnSelect = (item) => {
    console.log(item.name);
  };

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
      <form noValidate autoComplete="off" className="form">
        <div className="row1">
          <TextField
            style={{ marginBottom: 10 }}
            className="title"
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <FormControl variant="outlined" className="category">
            <InputLabel id="demo-simple-select-outlined-label">
              Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Category"
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
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          size="large"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateNews;
