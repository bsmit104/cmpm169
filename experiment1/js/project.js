// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // // create an instance of the class
  // let myInstance = new MyProjectClass("value1", "value2");

  // // call a method on the instance
  // myInstance.myMethod();
  const fillers = {
    Name: ["Lizard", "Bro", "Smartphone", "Tablettie", "Homeslice", "Nvidiavid", "Minecraften", "Ore", "Dragonborn", "Fortnithan", "Valroantony", "Java the Hutt", "Crypto Knight", "Darth Trader", "Meme-ona Ryder", "InstaGraham"],
    Work: ["Scroller", "Space Ambassador", "Meme Archaeologist", "Stream Analyst", "AI Prompter", "Space Tourguide", "Hover Instructor", "Neurolink Ad Designer", "Neurolink Ad Blocker"],
    Shoes: ["Space Boots", "Elons", "Nike Floats","Vans (they have tires now)", "Biodegradeable (weekly)", "Dawg Covers", "Robot Feet (no shoes)"],
    Pet: ["Sharktopus", "Smartphone buddy", "Banana","Penguin", "Walkable Flower", "Thumb Dog", "Thumb Cat"],
    Date: ["01-05-2401", "04-22-2436", "07-18-2412", "10-03-2457", "03-29-2478", "08-14-2409", "11-11-2444", "05-06-2493", "09-09-2465", "12-25-2481"],
    Shirt: ["Self Heating", "Air Conditioned", "Edible", "Carpet", "Pockets are chargers", "Bee protective", "Arm Jeans", "Pinkquoise (started to discover new colors)", "Touchscreen", "Indestructible", "Stain proof white", "Neurolink thought to tummy projection add on"],
    Pants: ["pants?", "Pinkquoise (started to discover new colors)", "Ickies", "Tik Tackys", "extra leg", "invisible (chill, it makes your legs invisible too)", "Airconditioned", "Butt warming", "Toilet built in", "Autowalk mode", "Chair transforming", "Self washing", "Stain proof"],
    About: ["Has 4 phones but only uses 3 at a time", "Fav Restaurant is Bell Tacodonalds!", "Meme Developing is my hobby!", "Miss talking with my dog (Dogs can speak)", "Needs a new neurolink", "Cant believe the One Piece was *************", "Now that I can stream in my brain I finished anime!", "Glad everyone realized Hobbit is better than LOTR", "nwcinecpiwncinsjnpiqnwicncNSkjnxACNIWENEN tbh if u know what I mean"],
  };
  
  // const template = `Character Name: $Name <br>
  
  // Occupation: $Work <br>
  // Pet: $Pet <br>
  // Clothes: <br>
  //   Shoes: $Shoes <br>
  //   Shirt: $Shirt <br>
  //   Pants: $Pants <br>
  // About: $About <br>
  // `;
  const template = `Born on $Date, $Name <br>
  is just a regular NPC-like bro that works as a $Work <br>
  They have a pet $Pet. <br>
  According to modern fashion, they wear $Shoes shoes, a $Shirt shirt, and $Pants pants. <br>
  Since everyone in the 25th century has a brain hologram status that is visible with neurolink or google vision contact lenses to everyone at any time,
  these 25th century npcs each have unique bios.<br>
  This NPC's is <br>About: $About
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").html(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  generate();
}

// let's get this party started - uncomment me
main();