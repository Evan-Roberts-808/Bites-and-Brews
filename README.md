# Bites & Brews

<h2>A fun interactive way to discover new recipes and cocktails</h2>

<h3><a href="https://www.figma.com/file/feEfOUKVTLw6GFywQhmHqc/Bites%26Brews-Wireframes?type=design&node-id=0%3A1&t=KPvSMTOv4pPrTJad-1">Wireframes</a></h3>
<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/Home.png" width="300px"/>
<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/List-Page.png" width="300px"/>
<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/Details.png" width="300px"/>
<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/Favorites-Version.png" width="300px"/>
<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/Submit.png" width="300px"/>

<h3>User Stories:</h3>

Users will be able to...

1. View recipes and cocktails
2. View 5 most recent
3. Filter / search by cuisine or ingredients 
4. View details of selected
5. Like recipe / cocktail
6. Comment on recipe / cocktail
7. Submit their own recipes
8. Be able to Favorite recipes / cocktails
9. Be able to remove from favorites
10. Edit in their favorites
11. Toggle between dark and light

Stretch Goals
1. Show random recipe when Random button is clicked
2. Pairing functionality to pair recipes and cocktail suggestions
3. Dietary Restrictions

<h3>React Tree</h3>

<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/ReactTree.png" width="1000px" />

<h3>API Routes</h3>

| API Route                                    | Request Method | Body        | Response                                                                                                                                      |
|----------------------------------------------|----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| /recipes                                     |       GET      |             | [{...},{...},...]                                                                                                                             |
| /cocktails                                   |       GET      |             | [{...},{...},...]                                                                                                                             |
| /favorites                                   |       GET      |             | [{...},{...},...]                                                                                                                             |
| /favorites                                   |      POST      | {name, ...} | {name, description, image, source, preptime, waittime, cooktime, totaltime, servings, comments, likes, instructions, ingredients, categories} |
| /favorites/:id                               |     DELETE     |             | {}                                                                                                                                            |
| /favorites/:id                               |      PATCH     | {name, ...} | {name, description, image, source, preptime, waittime, cooktime, totaltime, servings, comments, likes, instructions, ingredients, categories} |
| /recipes?_sort= likes&_order=desc&_limit=5   |       GET      |             |                                                               [top five recipes]                                                              |
| /cocktails?_sort= likes&_order=desc&_limit=5 |       GET      |             |                                                              [top five cocktails]                                                             |

<h3>Client Side Routes</h3>

|     Client Route    | Component           |
|:-------------------:|---------------------|
| /                   |       Home.js       |
| /recipes            |    RecipePage.js    |
| /recipes/:id        |   RecipeDetails.js  |
| /cocktails          |   CocktailPage.js   |
| /cocktails/:id      |  CocktailDetails.js |
| /favorites          |   FavoritesPage.js  |
| /favorites/:id      | FavoritesDetails.js |
| /favorites/:id/edit |     EditForm.js     |
| /submit             | SubmitPage.js       |

<h3>Trello</h3>

<img src="https://raw.githubusercontent.com/Evan-Roberts-808/Bites-and-Brews/master/.github/images/wireframes/Trello.png" width="1000px" />
