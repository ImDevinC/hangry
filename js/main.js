$(document).ready(function() {

    var people = ['Brian Drelling', 'Brian Lewis', 'Daniel Bearden', 'Devin Collins', 'Eric Stanley', 'Milly Carter'];
    
    var restaurants;
    
    $.getJSON('json/restaurants.json', function(data) {
        restaurants = data;
        console.log(restaurants);
    });
    
    $(window).load(function() {
        populateSelects();
        getRestaurant();
    });
    
    $('.people').on('click', 'a', function() {
        $(this).closest('li').toggleClass('active');
    });

    function populateSelects() {
        for (i in people) {
            $('.people').append('<li class="active"><a>' + people[i] + '</a></li>');
        }
        for (i in restaurants) {
            $('.restaurants').append('<option value="' + i + '">' + restaurants[i].name + '</option>');
        }
    }
    
    function getRestaurant() {
        var random;
        var selectedRestaurant;
        var selectedPeople = getSelectedPeople()
        
        selectedRestaurant = restaurants[random];
        
        do {
            random = Math.floor(restaurants.length * (Math.random() % 1));
            selectedRestaurant = restaurants[random];
            console.log(selectedRestaurant);
        } while(isRestaurantAcceptable(selectedRestaurant, selectedPeople) == false);
        
        $(".restaurants > option").attr('selected',false).eq(random).attr('selected',true);
    }
    
    function isRestaurantAcceptable(restaurant, people) {
        for (i in people) {
            if (restaurant.dislikes.indexOf(people[i]) !== -1) {
                return false;
            }
        }
        return true;
    }
    

});
    
    function getSelectedPeople() {
        var people = [];
        
        $('.people li.active a').each(function() {
            people.push($(this).text());
        });
        
        return people;
    }

    var url = 'https://api.foursquare.com/v2/venues/explore';
    var oauth = 'D53VJTZAO1P0OYL0JNLTV3HDI21IMKUTSQXL1BCYFBVWUCVK';
    var apiVersion = '20130326';
    
    function getVenues() {
        $.ajax({
            data: { 
                ll: '40.7,-74', 
                oauth_token: oauth, 
                v: apiVersion 
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            url: url
        });
    }