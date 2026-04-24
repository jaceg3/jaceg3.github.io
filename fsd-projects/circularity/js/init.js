var init = function (window) { 
   'use strict'; 

   var 
       draw = window.opspark.draw, 
       physikz = window.opspark.racket.physikz, 
       app = window.opspark.makeApp(), 
       canvas = app.canvas, 
       view = app.view, 
       fps = draw.fps('#000'); 

   window.opspark.makeGame = function() { 
      window.opspark.game = {}; 
      var game = window.opspark.game; 

      ///////////////////
      // PROGRAM SETUP //
      ///////////////////

      // TODO 1: Declare our variables
      var circle;
      var circles = [];

      // TODO 2: Create a function that draws a circle
      function drawCircle() {
         circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
         physikz.addRandomVelocity(circle, canvas, 5, 5);
         view.addChild(circle);
         circles.push(circle);
      }

      // TODO 3: Draw 5 circles (can comment out later)
      drawCircle();
      drawCircle();
      drawCircle();
      drawCircle();
      drawCircle();

      // TODO 7: Use a loop to create 100 circles
      for (var i = 0; i < 100; i++) {
         drawCircle();
      }

      ///////////////////
      // PROGRAM LOGIC //
      ///////////////////

      function update() {

         // TODO 8 & 9: Loop through all circles
         for (var i = 0; i < circles.length; i++) {
            physikz.updatePosition(circles[i]);
            game.checkCirclePosition(circles[i]);
         }
      }

      // TODO 6: Keep circles on screen (all sides)
      game.checkCirclePosition = function(circle) {

         // Right → Left
         if (circle.x > canvas.width) {
            circle.x = 0;
         }

         // Left → Right
         if (circle.x < 0) {
            circle.x = canvas.width;
         }

         // Bottom → Top
         if (circle.y > canvas.height) {
            circle.y = 0;
         }

         // Top → Bottom
         if (circle.y < 0) {
            circle.y = canvas.height;
         }
      };

      /////////////////////////////////////////////////////////////
      // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
      /////////////////////////////////////////////////////////////

      view.addChild(fps);
      app.addUpdateable(fps);

      game.circle = circle;
      game.circles = circles;
      game.drawCircle = drawCircle;
      game.update = update;

      app.addUpdateable(window.opspark.game);
   };

   // DO NOT REMOVE THIS CODE
   if ((typeof process !== 'undefined') &&
       (typeof process.versions.node !== 'undefined')) {
       module.exports = init;
   }
};