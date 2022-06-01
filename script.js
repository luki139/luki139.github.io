let prev_idx = 3
document.getElementById('backgroundSlideShowOuter').children[prev_idx].style.opacity = 1;

setInterval(changeImg, 6000);



function changeImg() {
    let imgdiv = document.getElementById('backgroundSlideShowOuter');
    let randInt = prev_idx
    while (randInt == prev_idx) {
        randInt = Math.floor(Math.random() * imgdiv.children.length);
    }
    imgdiv.children[prev_idx].style.opacity = 0;
    imgdiv.children[randInt].style.opacity = 1;
    prev_idx = randInt
}
function getImg(id) {
    return new Promise(function (resolve, reject) {
        apiTemplatesImageIdGet(id)
            .then(function (result) {
                resolve(result)
            }).catch(function (result) {
                console.log(result)
            });
    });

}
let getAllImages = new Promise(function (resolve, reject) {
    promises = []
    images = []
    apiTemplatesGet()
        .then(function (result) {
            result.forEach(element => {
                promises.push(new Promise(function (resolve, reject) {
                    getImg(element["Id"])
                        .then(function (img) {
                            element["Img"] = URL.createObjectURL(img);
                            images.push(element)
                            resolve();
                        }).catch(function (result) {
                            console.log("Failed appending an image", result)
                            reject();
                        })
                }));
            });
            Promise.all(promises)
                .then(function () {
                    resolve(images)
                }).catch(function () {
                    reject("Failed getting images")
                });
        }).catch(function (result) {
            console.log(result)

        });
});

currentImage = {
    "Img": "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image-768x576.png",
    "Name": "Placeholder",
}
function createInputTextElement(text) {
    return document.createRange().createContextualFragment(`
        <div class="d-flex flex-column justify-content-center">
        <h1 class="py-2 fw-bold">${text}</h1>
        <textarea rows="2"></textarea>
        </div>
    `);
}
function onImageSelect(imgJson) {
    document.getElementById("selectImgChoice").innerHTML = `Currently Selected: ${imgJson["Name"]}`
    currentImage = imgJson
    document.getElementById("Thumbnail").src = imgJson["Img"]


    document.getElementById("text-container").replaceChildren([])
    let no_elements = parseInt(imgJson["TextFieldsCount"], 10);
    let texts = []
    if (no_elements == 2) {
        texts.push("Input top text");
        texts.push("Input bottom text");
    }
    else {
        for (var i = 0; i < no_elements; i++) {
            texts.push(`Input text ${i + 1}`);
        }
    }
    console.log(no_elements);
    for (var i = 0; i < no_elements; i++) {
        document.getElementById("text-container").append(
            createInputTextElement(texts[i])
        )
    }

}
function onSelectImgClick() {
    getAllImages.then(function (images) {
        document.getElementById("selectImgBody").replaceChildren([])
        images.forEach(imgJson => {
            var button = document.createElement("button");
            button.className = "btn btn-default";
            button['data-dismiss'] = "modal"
            button.onclick = function () { onImageSelect(imgJson) }
            button.setAttribute('data-dismiss', 'modal')
            // data-dismiss="modal"
            var image = new Image();
            image.className = "m-1"
            image.style.height = "25vh"
            image.src = imgJson["Img"]

            button.appendChild(image);

            document.getElementById("selectImgBody").appendChild(button)
        });
    }).catch(function (result) {
        console.log(result)
    });
}
function generateMeme() {
    let id = currentImage.Id;
    let texts = []
    let forms = document.getElementById("text-container").querySelectorAll('textarea')
    forms.forEach(element => {
        texts.push(element.value)
    });
    apiTemplatesGeneratePost(id, texts).then(blob => {
        console.log(blob)
        document.getElementById("finalImage").src = URL.createObjectURL(blob)
        document.getElementById("downloadButton").setAttribute("href", URL.createObjectURL(blob))
    }).catch(function (res) {
        console.log("Failed appending an image", res)
    })
    document.getElementById("scrollspyHeading3").style.display = "block"
    console.log(document.getElementById("finalImage").style.display)
    document.getElementById("finalImage").scrollIntoView();
    document.getElementById("finalImage").src = 'https://upload.wikimedia.org/wikipedia/commons/9/92/Loading_icon_cropped.gif'
}