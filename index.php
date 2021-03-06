<!DOCTYPE html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Hangry</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="favicon.png">
    <link rel="apple-touch-icon" href="favicon.png">

    <link rel="stylesheet" href="stylesheets/libraries/initializr/normalize.min.css">
    <link rel="stylesheet" href="stylesheets/libraries/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/libraries/fontawesome/font-awesome.min.css">
    <link rel="stylesheet" href="stylesheets/custom/main.css">

    <script src="scripts/libraries/modernizr/modernizr-2.6.2.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.11&sensor=true"></script>
  </head>
  <body>
    <?php include_once("analyticstracking.php") ?>
      <div class="navbar">
        <div class="navbar-inner">
          <a class="brand" href="#">hangry</a>
        </div>
      </div>
  
    <div class="container-fluid">
      <div id="content" class="row">
        <div class="col-xs-12">
          <div class="tab-content">
            <div id="venue-tab" class="tab-pane active">
              <div class="venue-ticket ticket">
                <div class="row">
                  <div class="col-xs-8">
                    <span>Name</span><br />
                    <span class="venue-name"></span>
                  </div>
                  <div class="col-xs-4 pull-right">
                    <span class="settings pull-right">
                      <i class="fa fa-cog" data-action="settings"></i>
                    </span><br>
                    <span class="btn-group pull-right">
                      <button type="button" class="btn btn-danger" data-action="www" disabled><i class="fa fa-globe"></i></button>
                      <button type="button" class="btn btn-danger" data-action="nav" disabled><i class="fa fa-map-marker"></i></button>
                      <button type="button" class="btn btn-danger" data-action="pics" disabled><i class="fa fa-camera"></i></button>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <span>Location</span><br>
                    <span class="venue-location"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-4">
                    <span>Category</span><br>
                    <span class="venue-category"></span>
                  </div>
                  <div class="col-xs-4">
                    <span>Distance</span><br>
                    <span class="venue-distance"></span>
                  </div>
                  <div class="col-xs-4">
                    <span>Rating</span><br>
                    <span class="venue-rating"></span>
                  </div>
                </div>
                <div class="row decision-bar">
                  <div class="col-sm-6 col-xs-12">
                    <button type="button" class="btn btn-block btn-warning" data-action="maybe" data-selection="maybe" disabled="disabled">Maybe</button>
                  </div>
                  <div class="col-sm-6 col-xs-12">
                    <button type="button" class="btn btn-block btn-danger" data-action="skip" data-selection="no" disabled="disabled">No</button>
                  </div>
                </div>
                <div class="row end-result" style="display:none">
                  <div class="col-xs-12">
                    <span class="end-message"></span>
                  </div>
                </div>
                <div class="maybe-result" style="display:none">
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="panel-group" id="accordion-maybe"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <button type="button" class="btn btn-danger" data-action="restart">Restart</button>
                    </div>
                  </div>
                </div>
                <div class="row image-container" style="display:none">
                  <div id="venue-carousel" class="carousel slide" data-ride="carousel">
                    <center><div class="carousel-inner"></div></center>
                    <a class="carousel-control left" href="#venue-carousel" data-slide="prev"><i class="fa fa-chevron-left"></i></a>
                    <a class="carousel-control right" href="#venue-carousel" data-slide="next"><i class="fa fa-chevron-right"></i></a>
                  </div>
                </div>
                <div class="row map-container" style="display:none">
                  <div id='map-canvas' style="height: 400px"></div>
                </div>
              </div>
            </div>
          
            <div id="error-tab" class="tab-pane">
              <div class="error-ticket ticket">
                <div class="row">
                  <div class="col-xs-12">
                    <span class="error-text header"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-3">
                    <div class="zip-code input-group">
                      <input type="text" class="form-control" data-value="zip" placeholder="Zip code" maxlength="5">
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-danger" data-action="zip" disabled>Search</button>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-16 col-xs-12">
                    <div>Options</div>
                    <input type="text" class="form-control col-lg-2 col-md-2 col-sm-2" data-value="distance" placeholder="Distance" maxlength="2">
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
          <span class="foursquare"></span>
    </div>

    <script src="scripts/libraries/jquery/jquery-1.10.2.min.js"></script>
    <script src="scripts/libraries/bootstrap/bootstrap.min.js"></script>
    <script src="scripts/prototypes/array.js"></script>
    <script src="scripts/custom/main.js"></script>

  </body>
</html>
