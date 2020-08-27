# ABL Space Systems Coding Challenge - Server

## Required Dependencies

**Requires Node version >= 14.8**

We recommend using `nvm` (node version manager) to ensure the correct version of Node is installed.

### Installing nvm

If you don't have `nvm` installed, download it by running

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash `.

[More information here.](https://github.com/nvm-sh/nvm)

Then, run `nvm use` in this directory. You should see the following output:

`Now using node v14.8.0 (npm v6.14.7)`.

### Remaining dependencies

Run `npm install`


## Starting the server

`npm start` will run a WebSocket server on port `8080`. You can connect to it at the following URL:

`ws://localhost:8080`

Once connected to the server, your client will receive events from multiple data sources over time. 

`npm start-dev` can be used for debugging. It will only publish events from a single data source. This may be helpful when getting started, but your finished code will be evaluated against the full set of data sources produced by running the server with `npm start`.
   
