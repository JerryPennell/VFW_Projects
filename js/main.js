//Jerry Pennell 1206
//Project 2
//Visual Framworks (VFW)
//Mobile Development
//Full Sail University

//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	

     //getElementById function
     function $(x){
           var theElement = document.getElementById(x);          //Pass in name for getting tag name by Id
           return theElement;								     //Returns the element
     }
     
     
     //Create select field element and populate with options
     function makeComics(){
         var     formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
		 selectLi    = $('select'),                               //assignment for select element
		 makeSelect  = document.createElement('select');          //creates a select element
		 makeSelect.setAttribute("id","groups");                  //sets an atttribute for id called groups
         for(var i=0, j=comicGroups.length; i<j; i++){  		  //itterate over the options for the comicgroups variable
             var makeOption = document.createElement('option');   //adds the option if item is found in the array
             var optText = comicGroups[i];						  //Adds the item in the array
             makeOption.setAttribute("value", optText);			  //value for the option item
             makeOption.innerHTML = optText;					  //makes inner html
             makeSelect.appendChild(makeOption);				  //appends to the child element
         }
         selectLi.appendChild(makeSelect);                        //at the end of the object appends the select 
      }
     
     //Find value of selected radio button
     function getSelectedRadio(){			
         var radios = document.forms[0].haveit;					  //initialized the form to the radios
         for(var i=0; i<radios.length; i++){					  //loops the form radio set called haveit
            if(radios[i].checked){                                //checks to see which value is checked
               haveitValue = radios[i].value;
            }
          }
     }
	 
     //Find value of the check box
     function getCheckboxValue(){								  
       if($('need').checked){                                     //sees if the need check box is checked
          needValue = $('need').value;
       }else{
           needValue = "No";                                      //if the checkbox is not checked then it will set to value of No
       }
     }
     
     //Toggles te view of the style add area or display area
     function toggleControls(n){
        switch(n){
            case "on":                                            //Case statement to see if the variable is on for turning on the display
                 $('comicForm').style.display ="none";            //Turns off the comicForm style element id
                 $('clear').style.display="inline";               //Turns on the clear style element id
                 $('displayLink').style.display ="none";          //Turns of the displayLink element id
                 $('addNew').style.display = "inline";			  //Turns on the addNew element id
                 break;
            case "off":											  //If the toggle controls is off
                 $('comicForm').style.display ="block";           //comicForm is set to block
		         $('clear').style.display="inline";				  //clear element id is turned on
		         $('displayLink').style.display ="inline";		  //displayLink is turned on
                 $('addNew').style.display = "none";			  //addNew element id is turned off
                 $('items').style.display = "none";               //items id is turned off
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
          getSelectedRadio();													//Checks the selected radio button
          getCheckboxValue();													//Checks the checkbox value
          var item               = {};											//Items object created
              item.publisher     = ["Publisher:",$('groups').value];			//Property for publisher created
              item.cname         = ["Comic Name:",$('cname').value];			//Property for comic name created
              item.iname         = ["Issue:",$('iname').value];					//Property for issue created
              item.email         = ["Email:",$('email').value];                 //Property for email created
              item.haveit        = ["Have it?:",haveitValue];                   //Property for Have it created
              item.need          = ["Needs appraisal:",needValue];              //Property for needs appraisal created
              item.rating        = ["Rating:",$('rating').value];               //Property for creating rating is created
              item.date          = ["Date:",$('date').value];					//Property for data is created
              item.notes         = ["Notes:",$('notes').value];		            //Property for notes is created
              
              
          //Save all the data into local storage Use Stringify to convert our object to a string.          
          localStorage.setItem(id, JSON.stringify(item));    					//Stores the item locally with stringfy as string
		  console.log("This is an id: " +id);               					//Showing the id creation
          alert("Comic Saved");													//Tells the Comic is saved
      }
      
	  //Function to get the data stored local storage
      function getData(){
         toggleControls("on");													//Turns on the controls for display 
         if(localStorage.length === 0){											//Checks to see if items are in local storage
           alert("There is no data in Local Storage");							//alert prompt there is no data found
         }
         //Write Data from Local Storage to the browser.
         var makeDiv = document.createElement('div');							//creates a div tag 
         makeDiv.setAttribute("id", "items");									//sets attributes for new div tag id called items
         var makeList = document.createElement('ul');							//creates ul tag
         makeDiv.appendChild(makeList);											//appends ul to div tag
         document.body.appendChild(makeDiv);									//appends div tag with its child to body tag
         $('items').style.display = "display";									//sets style for items to display
         for(var i=0, len=localStorage.length; i<len; i++){						//itterate the local storage
             var makeli = document.createElement('li');							//makes li tag
             makeList.appendChild(makeli);										//appends li to ul
             var key = localStorage.key(i); 									//key for localstorage objects
             var value = localStorage.getItem(key);								//value of the object by key
             //Convert the string from local storage value back to an object by using JSON.parse()
             var obj = JSON.parse(value);										//Json parsing of object
             var makeSubList = document.createElement('ul');				    //creates the sublist ul element
             makeli.appendChild(makeSubList);									//appends to li ul element
             for(var n in obj){													//itterates the item in the object
                var makeSubli = document.createElement('li');					//creates element li 
                makeSubList.appendChild(makeSubli);								//appends to sublist li
                var optSubText = obj[n][0]+" "+obj[n][1];						//gets the text in the object
                makeSubli.innerHTML = optSubText;								//adds the innerHtml element for the text
             }
			  var addHl = document.createElement('hr');							//adds a horizontal rule seperator for look
			  addHl.setAttribute("id","genlist");								//adds id attribute for css to add styles
		      makeSubList.appendChild(addHl);									//appends the element to the end of the ul set
         }
      }
      
      //Clear all data
      function clearLocal()  {
           if(localStorage.length === 0){										//Checks the lenghth of the localStorage
                alert("There is no data to clear.");							//Alert no data to clear
           }else{
               localStorage.clear();											//if length is greater clear them
               alert("All comics deleted.");									//Alert all the comics were deleted
               window.location.reload();										//reload of the window
               return false;													//returns false
           }
       }
         
 
      
     
     //variable defaults
     var comicGroups = ["-- Choose A Publisher --", "DC","Marvel","Image","Dark Horse"],   //List of comics to be passed in for the select
         haveitValue,																	   //Holding value for if we have it
         needValue = "No"																   //default needs appraisal value
     ;         
     makeComics();															               //calls the function for making the comics list
     
     
     //Set Link & Submit Click Events
     
     var displayLink = $('displayLink');										//gets the tag id called displayLink
     displayLink.addEventListener("click", getData);					        //adds the eventlistener fo click to the displayLink to getData function
     var clearLink =$('clear');													// gets the tag id called clear 
     clearLink.addEventListener("click", clearLocal);					        //assigns an event listener of click to clearLocal data function for id tag clear
     var save = $('submit');													//gets the tag id called submit
     save.addEventListener("click", storeData);									//adds the eventlistener of click to call storeData




         
});         