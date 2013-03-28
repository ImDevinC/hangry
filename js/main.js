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
        navigator.geolocation.getCurrentPosition(getVenue);
    }
    
    $('.btn[data-action="skip"]').click(function() {
        skipVenue();
    });
    
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
    
    function getVenue(position) {
        
        var ll = position.coords.latitude + ',' + position.coords.longitude;

        var apiVersion = '20130326';
        var limit = 50;
        var oauth = 'D53VJTZAO1P0OYL0JNLTV3HDI21IMKUTSQXL1BCYFBVWUCVK';
        var section = 'food';
        var url = 'https://api.foursquare.com/v2/venues/explore';
        
        $.ajax({
            data: { 
                limit: limit,
                //near: 'Minneapolis, MN',
                ll: ll,
                oauth_token: oauth, 
                section: section,
                v: apiVersion 
            },
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