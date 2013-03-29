$(document).ready(function() {
    
    var appEnabled = false;
    var restaurants;
    var venues;
    
    var taunts = [
      "Fine. Just don't fucking eat then. See if I care.",
      "Wow, fuck you. I hope you starve.",
      "Eat a dick you picky asshole.",
      "Blow me, bitch. Go eat at McDonalds."
    ];
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getVenue, showError);
    } else {
        $('.')
    }
    
    $('.btn[data-action="skip"]').click(function() {
        skipVenue();
    });

    $('.btn[data-action="zip"]').click(function() {
        var zipText = $('input[data-value="zip"]').val();
        if (zipText.length === 5) {
          hideZip();
          $('.venue').text('Loading . . .');
          getVenue(zipText, true);
        }
    });

    $('input[data-value="zip"]').keypress(function(e) {
      if (e.which === 13) {
        $('.btn[data-action="zip"]').focus().click();
        return false;
      }
    });

    $('input[data-value="zip"]').change(function() {
      checkLength();
    });
    
    $('input[data-value="zip"]').keyup(function() {
      checkLength();
    });

    $('input[data-value="zip"]').keydown(function() {
      checkLength();
    });

    function checkLength() {
      if ($('input[data-value="zip"]').val().length === 5) {
        $('.btn[data-action="zip"]').removeAttr('disabled');
      } else {
        $('.btn[data-action="zip"]').attr('disabled', 'disabled');
      }
    }
    
    function skipVenue() {
        if (appEnabled) {
            venues.shift();
            if (venues.length > 0) {
                $('.venue').text(venues[0].venue.name);
            } else {
                var r = Math.round(Math.random() * (taunts.length - 1));
                $('.venue').text(taunts[r]);
                $('.btn[data-action="skip"]').attr('disabled', 'disabled');
            }
        }
    }
    
    function getVenue(position, isZip) {

        var apiVersion = '20130326';
        var limit = 50;
        var oauth = 'D53VJTZAO1P0OYL0JNLTV3HDI21IMKUTSQXL1BCYFBVWUCVK';
        var section = 'food';
        var url = 'https://api.foursquare.com/v2/venues/explore';

        var ajaxData = {
          limit: limit,
          oauth_token: oauth,
          section: section,
          v: apiVersion
        };
        if (isZip) {
          var zip = position;
          ajaxData.near = position;
        } else {
          var ll = position.coords.latitude + ',' + position.coords.longitude;
          ajaxData.ll = ll;
        }

        $.ajax({
            data: ajaxData,
            dataType: 'json',
            success: function(data) {
                venues = data.response.groups[0].items;
                venues.shuffle();
                $('.venue').text(venues[0].venue.name);
                $('.btn[data-action="skip"]').removeAttr('disabled');
                appEnabled = true;
            },
            url: url
        });
    }

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          $('.venue').text('We need your location to find the nearest restaurants.');
          showZip();
          break;
        case error.POSITION_UNAVAILABLE:
          $('.venue').text('We couldn\'t find your location, are you sure you really exist?');
          showZip();
          break;
        case error.TIMEOUT:
          $('.venue').text('Took too long to get your location, why you playin\' me like that?');
          showZip();
          break;
        default:
          $('.venue').text('Oh man... you broke it, you broke everything!  Way to go.');
          showZip();
          break;
      }
    }

    function showZip() {
      $('.zip-code').removeClass('hidden');
    }

    function hideZip() {
      $('.zip-code').addClass('hidden'); 
    }

    Array.prototype.shuffle = function() {
      var i = this.length, j, tempi, tempj;
      if ( i == 0 ) return this;
      while ( --i ) {
         j       = Math.floor( Math.random() * ( i + 1 ) );
         tempi   = this[i];
         tempj   = this[j];
         this[i] = tempj;
         this[j] = tempi;
      }
      return this;
    }

});