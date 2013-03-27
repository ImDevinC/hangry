$(document).ready(function() {
    
    var restaurants;
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getVenue);
    }
    

});
    
    function getSelectedPeople() {
        var people = [];
        
        $('.people li.active a').each(function() {
            people.push($(this).text());
        });
        
        return people;
    }
    
    function getVenue(position) {
        
        var ll = position.coords.latitude + ',' + position.coords.longitude;

        var apiVersion = '20130326';
        var oauth = 'D53VJTZAO1P0OYL0JNLTV3HDI21IMKUTSQXL1BCYFBVWUCVK';
        var section = 'food';
        var url = 'https://api.foursquare.com/v2/venues/explore';
        
        $.ajax({
            data: { 
                limit: 50,
                //near: 'Minneapolis, MN',
                ll: ll,
                oauth_token: oauth, 
                section: section,
                v: apiVersion 
            },
            dataType: 'json',
            success: function(data) {
                console.log(data.response.groups[0].items);
                console.log(data.response.groups[0].items[0].venue.name);
                
                
                var venues = data.response.groups[0].items;
                
                $('.venue').text(venues[0].venue.name);
            },
            url: url
        });
    }