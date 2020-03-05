import { mount } from "enzyme";
import * as React from "react";
import { HashRouter as MockRouter } from "react-router-dom";
import Details from "./Details";
import fetchMock from "fetch-mock";
import { detailsEndpoint } from "../../api-facade/endpoints";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducer";

describe("Details Page", () => {
  afterEach(fetchMock.restore);
  const a = {
    Title:
      "Birds of Prey: And the Fantabulous Emancipation of One Harley Quinn",
    Year: "2020",
    Rated: "R",
    Released: "07 Feb 2020",
    Runtime: "109 min",
    Genre: "Action, Adventure, Crime",
    Director: "Cathy Yan",
    Writer: "Christina Hodson",
    Actors:
      "Margot Robbie, Rosie Perez, Mary Elizabeth Winstead, Jurnee Smollett-Bell",
    Plot:
      "After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.",
    Language: "English, Chinese",
    Country: "USA, UK",
    Awards: "3 nominations.",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMzQ3NTQxMjItODBjYi00YzUzLWE1NzQtZTBlY2Y2NjZlNzkyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "6.6/10" },
      { Source: "Rotten Tomatoes", Value: "79%" },
      { Source: "Metacritic", Value: "60/100" }
    ],
    Metascore: "60",
    imdbRating: "6.6",
    imdbVotes: "42,728",
    imdbID: "tt7713068",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "N/A",
    Production: "Warner Bros. Pictures",
    Website: "N/A",
    Response: "True"
  };
  const store = createStore(reducer, {
    movie: "1",
    theatre: "",
    time: ""
  });
  it("should render the component", () => {
    const component = mount(
      <Provider store={store}>
        <MockRouter>
          <Details />
        </MockRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("should fetch movie details and display title on load", async () => {
    fetchMock.get(`${detailsEndpoint}1`, a);

    const component = mount(
      <Provider store={store}>
        <MockRouter>
          <Details />
        </MockRouter>
      </Provider>
    );
    await delay();
    component.update();
    fetchMock.done();
    expect(component.find("div.meta__title").text()).toEqual(a.Title);
  });

  it("should let you book movie", async () => {
    fetchMock.get(`${detailsEndpoint}1`, a);

    const component = mount(
      <Provider store={store}>
        <MockRouter>
          <Details />
        </MockRouter>
      </Provider>
    );
    await delay();
    component.update();
    fetchMock.done();
    expect(component.find("div.select__button").hasClass("active")).toBe(false);
    component
      .find("div.accordion")
      .at(0)
      .find("div.icon")
      .simulate("click");
    await delay();
    component.update();
    component
      .find("div.time__button")
      .at(0)
      .simulate("click");
    expect(component.find("a.select__button").hasClass("active")).toBe(true);
  });
});

export function delay(milliseconds = 10) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
