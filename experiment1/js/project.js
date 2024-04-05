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
  let currentCentury = '22nd';
  
  // // call a method on the instance
  // myInstance.myMethod();
  const fillers = {
    '22nd': {
      Name: ["Jeremy", "James", "Brandon", "Sydney", "Cristine", "Katie", "Tim", "Juan", "Tony", "Aj", "Taylor", "Kelly", "Kristin"],
      Work: ["AI artist", "AI prompting", "AI manager", "AI specialist"],
      Shoes: ["Converse", "Vans", "Nike","Addidas", "Keds", "open toed", "slip on"],
      Pet: ["Dog", "Cat", "Fish","Rock", "Bird", "Lizard", "Frog"],
      Date: ["07-13-2298", "11-29-2287", "09-02-2295", "04-21-2291", "06-18-2289", "03-07-2292", "12-09-2299", "08-25-2284", "05-11-2286", "10-30-2285"],
      Pants: ["blue", "gret", "black", "cut", "ripped", "Levis", "Dickies"],
      About: ["lolololol", "AI is taking over", "AI TOOK MY JOB AND ITLL TAKE YOURS TOO", "AI is not taking your job, new jobs will come", "Neurolink kind of popping off", "Why is Neurolink actually kind of cool?", "BUY NEUROLINK STOCKS", "Me and my homies hate Neurolink", "You guys are so dramatic"],
    },
    '23rd': {
      Name: ["Lizard", "Bro", "Smartphone", "Tablettie", "Homeslice", "Nvidiavid", "Minecraften", "Ore", "Dragonborn", "Fortnithan", "Valroantony", "Java the Hutt", "Crypto Knight", "Darth Trader", "Meme-ona Ryder", "InstaGraham"],
      Work: ["Scroller", "Space Ambassador", "Meme Archaeologist", "Stream Analyst", "AI Prompter", "Space Tourguide", "Hover Instructor", "Neurolink Ad Designer", "Neurolink Ad Blocker"],
      Shoes: ["Space Boots", "Elons", "Nike Floats","Vans (they have tires now)", "biodegradeable (weekly)", "Dawg Covers", "bobot feet (no shoes)"],
      Pet: ["Sharktopus", "Smartphone buddy", "Banana","Penguin", "Walkable Flower", "Thumb Dog", "Thumb Cat"],
      Date: ["23-05-2302", "23-11-2307", "23-09-2305", "23-04-2311", "23-06-2314", "23-03-2310", "23-12-2318", "23-08-2319", "23-05-2316", "23-10-2323"],
      Shirt: ["self heating", "air conditioned", "edible", "carpet", "pockets are chargers", "bee protective", "arm jeans", "pinkquoise (started to discover new colors)", "touchscreen", "indestructible", "stain proof white", "Neurolink thought to tummy projection add on"],
      Pants: ["pants?", "Pinkquoise (started to discover new colors)", "Ickies", "Tik Tackys", "extra leg", "invisible (chill, it makes your legs invisible too)", "Airconditioned", "Butt warming", "Toilet built in", "Autowalk mode", "Chair transforming", "Self washing", "Stain proof"],
      About: ["Has 4 phones but only uses 3 at a time", "LOVE PINKQUOISE", "Fav Restaurant is Bell Tacodonalds!", "Meme Developing is my hobby!", "Miss talking with my dog (Dogs can speak)", "Needs a new neurolink", "Cant believe the One Piece was *************", "Now that I can stream in my brain I finished anime!", "Glad everyone realized Hobbit is better than LOTR", "nwcinecpiwncinsjnpiqnwicncNSkjnxACNIWENEN tbh if u know what I mean"],
    },
    '24th': {
      Name: ["AI Killer", "Survivor", "Hope", "AI Crusher"],
      Work: ["Anti-Ai Special forces", "Anti-Ai General", "Anti-Ai Ground Troop", "Anti-Ai Weapon Specialist", "Anti-Ai Air Support", "Anti-Ai Naval Officer", "Anti-Ai Reistance Leader", "Anti-Ai Resistence Fighter", "Anti-Ai Safe Zone Leader"],
      Shoes: ["Military", "torn up", "enhanced speed","light weight", "cleated", "no"],
      Pet: ["defense dog", "robot defense dog", "robot defense unit (like a floating square that follows you and protects you)", "crypto cat (all the rage for a few years. Just a advanced cyber cat with vast knowledge of stocks)"],
      Date: ["01-05-2401", "04-22-2436", "07-18-2412", "10-03-2457", "03-29-2478", "08-14-2409", "11-11-2444", "05-06-2493", "09-09-2465", "12-25-2481"],
      Shirt: ["military vest", "black", "bullet proof", "camo", "20 pocket"],
      Pants: ["40 pocket?", "old Pinkquoise (started to discover new colors)", "camo", "Dickies", "bullet proof", "heat proof"],
      About: ["UNAVAILABLE"],
    },
    '25th': {
      Name: ["ANJXHB", "HAVHG", "HAJVSJH", "AJHSJSJ", "AJHBSJHB", "AHBSHJGS", "ODOYEOHN", "HGWIUW", "WJKJSJW", "WNKWJKSB", "ABSVVSXV", "NXMBS>AN", "BAJHLSHAVK", "ANBVXMAKJ", "ABXBMM", "AVNXBVMBAHB"],
      Work: ["no work in this century"],
      Shoes: ["standardized blue"],
      Pet: ["standardized dog", "standardized cat", "standardized goldfish"],
      Date: ["07-13-2501", "11-29-2515", "09-02-2507", "04-21-2503", "06-18-2518", "03-07-2509", "12-09-2511", "08-25-2522", "05-11-2506", "10-30-2524"],
      Shirt: ["standardized grey"],
      Pants: ["standardized black"],
      About: ["Couldnt be happier"],
    },
  };
  
  const template = `Born on $Date, $Name <br>
  is just a regular NPC-like bro that works as a $Work <br>
  They have a pet $Pet. <br>
  According to modern fashion, they wear $Shoes shoes, a $Shirt shirt, and $Pants pants. <br>
  Since everyone in the 25th century has a brain hologram status that is visible with neurolink or google vision contact lenses to everyone at any time,
  these 25th century npcs each have unique bios.<br>
  This NPC's is <br>About: $About
  `;

  function setCentury(century) {
    currentCentury = century;
    generate();
}

// Consulted chatgpt for century button help
// https://chat.openai.com/share/29c28088-759e-41d0-b6ca-3d82e95c6327 
$(document).ready(function() {
  $("#btn22").click(function() {
    setCentury('22nd');
  });
  $("#btn23").click(function() {
    setCentury('23rd');
  });
  $("#btn24").click(function() {
    setCentury('24th');
  });
  $("#btn25").click(function() {
    setCentury('25th');
  });
});

  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;

  function replacer(match, name) {
    let options = fillers[currentCentury][name];
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
  
   $("#box").html(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  generate();
}

// let's get this party started - uncomment me
main();