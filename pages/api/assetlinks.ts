// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import path from "path";
import fs from "fs";

const assetlinks = (req: NextApiRequest, res: NextApiResponse) => {
    // let file = path.resolve(__filename);
    // let data = fs.readFileSync(file);

    res.redirect("/");
}

export default assetlinks;
