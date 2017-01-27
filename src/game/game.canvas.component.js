 export class GameCanvasComponent{
    /*@ngInject*/
    constructor() {
      this.restrict = 'A';
		  this.replace= true;
		  this.transclude= false;
      this.scope = {};
    }

    initDraw(){
    }

    // optional compile function
    compile(tElement) {
      console.log("Compile");
      console.log(tElement);
      this.element = tElement;
      return this.link;
    }

    controller($scope, $element){
      console.log("controller");
      this.scope = $scope;
      this.element = $element;
    }

    // optional link function
    link(scope, element) {

      console.log("Link");

      this.scope = scope;
      this.element = element;

      this.initDraw();
    }
    
    reset(){
       this.element.width = this.element.width; 
    }

    draw(lX, lY, cX, cY){
        // line from
        this.ctx.moveTo(lX,lY);
        // to
        this.ctx.lineTo(cX,cY);
        // color
        this.ctx.strokeStyle = "#4bf";
        // draw it
        this.ctx.stroke();
    }
}

export function GameDirectivet(){
  return {
    link: function(scope, element){

        console.log(scope, element);

      this.ctx = element[0].getContext('2d');

      // letiable that decides if something should be drawn on mousemove
      this.drawing = false;

      // the last coordinates before the current move
      this.lastX;
      this.lastY;

      element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          this.lastX = event.offsetX;
          this.lastY = event.offsetY;
        } else { // Firefox compatibility
          this.lastX = event.layerX - event.currentTarget.offsetLeft;
          this.lastY = event.layerY - event.currentTarget.offsetTop;
        }

        // begins new line
        this.ctx.beginPath();

        this.drawing = true;
      });
      element.bind('mousemove', function(event){
        if(this.drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;
          } else {
            this.currentX = event.layerX - event.currentTarget.offsetLeft;
            this.currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(this.lastX, this.lastY, this.currentX, this.currentY);

          // set current coordinates to last one
          this.lastX = this.currentX;
          this.lastY = this.currentY;
        }

      });
      element.bind('mouseup', function(event){
        // stop this.drawing
        this.drawing = false;
      });

      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }

      function draw(lX, lY, cX, cY){
        // line from
        this.ctx.moveTo(lX,lY);
        // to
        this.ctx.lineTo(cX,cY);
        // color
        this.ctx.strokeStyle = "#4bf";
        // draw it
        this.ctx.stroke();
      }
    }
  };
}