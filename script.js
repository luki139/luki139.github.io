let prev_idx = 3
document.getElementById('backgroundSlideShowOuter').children[prev_idx].style.opacity = 1;


setInterval(changeImg, 6000);
function changeImg() {
    let imgdiv = document.getElementById('backgroundSlideShowOuter');
    let randInt = prev_idx
    while (randInt == prev_idx) {
        randInt = Math.floor(Math.random() * imgdiv.children.length);
    }
    console.log(imgdiv.children);
    // imgdiv.children[prev_idx].className = 'h-100 w-100 backgroundSlideShow fadeout'
    imgdiv.children[prev_idx].style.opacity = 0;
    // imgdiv.children[randInt].className = 'h-100 w-100 backgroundSlideShow fade'
    imgdiv.children[randInt].style.opacity = 1;
    prev_idx = randInt
}