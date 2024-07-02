const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: 'sk-proj-Xtmh4e6nXNPXc8WpEZD3T3BlbkFJRWIPFfuiYMXgNgyjc9rV',
});
const openai = new OpenAIApi(configuration);

app.post('/process-image', async (req, res) => {
    const { image, language } = req.body;

    // Here you would process the image and extract the math problem
    const mathProblem = extractMathProblemFromImage(image);

    const prompt = `Explain this math problem to a 3rd grader: ${mathProblem}`;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150,
    });

    const explanation = response.data.choices[0].text.trim();

    res.json({
        explanation,
        understood: false, // Replace with actual logic to determine understanding
        newQuestion: createNewQuestion(mathProblem) // Implement this function
    });
});

function extractMathProblemFromImage(image) {
    // Implement your image processing logic here
    return "2 + 2";
}

function createNewQuestion(problem) {
    // Implement your logic to create a similar question
    return "What is 3 + 3?";
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
