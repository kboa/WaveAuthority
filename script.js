/**
 *  Make a prediction about an image
 */
function predictImage(input) {
  
  // Data from our form
  let preview = document.querySelector('#preview');
  let card = document.querySelector('#card-img-top');
  let cert = document.querySelector('.ID3062726');
  let answer = document.querySelector('#answer');
  let banner = document.querySelector('.textbanner');
  let retry = document.querySelector('.retry');
  let introresults = document.querySelector('#introresults');
  let introresults_c = document.querySelector('#introresults_c');
  let box = document.querySelector('#box');
  let link1 = document.querySelector('#link1');
  let link2 = document.querySelector('#link2');
  let logo = document.querySelector('.logo');
 
  let file = input.files[0];
  
  // File reader, reads our file....
  let reader = new FileReader();
  
  // Where the Custom Vision API lives
  //let url = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/' + document.querySelector('#predictionProject').value + '/image';
  //Using Model Iteration #1
  //let url = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/e3c626c6-cd5e-41a2-bf98-294f15f03105/classify/iterations/Iteration1/image'
  
  //Using Model Iteration #3
  let url = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/e3c626c6-cd5e-41a2-bf98-294f15f03105/classify/iterations/Iteration3/image';
  
  
  // 0 - Reset the answer text
  introresults.innerText = 'Analyzing...';
  answer.innerText = "";
  
  logo.style.left = "19%";
  logo.style.transform = "";
  
  // 1 - Ask for the file in a format that we can display on the screen
  reader.onloadend = function () {

    // update screen with image
    preview.src = reader.result;
    preview.style.objectFit = "contain";
    //preview.style.top = "-20px";
    box.style.height = "65%";
    cert.style.top = "0%";
    cert.style.left = "10px";
    
  }

  reader.readAsDataURL(file);

  // 2 - Fetch a prediction
  fetch(
    url, 
    {
      headers: {
        //'Prediction-key': document.querySelector('#predictionKey').value 
        'Prediction-key': 'c733edde9ccc485fa862123b21954a87' 
        
      },
      method: 'POST',
      body: file

    }
  ).then(function(response) {

    // convert the response to JSON
    
    if(response.ok) {
      return response.json();
    }
    
    throw new Error(response.statusText);
  

  }).then(function(prediction) {

    //find the tag with the highest probability
    
    let tagName = '';
    let previousProbability = 0;
    console.log(prediction.predictions);
    
    for (let row of prediction.predictions) {
      
      if (row.probability > 0.5 && row.probability > previousProbability) {
        previousProbability = row.probability;
        tagName = row.tagName;
      }
      
      if (tagName) {
        answer.innerText = ''; //+ tagName + previousProbability;
        //answer.innerText = console.log(prediction.predictions);
        retry.style.visibility = "visible";
      
        
        
        if (tagName == "Waves"){
          
          if(previousProbability==1){
            preview.style.backgroundColor = "#7FFF00";
            cert.style.visibility = "visible";
            introresults.style.fontWeight = "normal";
            introresults.innerHTML = "<b>Results</b>: Certified Waver <br/><b>Visibility</b>: " + (previousProbability*100).toFixed(2) + "%<br/><b>Certification #</b>: " + Math.floor((Math.random() * 1000000) + 1) + "<br/><br/><b>Highest Distinction</b>: Top 1% Waver";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px"; 
            //answer.innerText.style.backgroundImage = "url('https://cdn.glitch.com/bc6850ee-54b8-4a84-86fe-078e8e2deabf%2Fgldban.jpg')";  
          }
          
          if(previousProbability<1 && previousProbability>.95){
            preview.style.backgroundColor = "#7FFF00";
            cert.style.visibility = "visible";
            introresults.style.fontWeight = "normal";
            introresults.innerHTML = "<b>Results</b>: Certified Waver <br/><b>Visibility</b>: " + (previousProbability*100).toFixed(2) + "%<br/><b>Certification #</b>: " + Math.floor((Math.random() * 1000000) + 1) + "<br/><br/><b>Distinction</b>: Top 10% Waver";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px"; 
            //answer.innerText.style.backgroundImage = "url('https://cdn.glitch.com/bc6850ee-54b8-4a84-86fe-078e8e2deabf%2Fgldban.jpg')";  
          }
          
          if(previousProbability<.95 && previousProbability>.70){
            preview.style.backgroundColor = "#7FFF00";
            cert.style.visibility = "visible";
            introresults.style.fontWeight = "normal";
            introresults.innerHTML = "<b>Results</b>: Certified Waver <br/><b>Visibility</b>: " + (previousProbability*100).toFixed(2) + "%<br/><b>Certification #</b>: " + Math.floor((Math.random() * 1000000) + 1) + "<br/><br/><b>Distinction</b>: None - barely passed.</br>You might need these...<br><br>";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px"; 
            link1.style.visibility ="visible";
            link2.style.visibility ="visible";
            //answer.innerText.style.backgroundImage = "url('https://cdn.glitch.com/bc6850ee-54b8-4a84-86fe-078e8e2deabf%2Fgldban.jpg')";  
          }
          
          if(previousProbability<.70){
            preview.style.backgroundColor = "red";
            cert.style.visibility = "hidden";
            introresults.style.fontWeight = "normal";
            introresults.innerHTML = "<b>Results</b>: FAIL </br></br>We see those ripples but...we can't certify those</br></br>Keep brushing </br>";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px"; 
            link1.style.visibility ="visible";
            link2.style.visibility ="visible";
            //answer.innerText.style.backgroundImage = "url('https://cdn.glitch.com/bc6850ee-54b8-4a84-86fe-078e8e2deabf%2Fgldban.jpg')";  
          }
          
          }
        
        else{
          preview.style.backgroundColor = "red";
          cert.style.visibility = "hidden";
          
          if (tagName == "Never Gonna Happen") {
            introresults.style.fontWeight = "normal";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px";
            introresults.innerHTML = "<b>Results</b>: FAIL </br></br>Quit now - this aint for you chief</br>Hide that with a durag";
            //link1.style.visibility ="visible";
            link2.style.visibility ="visible";
          }
          else {
            introresults.style.fontWeight = "normal";
            introresults.style.textAlign = "left";
            introresults.style.fontSize = "12px";
            introresults.innerHTML = "<b>Results</b>: FAIL <br/>There's potential... but you need prayers, a cut, and some product!<br/><br/>";
            link1.style.visibility ="visible";
            link2.style.visibility ="visible";
          }
        }
        
   
      } else {
        answer.innerText = 'What the?';
      }
      
      
    }

  })
  .catch(function(error) {
    console.error('Error:', error)
  });

}

// call predict image when the file button changes
document.getElementById('file').onchange = function() {
  predictImage(this);
}
