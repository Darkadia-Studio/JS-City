 export function GameDirective(){
  return {
    restrict: "A",
    link: function(scope, element){

        console.log(scope, element);

      var ctx = element[0].getContext('2d');

      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

      element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else { // Firefox compatibility
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }

        // begins new line
        ctx.beginPath();

        drawing = true;
      });
      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;
          } else {
            this.currentX = event.layerX - event.currentTarget.offsetLeft;
            this.currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(lastX, lastY, this.currentX, this.currentY);

          // set current coordinates to last one
          lastX = this.currentX;
          lastY = this.currentY;
        }

      });
      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });

      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = "#4bf";
        // draw it
        ctx.stroke();
      }
    }
  };
}