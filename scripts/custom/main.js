$(document).ready(function() {

  var appEnabled = false;
  var appLoaded = false;
  var maybeList = new Array();
  var restaurants;
  var venues;
  var zipCode;

  /***********
  * Quick access to tabs
  ***********/
  var detailsTab = '#details-tab';
  var errorTab = '#error-tab';
  var settingsTab = "#settings-tab";
  var venueTab = '#venue-tab';

  /***********
  * Quick access to venue information
  ***********/
  var venueCategory = '.venue-ticket .venue-category';
  var venueDistance = '.venue-ticket .venue-distance';
  var venueLocation = '.venue-ticket .venue-location';
  var venueText = '.venue-ticket .venue-name';
  var venueRating = '.venue-ticket .venue-rating';

  /***********
  * Quick access to controls
  ***********/
  var carouselControls = '.carousel-control';

  /***********
  * Quick access to buttons
  ***********/
  var detailsButton = '.btn[data-action="details"]';
  var maybeButton = '.btn[data-selection="maybe"]';
  var navButton = '.btn[data-action="nav"]';
  var neverButton = '.btn[data-selection="never"]';
  var picButton = '.btn[data-action="pics"]';
  var restartButton = '.btn[data-action="restart"]';
  var selectButton = '.btn[data-action="select"]';
  var settingsButton = '.icon-cog[data-action="settings"]';
  var skipButton = '.btn[data-action="skip"]';
  var webButton = '.btn[data-action="www"]';
  var zipButton = '.btn[data-action="zip"]';

  /***********
  * Quick access to containers
  ***********/
  var imageContainer = '.image-container';
  var mapContainer = '.map-container';

  /***********
  * Quick access to inputs and outputs
  ***********/
  var errorText = '#error-tab .error-text';
  var imageCarousel = '.image-container .carousel-inner'
  var zipCodeInput = 'input[data-value="zip"]';

  $(window).load(function() {
    resizeSplash();
  });

  $(window).resize(function() {
    resizeSplash();
  });

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getVenue, showError, {timeout:10000});
  } 

  $(picButton).click(function() {
    $(imageContainer).toggle();
    $(picButton).toggleClass('active');
  });

  $(restartButton).click(function() {
    location.reload();
  });

  $(settingsButton).click(function() {
    $(errorText).text('We need your location to find the nearest restaurants.');
    $(errorTab).show();
    // $(settingsTab).show();
    // if (zipCode) {
    //   $(settingsZipCode).val(zipCode);
    // }
    $(venueTab).hide();
  });

  $(skipButton).click(function() {
    skipVenue();
  });

  $(zipButton).click(function() {
    zipCode = $(zipCodeInput).val();
    if (zipCode.length === 5) {
      checkLength();
      $(errorTab).hide();
      $(settingsTab).hide();
      $(venueTab).show();
      $(venueText).text('Loading . . .');
      $(venueLocation).html('<br/>');
      $(venueDistance).html('<br/>');
      $(venueRating).html('<br/>');
      getVenue(zipCode, true);
    }
  });

  $(zipCodeInput).on('keypress, keyup', function(e) {
    checkLength();
    if (e.which === 13) {
      $(zipButton).focus().click();
      return false; 
    }
  });

  function buildRow(key, value) {
    return '<tr><th>' + key + '</th><td>' + value + '</td></tr>'
  }

  function checkLength() {
    if ($(zipCodeInput).val().length === 5) {
      $(zipButton).removeAttr('disabled');
    } else {
      $(zipButton).attr('disabled', 'disabled');
    }
  }
  
  function getAddressString(location) {
    var address = '';
    if (location.address) {
      address += location.address;
    }
    address += '<br/>';
    if (location.city && location.state && location.postalCode) {
      address += location.city + ' ' + location.state + ' ' + location.postalCode;
    } else if (location.city && location.state) {
      address += location.city + ' ' + location.state;
    }
    return address;
  }

  function getDistance(destination) {
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

    var data = {
      sensor: false,
      units: 'imperial',
    };

    data.origins = zipCode;
    data.destinations = destination;

    $.ajax({
      data: data,
      dataType: 'json',
      success: function(data) {
        if (data.status === "OK") {
          if (data.rows[0].elements[0].distance.text) {
            var distance = data.rows[0].elements[0].distance.text;
            if (distance === '1 ft') {
              $(venueDistance).text('Really close');
            } else {
              $(venueDistance).text(distance.replace('mi', 'Miles'));
            }
          }
        } else {
          $(venueDistance).text('Unknown');
        }
      },
      url: url
    });
  }

  function getError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return 'We need your location to find the nearest restaurants.';
      case error.POSITION_UNAVAILABLE:
        return 'We couldn\'t find your location, are you sure you really exist?';
      case error.TIMEOUT:
        return 'Took too long to get your location, why you playin\' me like that?';
      default:
        return 'Oh man... you broke it, you broke everything! Way to go.';
    }
  }

  function getMilesFromYards(yards) {
    return (yards * 0.000568182).toFixed(2);
  }

  function getRandomTaunt() {
    var taunts = [
      "Beggars can't be choosers."
    ];
    var r = Math.round(Math.random() * (taunts.length - 1));
    return taunts[r];
  }

  function getPhotos(id) {
    var url = 'https://api.foursquare.com/v2/venues/' + id + '/photos';

    var data = {
      group: 'venue',
      oauth_token: 'LXAPH13IS5UHADJMPA5QWI2AH4PFB3ZYN1EFDGIJHWGG4IBV',
      limit: 100,
      v: '20130326'
    };

    $.ajax({
      data: data,
      dataType: 'json',
      success: function(data) {
        var photos = data.response.photos;
        if (photos.count > 0) {
          var imageList = '<div class="carousel-inner">';
          var x = 0;
          photos.items.forEach(function(photo) {
            if (x === 0) {
              imageList += '<div class="item active"><img src="' + photo.prefix + '250x250' + photo.suffix + '" alt></div>';
            } else {
              imageList += '<div class="item"><img src="' + photo.prefix + '250x250' + photo.suffix + '" alt></div>';
            }
            x++;
          });
          imageList += "</div>";
          $(imageCarousel).html(imageList);
        } else {
          $(imageContainer).hide();
        }
      },
      url: url
    });
  }

  function getVenue(position, isZip) {

    var url = 'https://api.foursquare.com/v2/venues/explore';

    var data = {
      limit: 50,
      oauth_token: 'LXAPH13IS5UHADJMPA5QWI2AH4PFB3ZYN1EFDGIJHWGG4IBV',
      section: 'food',
      v: '20130326'
    };
      
    if (isZip) {
      var zip = position;
      data.near = position;
    } else {
      var ll = position.coords.latitude + ',' + position.coords.longitude;
      data.ll = ll;
    }

    $.ajax({
      data: data,
      dataType: 'json',
      success: function(data) {
        venues = data.response.groups[0].items;
        venues.shuffle();
        showVenue();
        $('.decision-bar .btn').removeAttr('disabled');
        appEnabled = true;
      },
      error: function(data) {
        showError(data);
      },
      url: url
    });
  }

  function openNav(currentVenue, address) {
    var mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(address.latitude, address.longitude)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var markerOptions = {
      position: map.getCenter(),
      map: map
    };
    var marker = new google.maps.Marker(markerOptions);
    var infoWindow = new google.maps.InfoWindow({
      content: '<b>' + currentVenue.name + "</b>"
    });
    if (currentVenue.location.address && currentVenue.location.city && currentVenue.location.state) {
      infoWindow.content += '<br/>' + currentVenue.location.address + '<br/>' + currentVenue.location.city + ', ' + currentVenue.location.state;
      if (currentVenue.location.postalCode) {
        infoWindow.content += ' ' + currentVenue.location.postalCode;
      }
    }
    // google.maps.event.addListener(marker, 'click', function() {
    //   infoWindow.open(map, marker);
    // })
  }

  function openSplash() {
    appLoaded = true;
    if (Modernizr.touch) {
      $('.navbar-inner').animate({ height: 50 });
      $('.container-fluid').animate({ height: (window.innerHeight - 100) });
    } else {
      $('.navbar-inner').animate({ height: 80 });
      $('.container-fluid').animate({ height: (window.innerHeight - 160) });
    }
  }
  
  function resizeSplash() {
    if (!appLoaded) {
      $('.navbar-inner').height(window.innerHeight / 2);
    } else {
      openSplash();
    }
  }

  function showError(error) {
    $(errorText).text(getError(error));
    $(venueTab).hide();
    $(errorTab).show();
    openSplash();
  }

  function showVenue() {
    $(imageContainer).hide();
    $(picButton).removeClass('active');
    var currentVenue = venues[0].venue;
    $(venueText).text(currentVenue.name);
    var address = getAddressString(currentVenue.location);
    $(venueLocation).html(address);
    $(maybeButton).unbind('click');
    $(maybeButton).click(function() {
      maybeList.push(currentVenue);
      skipVenue();
    });
    if (currentVenue.categories) {
      $(venueCategory).text(currentVenue.categories[0].name);
    } else {
      $(venueCategory).text('Uncategorized');
    }
    if (currentVenue.location.distance) {
      $(venueDistance).text(getMilesFromYards(currentVenue.location.distance) + ' Miles');
    } else {
      if (zipCode) {
        getDistance(address);
      }
    }
    if (currentVenue.rating) {
      $(venueRating).text(currentVenue.rating + ' / 10');
    } else {
      $(venueRating).text('Not yet rated');
    }
    $(webButton).unbind('click');
    if (currentVenue.url) {
      $(webButton).removeAttr('disabled');
      $(webButton).click(function() {
        window.open(currentVenue.url)
      });
    } else {
      $(webButton).attr('disabled', 'disabled');
    }
    $(navButton).unbind('click');
    if (currentVenue.location.lat && currentVenue.location.lng) {
      $(navButton).removeAttr('disabled');
      address = {
        latitude: currentVenue.location.lat,
        longitude: currentVenue.location.lng
      };
      if ($(mapContainer).is(':visible')) {
        openNav(currentVenue, address);
      }
      $(navButton).click(function() {
        if (!$(mapContainer).is(':visible')) {
          $(mapContainer).show();
          openNav(currentVenue, address);
          $(navButton).addClass('active');
        } else {
          $(mapContainer).hide();
          $(navButton).removeClass('active');
        }
      });
    } else {
      $(navButton).attr('disabled', 'disabled');
    }
    if (currentVenue.photos.count > 0) {
      if (currentVenue.photos.count == 1) {
        $(carouselControls).hide();
        $(carouselControls).hide();
      } else{
        $(carouselControls).show();
        $(carouselControls).show();
      }
      getPhotos(currentVenue.id);
      $(picButton).removeAttr('disabled');
    } else {
      $(imageContainer).hide();
      $(picButton).attr('disabled', 'disabled');
    }
    if (!appLoaded) {
      openSplash();
    }    
  }

  function skipVenue() {
    if (appEnabled) {
      venues.shift();
      if (venues.length > 0) {
        showVenue();  
      } else if (maybeList.length > 0) {
        $('.venue-ticket .row-fluid').hide();
        var accordion = '';
        maybeList.forEach(function(venue) {
          accordion += formatAccordion(venue);
        });
        $('#accordion-maybe').html(accordion);
        $('.maybe-result .row-fluid').show();
        $('.maybe-result').show();
      } else {
        $('.venue-ticket .row-fluid').hide();
        $('.end-result').show();
        $('.end-message').text(getRandomTaunt());
      }
    }
  }

  function formatAccordion(venue) {
    var result = '<div class="accordion-group">' +
      '<div class="accordion-heading">' +
        '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-maybe" href="#' + venue.id + '">' +
        '<i class="icon-food"></i> ' + venue.name + '</a>' +
      '</div>' +
      '<div id="' + venue.id + '" class="accordion-body collapse">' +
        '<div class="accordion-inner">' +
          '<div class="row-fluid">' +
            '<span>Location: </span>' + getAddressString(venue.location).replace('<br/>', ', ') +
          '</div>';
      if (venue.categories) {
        result += '<div class="row-fluid"><span>Category: </span>' + venue.categories[0].name + '</div>';
      }
      if (venue.location.distance) {
        result += '<div class="row-fluid"><span>Distance: </span>' + getMilesFromYards(venue.location.distance) + ' Miles</div>';
      }
      if (venue.rating) {
        result += '<div class="row-fluid"><span>Rating: </span>' + venue.rating + ' / 10</div>';
      }
      if (venue.url) {
        result += '<div class="row-fluid"><span>Website: <span><a href="' + venue.url + '" target="_blank">' + venue.url + '</a></div>';
      }
      result += '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    return result;
  }
});
