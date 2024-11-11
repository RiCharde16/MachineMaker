require("dotenv").config
const express = require("express")
const routes = express.Router();
const db_produtos = require("../src/data/produtos.json");
const { GoogleGenerativeAI} = require("@google/generative-ai")

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY


routes.post("/gemini-api", async (req, res)=>{
    const { tipo, modelo, pecas } = req.body
    try {
        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Você é um assistente de compatibilidade de peças para montagem de PCs. Quando me perguntarem sobre a compatibilidade de um modelo de peça com outras peças, forneça uma resposta clara sobre a compatibilidade ou incompatibilidade, e explique o motivo.

    Peca Selecionada:
    - Tipo: ${tipo}
    - Modelo: ${modelo}

    Peças Disponíveis:
    ${pecas.map(item => item).join("\n")}

    Baseado nas informações acima, responda se o modelo de ${tipo} ${modelo} é compatível com as peças fornecidas. Apenas caso não seja compatível, explique o motivo resumidamente.

    siga esta modelo de resposta não adicione caracteres especias além do texto a seguir:
    "<p>O modelo <strong>${modelo}</strong> de categoria <strong>${tipo}<strong/> não é compatível com a peça <strong>[Categoria] [modelo]<strong/></p> devido:
    <br/>
    <p>[explicação]</p>"`

    const result = await model.generateContent(prompt)

    res.status(200).json(result.response.text());
    } catch (error) {
        console.error("Erro ao chamar a API do Google Gemini:", error);
        res.status(500).json({error: "Erro ao chamar a API"})
    }
})

module.exports = routes;