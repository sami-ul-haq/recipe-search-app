import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Recipe from "./components/Recipe";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: "10px auto",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function App() {
  const classes = useStyles();

  const APP_ID = "9191e1b8";
  const APP_KEY = "4f7bd66aec1f63fc0f3d3fe6f96023d7";

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <>
      <Paper component="form" onSubmit={updateQuery} className={classes.root}>
        <InputBase
          type="text"
          value={search}
          onChange={updateSearch}
          className={classes.input}
          placeholder="Search For Recipe"
          inputProps={{ "aria-label": "search for recipe" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* Material UI Used Inplace Of This*/}
      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">Search</button>
      </form> */}
      <div style={{ padding: 30 }}>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={4}>
              <Recipe
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredient={recipe.recipe.ingredients}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
