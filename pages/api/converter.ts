import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const qs = require('querystring');


export default function converter(req: NextApiRequest, res: NextApiResponse) {
    const params = qs.stringify({
        source: 'ko',
        target: 'vi',
        text: req.query.query,
    })

    const config = {
        baseURL: 'https://openapi.naver.com/v1/papago/n2mt',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-naver-client-id': 'yw9G1JRVERqiw9Tb3wN6',
            'x-naver-client-secret': '1A3fBdphSc',
        },
    }
    
    axios.post("https://openapi.naver.com/v1/papago/n2mt", params, config)
        .then((response) => {
        res.status(200).json(response.data);
        })
        .catch((error) => {
        console.log("error", error.response.data);
    }); 
}