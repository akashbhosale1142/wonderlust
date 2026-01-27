const express = require("express");
const router = new express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { findById } = require("../models/review.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index)
  )
  //create route
  .post(
    upload.single('listing[image][url]'),
    validateListing,
    isLoggedIn,
    
    wrapAsync(listingController.createListing)
  );




// new route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
  .route("/:id")
  //Update route
  .put(
    validateListing,
    upload.single('listing[image][url]'),
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  // delete route
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  )
  // show route
  .get(
    wrapAsync(listingController.showListing)
  );


//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
