let config = {
	cookieParserSecret: process.env.cookieParserSecret || "<SECRET>", // secret for cookie parser
    JWTsecret: process.env.JWTsecret || "<SECRET>", // secret for JWT 
    mongoUsername: process.env.mongoUsername || "<mongo username>", // if you have your db
    mongoPw: process.env.mongoPw || "<mongo pw>", // if you have your db
    mongoUrl: process.env.mongoUrl || "<mongo remote server url>",
    server:"https://http://screenshooterapi.herokuapp.com", // your server - change to http://localhost:3000 to run locally
};

module.exports = config

