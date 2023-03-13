import {Request, Response} from 'express';

/**
 * This is a healthcheck endpoint.
 * @param {Request} req - The request object empty body
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The response object with the status of the service
 * **/
const healthcheck = async (req: Request, res: Response) => {
    try {
        res.status(200).send({status: 'OK'});
    } catch (e) {
        res.status(500).send({status: 'ERROR'});
    }
}

export default healthcheck;