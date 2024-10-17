import axios from "axios";
import { OPENAI_API_KEY } from "../configs";

const gptEndPoint = "https://api.openai.com/v1/chat/completions"
const gptApiKey = OPENAI_API_KEY;

export const Fetchgpt = async (userQuestions: any[]) => {
    const res = await axios.post(
        gptEndPoint,
        {
            model: 'gpt-4o-mini',
            messages: userQuestions,
        },
        {
            headers: {
                Authorization: `Bearer ${gptApiKey}`,
                'Content-Type': 'application/json',
            }
        }
    )
    return res.data.choices[0].message.content;
}