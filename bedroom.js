
function preload() {
    img = loadImage("bedroom.jpg");
}
img = "";
model_status = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objmodel = ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML = "Status: Object detection started";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (model_status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected";
            obj_name = objects[i].label;
            obj_percent = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_width = objects[i].width;
            obj_height = objects[i].height;
            textSize(20);
            fill("red");
            text(obj_name+" "+obj_percent+"%",obj_x+20,obj_y+20);
            noFill();
            stroke("red");
            rect(obj_x,obj_y,obj_width,obj_height);
        }
    }
}

function modeloaded() {
    console.log("model loaded!");
    model_status = true;
    objmodel.detect(img, get_results);
}

function get_results(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        objects = r;
    }
}