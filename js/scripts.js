var apiKey = 'LCTvhEf61sOSJaA2uWwV6yI35PMMEDyU';
var field;

var userIDArray =[];

(function() {
  var behanceUserAPI = 'http://api.behance.net/v2/creativestofollow?callback=?&client_id='+apiKey;
  function setUserTemplate() {

    var userData    = JSON.parse(sessionStorage.getItem('behanceUser'));

    for(let i = 0; i <= 6; i++){
      for(let ii = 350; ii >= 50; ii--){
        if(userData.creatives_to_follow[i].images[ii] != undefined){
          userIDArray.push(userData.creatives_to_follow[i].id);
          $('.' + 'face'+ i).html('<img id=' + i + ' src="'+ userData.creatives_to_follow[i].images[ii] + '"/>');
          break
        }
      }
    };
    console.log('results', userData);
  };

  if(sessionStorage.getItem('behanceUser')) {
    setUserTemplate();
  } else {
    $.getJSON(behanceUserAPI, function(field) {
      var data = JSON.stringify(field);
      sessionStorage.setItem('behanceUser', data);
      setUserTemplate();
    });
  };

  $('img').click(function(event){
    var userID = null;
    var userID = userIDArray[event.target.id];

    $('.cube').addClass('panel');
    
    var behanceUserAPI = 'http://api.behance.net/v2/users/' + userID + '?callback=?&client_id='+apiKey;

    function setUserProjects() {
      var behanceUserAPI = 'http://api.behance.net/v2/users/' + userID + '?callback=?&client_id='+apiKey;
      var userProjects = JSON.parse(sessionStorage.getItem('userProjects'));
      console.log('New Results:', userID, userProjects.user);

    }

      if(sessionStorage.getItem('userProjects')) {
        setUserProjects();
      } else {
        $.getJSON(behanceUserAPI, function(field) {
          let data = JSON.stringify(field);
          sessionStorage.setItem('userProjects', data);
          setUserProjects();
        });
      };
  });


})();
