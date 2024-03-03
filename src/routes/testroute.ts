import { Router } from 'express';
import verifyToken from './middleware/middleware';

const router = Router();

router.get('/protected', verifyToken, (req, res) => {
  return res.send({ message: 'This is a protected route' });
});

router.get('/unprotected', (req, res) => {
  return res.send({ message: 'This is an unprotected route' });
});

export default router;
