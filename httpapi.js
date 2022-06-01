const invokeURL = 'https://im4m80ruwf.execute-api.us-east-1.amazonaws.com'

const templatesURL = invokeURL + '/templates'
const generateURL = templatesURL + '/generate'
const imageURL = templatesURL + '/image'

function apiTemplatesImageIdGet(id) {
    return fetch(imageURL + '/' + id.toString(), {
        method: 'GET',
        headers: {
            'accept': 'image/jpeg'
        }
    }).then(response => response.blob())

}
function apiTemplatesGet() {
    return fetch(templatesURL, {
        method: 'GET',
        headers: {}
    }).then(response => response.json())
}
function apiTemplatesGeneratePost(id, captions) {
    return fetch(generateURL, {
        method: "POST",
        headers: { 'accept': 'image/jpeg' },
        body: JSON.stringify({ "Id": id, "Captions": captions })
    }).then(res => {
        return res.blob()
    })
}