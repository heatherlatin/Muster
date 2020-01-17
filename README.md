# Muster

## About Muster

## SeatGeek API Secret Thing
Your app secret is "24c6903bd6b5005c4d5de56d640bf9c071cf6f6a42b4a55c96dee81ebc08df14" - copy now as it can't be retrieved later.

function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    const URL = "https://api.seatgeek.com/2/events?";

    // Set the API key
    const key = "client_id=MTk1OTI0NDF8MTU3NDQ1Mjc1MC43NQ&client_secret=24c6903bd6b5005c4d5de56d640bf9c071cf6f6a42b4a55c96dee81ebc08df14";
  
    // Begin building an object to contain our API call's query parameters
    const params = "&taxonomies.name=sports&taxonomies.name=concert"

    const queryURL = URL + key + params;
    
    // Logging the URL so we have access to it for troubleshooting
    console.log(queryURL);
  }


  buildQueryURL();


