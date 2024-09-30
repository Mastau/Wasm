const env = {};
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');
const img = new Image();
WebAssembly.instantiateStreaming(fetch('filters.wasm'), {env})
.then(obj => {
    env.memory = obj.instance.exports.memory;
    env.malloc = obj.instance.exports.malloc;
    env.free = obj.instance.exports.free;
    env.ft_grayscale = obj.instance.exports.ft_grayscale;
    env.ft_invert = obj.instance.exports.ft_invert;
    console.log('WASM module loaded');
});

function load(){
    
    img.src = 'etoiles.jpg';
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }
}

function grayscale(){
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var ptr = env.malloc(imageData.data.length);
    var buffer = new Uint8Array(env.memory.buffer, ptr, imageData.data.length);
    buffer.set(imageData.data);
    env.ft_grayscale(ptr, imageData.width, imageData.height);
    imageData.data.set(buffer);
    ctx.putImageData(imageData, 0, 0);
    env.free(ptr);
}

function invert(){
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var ptr = env.malloc(imageData.data.length);
    var buffer = new Uint8Array(env.memory.buffer, ptr, imageData.data.length);
    buffer.set(imageData.data);
    env.ft_invert(ptr, imageData.width, imageData.height);
    imageData.data.set(buffer);
    ctx.putImageData(imageData, 0, 0);
    env.free(ptr);
}

document.querySelector('#gray').addEventListener('click', function() { grayscale(); });
document.querySelector('#invert').addEventListener('click', function() { invert(); });
document.querySelector('#reset').addEventListener('click', function() { load(); });
load();

