const algoliasearch = require("algoliasearch");
const client = algoliasearch("WXZBTON7QZ", "0538989e5ef2c0ce383f06e4c1183f04")
let index = client.initIndex("apotheke")
export default  index

