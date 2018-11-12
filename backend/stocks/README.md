# FCC Fullstack Application - Stock Market

My learning objectives for this project were to learn about and use websockets in Javascript. Moreover I wanted to try some test driven development as I don't have a postman client for websockets. So I used my test suite from mocha to act as my websocket client.

I also wanted to implement a redis cache on the backend to learn about caching and to learn more about redis. I mean this project doesn't really need a cache system but it's a nice implementation detail and will teach me about caching and redis itself.

## Local Development

### Running Replica

- Copy the `.env.sample` file into a `.env` file getting your own version of all the secrets required to run this project.
- TODO

### Running Tests

- `yarn`
- `yarn test`

### Seeding the Database

- `yarn`
- `cd backend`
- `yarn seed`

## Code Formatting

This is done with Prettier and Eslint see the `.prettierrc.yaml` and `.eslintrc.json` files in the root of this directory for my setup.

## User Stories

- [ ] I can view a graph displaying the recent trend lines for each added stock
- [ ] I can add new stocks by their symbol name
- [ ] I can remove stocks
- [ ] I can see changes in real-time when any other user adds or removes
      a stock.

## Stack

- React
- NodeJS
- MongoDB
- Redis

## Author

Leon Boehmer 2018
