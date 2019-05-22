// src/app.js
const express = require('express')
const app = express()
var log = require('cf-nodejs-logging-support');
const ShippingController = require('../src/controllers/shipping-controller')

// Set the minimum logging level (Levels: error, warn, info, verbose, debug, silly)
log.setLoggingLevel("info");

// Bind to express app
app.use(log.logNetwork);

app.get('/*shipping', (request, response) => {
  let ctrl = new ShippingController()
  // Set the minimum logging level (Levels: error, warn, info, verbose, debug, silly)
    request.logger.info("Hello watcher, i'm watching you!");

  ctrl
    .getItemShipping({id: request.query.itemId, type: request.query.type})
    .then(amount => {
      response.send({message:'Shipping the good stuff (by Bezos)', itemId: request.query.itemId, priceUSD: amount })
    })
    .catch(error => {
      response.status(500).send({ error: error.message })
    })

})

log.info("Server is listening on port %d", 3000);
let PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`ShippingService is listening on port ${PORT}`))
