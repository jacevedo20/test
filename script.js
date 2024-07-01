document.getElementById('upload-button').addEventListener('click', () => {
    document.getElementById('upload').click();
});

document.getElementById('camera-button').addEventListener('click', () => {
    document.getElementById('camera').click();
});

document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('camera').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const img = document.getElementById('uploaded-image');
        img.src = URL.createObjectURL(file);
        document.getElementById('crop-container').style.display = 'block';
    }
}

document.getElementById('crop-button').addEventListener('click', () => {
    const img = document.getElementById('uploaded-image');
    // Assume cropImage function exists and returns a base64 string of the cropped image
    const croppedImage = cropImage(img);
    document.getElementById('language-selection').style.display = 'block';
});

document.getElementById('language').addEventListener('change', () => {
    const language = document.getElementById('language').value;
    const imageBase64 = croppedImage; // The base64 string from the cropping step
    processImage(imageBase64, language);
});

function processImage(image, language) {
    fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, language })
    })
    .then(response => response.json())
    .then(data => {
        displayResult(data);
    });
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = data.explanation;
    resultDiv.style.display = 'block';
    if (data.understood) {
        displayQuestion(data.newQuestion);
    } else {
        // Handle understanding prompt
    }
}

function displayQuestion(question) {
    const questionDiv = document.getElementById('question');
    questionDiv.innerHTML = question;
    questionDiv.style.display = 'block';
}
