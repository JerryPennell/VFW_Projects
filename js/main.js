//Activity 2
//Visual Framworks (VFW)
//Mobile Development
//Full Sail University

//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

     //getElementById function
     function $(x){
           var theElement = document.getElementById(x);
           return theElement;
     }
     
     
     //Create select field element and populate with options
     function makeComics(){
         var     formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
		 selectLi    = $('select'),
		 makeSelect  = document.createElement('select');
		 makeSelect.setAttribute("id","groups");
         for(var i=0, j=comicGroups.length; i<j; i++){
             var makeOption = document.createElement('option');
             var optText = comicGroups[i];
             makeOption.setAttribute("value", optText);
             makeOption.innerHTML = optText;
             makeSelect.appendChild(makeOption);
         }
         selectLi.appendChild(makeSelect);
      }
     
     //Find value of selected radio button
     function getSelectedRadio(){
         var radios = document.forms[0].haveit;
         for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
               haveitValue = radios[i].value;
            }
          }
     }
     
     function getCheckboxValue(){
       if($('need').checked){
          needValue = $('need').value;
       }else{
           needValue = "No";
       }
     }
     
     
     function toggleControls(n){
        switch(n){
            case "on":
                 $('comicForm').style.display ="none";
                 $('clear').style.display="inline";
                 $('displayLink').style.display ="none";
                 $('addNew').style.display = "inline";
                 break;
            case "off":
                 $('comicForm').style.display ="block";
		 $('clear').style.display="inline";
		 $('displayLink').style.display ="inline";
                 $('addNew').style.display = "none";
                 $('items').style.display = "none";
                 break;
            default:
                return false;
        }
     }
     
     
     //Save data into local storage
     function storeData(){       
          var id             = Math.floor(Math.random()*10000001);
          //Gather up all our form field values and store in an object
          //Object properties contain array with the form label and input value
          getSelectedRadio();
          getCheckboxValue();
          var item               = {};
              item.publisher     = ["Publisher:",$('groups').value];
              item.cname         = ["Comic Name:",$('cname').value];
              item.iname         = ["Issue:",$('iname').value];
              item.email         = ["Email:",$('email').value];            
              item.haveit        = ["Have it?:",haveitValue];
              item.need          = ["Do we need it?:",needValue];       
              item.rating        = ["Rating:",$('rating').value];
              item.date          = ["Date:",$('date').value];
              item.notes         = ["Notes:",$('notes').value];
              
              
          //Save all the data into local storage Use Stringify to convert our object to a string.          
          localStorage.setItem(id, JSON.stringify(item));    
		  console.log("This is an id: " +id);               
          alert("Comic Saved");
      }
      
      function getData(){
         toggleControls("on");
         if(localStorage.length === 0){
           alert("There is no data in Local Storage");
         }
         //Write Data from Local Storage to the browser.
         var makeDiv = document.createElement('div');
         makeDiv.setAttribute("id", "items");
         var makeList = document.createElement('ul');
         makeDiv.appendChild(makeList);
         document.body.appendChild(makeDiv);
         $('items').style.display = "display";
         for(var i=0, len=localStorage.length; i<len; i++){
             var makeli = document.createElement('li');
             makeList.appendChild(makeli);
             var key = localStorage.key(i);
             var value = localStorage.getItem(key);
             //Convert the string from local storage value back to an object by using JSON.parse()
             var obj = JSON.parse(value);
             var makeSubList = document.createElement('ul');
             makeli.appendChild(makeSubList);
             for(var n in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
             }
         }
      }
      
      //Clear all data
      function clearLocal()  {
           if(localStorage.length === 0){
                alert("There is no data to clear.");
           }else{
               localStorage.clear();
               alert("All comics deleted.");
               window.location.reload();
               return false;
           }
       }
         
 
      
     
     //variable defaults
     var comicGroups = ["-- Choose A Publisher --", "DC","Marvel","Image","Dark Horse"],
         haveitValue,
         needValue = "No"
     ;         
     makeComics();
     
     
     //Set Link & Submit Click Events
     
     var displayLink = $('displayLink');
     displayLink.addEventListener("click", getData);
     var clearLink =$('clear');
     clearLink.addEventListener("click", clearLocal);
     var save = $('submit');
     save.addEventListener("click", storeData);




         
});         