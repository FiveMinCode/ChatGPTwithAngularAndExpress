import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
dotenv.config();

const configuration = new Configuration({
    organization: "org-8NZt2L3qiqeTxjrxQzt6DR5q",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({
        message: "hello there"
    })
});

app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }); 

          res.status(200).send({
            bot : response.data.choices[0].text
          })
    }
    catch (error){
        console.log(error);
        res.status(500).send({ error});
    }
})

app.listen(5000, ()=> console.log('Server is up'));