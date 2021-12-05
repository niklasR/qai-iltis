import { Router } from 'express';
import handleError from '../lib/handleError';

const router = Router();

router.get('/messages', async (req, res) => {
  try {
    res.json({ data: 'none' });
  } catch (error) {
    handleError(res, error as Error);
  }
});


export default router;