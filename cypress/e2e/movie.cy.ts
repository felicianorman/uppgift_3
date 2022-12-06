describe("movieApp", () => {
  it("should input text", () => {
    //Arrange
    cy.visit("http://localhost:1234");

    cy.get("input").type("Harry Potter").should("have.value", "Harry Potter");
  });

  it("should add movies", () => {
    cy.visit("http://localhost:1234");

    cy.get("input").type("Harry Potter").should("have.value", "Harry Potter");
    cy.get("button").click();
    cy.get("div.movie").should("have.length", 10);
  });

  it("should not add movies if wrong input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type(".").clear();
    cy.get("button").click();

    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });

  it("should display error message if empty input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input");
    cy.get("button").click();

    cy.get("p").contains("Inga sökresultat att visa");
    cy.get("div.movie").should("have.length", 0);
  });
});

describe("movieservice", () => {
  let mockMovies = [
    {
      Title: "Twilight",
      imdbID: "1234",
      Type: "Movie",
      Poster: "url",
      Year: "2008",
    },
    {
      Title: "The Twilight Saga: New Moon",
      imdbID: "4567",
      Type: " Movie",
      Poster: "url",
      Year: "2009",
    },
    {
      Title: "The Twilight Saga: Eclipse",
      imdbID: "1234",
      Poster: "url",
      Year: "2010",
    },
    {
      Title: "The Twilight Saga: Breaking Dawn - Part 1",
      imdbID: "2345",
      Poster: "url",
      Year: "2011",
    },
    {
      Title: "The Twilight Saga: Breaking Dawn - Part 2",
      imdbID: "2345",
      Poster: "url",
      Year: "2012",
    },
  ];

  it("should test api", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockMovies).as("movieCall");

    cy.get("input").type("Twilight").should("have.value", "Twilight");
    cy.get("button").click();

    cy.wait("@movieCall").its("request.url").should("contain", "s=Twilight");
    cy.get("@movieCall").its("response.body").should("have.length", 5);
  });
});
