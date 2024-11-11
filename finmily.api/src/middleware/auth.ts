import { Request, Response, NextFunction } from 'express';
import config from '../configuration/config';
import { verify } from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token) {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
    }

    console.log('Token:', token);

    let publicRoutes = <Array<String>>config.publicRoutes;
    let isPublicRoute: boolean = false;

    publicRoutes.forEach(url => {
        let isPublic = req.url.includes(url)
        if(isPublic) {
            isPublicRoute = true;
        }
    })

    if(isPublicRoute) {
        next();
    } else {
        if(token) {
            try {
                let _userAuth = verify(token, config.secretKey);
                req.userAuth = _userAuth;
                next();
            } catch (error) {
                res.status(401).send({ message: 'Token inválido' });    
                return;
            }
        } else {
            res.status(401).send({ message: 'Token não informado' });
            return;
        }
    }
}