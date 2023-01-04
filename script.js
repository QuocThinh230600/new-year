let open_item = document.querySelector(".button");
let container = document.querySelector(".container");

open_item.addEventListener("click", ()=>{
    container.classList.toggle("show-image");
});

// js hoa mai sharethuthuat.com
document.write(
    // '<style type="text/css">html{padding-bottom:20px}</style>'+
    '<img '+ 
        'style="position:fixed;'+
        'z-index:9999;'+
        'top:0;'+
        'left:0;"'+
        'src="./image/banner_left.png" _cke_saved_src="./image/banner_right.png"/>'+
    '<img '+ 
        'style="position:fixed;'+
        'z-index:9999;'+
        'top:0;'+
        'right:0;"'+
        'src="./image/banner_right.png"/>'+ 
    '<div '+
        'style="position: fixed;'+
        'z-index: 9999;'+ 
        'bottom: -50px;'+
        'left: 0;'+
        'width: 100%;'+
        'height: 104px;'+
        'background:url(./image/nentet.png) repeat-x bottom left;">'+
        '</div>'+
    '<img '+ 
        'style="position:fixed;'+
        'z-index:9999;'+
        'bottom:20px;'+
        'left:20px"'+
        ' src="./image/banner_header.png"/>'
);

var pictureSrc    = "./image/anh-bong-hoa-dao-png_102501764.webp"; //ảnh
var pictureWidth  = 15; //Chiều rộng của hoa
var pictureHeight = 15; //Chiều cao của hoa
var numFlakes     = 10; //số lượng xuất hiện
var downSpeed     = 0.01; //tốc độ(portion of screen per 100 ms)
var lrFlakes      = 10; //lắc mông từ trái sang phải


if( typeof( numFlakes ) != 'number' || Math.round( numFlakes ) != numFlakes || numFlakes < 1 ) {
    numFlakes = 10; 
}

//draw the snowflakes
for( var x = 0; x < numFlakes; x++ ) {
    if( document.layers ) { //releave NS4 bug
        document.write('<layer id="snFlkDiv'+ x +'"><imgsrc="'+ pictureSrc +'" height="'+ pictureHeight +
            '"width="'+ pictureWidth +'" alt="*" border="0"></layer>'
        );
    } else {
        document.write('<div style="position:absolute; z-index:9999;"id="snFlkDiv'+ x +'"><img src="'+ pictureSrc +
            '"height="'+ pictureHeight +'" width="'+ pictureWidth +'" alt="*"border="0"></div>'
        );
    }
}

//calculate initial positions (in portions of browser window size)
var xcoords = new Array(), ycoords = new Array(), snFlkTemp;

for( var x = 0; x < numFlakes; x++ ) {
    xcoords[x] = ( x + 1 ) / ( numFlakes + 1 );
    
    do { 
        snFlkTemp = Math.round( ( numFlakes - 1 ) * Math.random() );
    } while( typeof( ycoords[snFlkTemp] ) == 'number' );
    
    ycoords[snFlkTemp] = x / numFlakes;
}

//now animate
function flakeFall() {
    if( !getRefToDivNest('snFlkDiv0') ) { 
        return; 
    }
    
    var scrWidth = 0, scrHeight = 0, scrollHeight = 0, scrollWidth = 0;
    //find screen settings for all variations. doing this every time allows for resizing and scrolling
    if( typeof( window.innerWidth ) == 'number' ) { 
        scrWidth  = window.innerWidth; 
        scrHeight = window.innerHeight; 
    } else { 
        if( document.documentElement && (document.documentElement.clientWidth ||document.documentElement.clientHeight ) ) {
            scrWidth  = document.documentElement.clientWidth; 
            scrHeight = document.documentElement.clientHeight; 
        } else {
            if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                scrWidth = document.body.clientWidth; scrHeight = document.body.clientHeight; 
            } 
        } 
    }
    
    if( typeof( window.pageYOffset ) == 'number' ) { 
        scrollHeight = pageYOffset; 
        scrollWidth  = pageXOffset; 
    } else {
        if( document.body && ( document.body.scrollLeft ||document.body.scrollTop ) ) { 
            scrollHeight = document.body.scrollTop;scrollWidth = document.body.scrollLeft; 
        } else {
            if(document.documentElement && (document.documentElement.scrollLeft ||document.documentElement.scrollTop ) ) { 
                scrollHeight = document.documentElement.scrollTop; 
                scrollWidth  = document.documentElement.scrollLeft; 
            } 
        }
    }

    //move the snowflakes to their new position
    for( var x = 0; x < numFlakes; x++ ) {
        if( ycoords[x] * scrHeight > scrHeight - pictureHeight ) { 
            ycoords[x] = 0; 
        }

        var divRef = getRefToDivNest('snFlkDiv'+x); 
        if( !divRef ) { 
            return; 
        }

        if( divRef.style ) { 
            divRef = divRef.style; 
        } 
        
        var oPix = document.childNodes ? 'px' : 0;

        divRef.top = ( Math.round( ycoords[x] * scrHeight ) + scrollHeight ) + oPix;

        divRef.left = ( Math.round( ( ( xcoords[x] * scrWidth ) - (pictureWidth / 2 ) ) + ( ( scrWidth / ( ( numFlakes + 1 ) * 4 ) ) * (Math.sin( lrFlakes * ycoords[x] ) - Math.sin( 3 * lrFlakes * ycoords[x]) ) ) ) + scrollWidth ) + oPix;
    
        ycoords[x] += downSpeed;
    }
}

//DHTML handlers
function getRefToDivNest(divName) {
    if( document.layers ) { 
        return document.layers[divName]; 
    } //NS4

    if( document[divName] ) { 
        return document[divName]; 
    } //NS4 also

    if( document.getElementById ) {
        return document.getElementById(divName); 
    } //DOM (IE5+, NS6+, Mozilla0.9+, Opera)

    if( document.all ) { 
        return document.all[divName]; 
    } //Proprietary DOM - IE4

    return false;
}

window.setInterval('flakeFall();',100);






