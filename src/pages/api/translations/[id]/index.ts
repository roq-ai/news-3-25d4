import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { translationValidationSchema } from 'validationSchema/translations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.translation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTranslationById();
    case 'PUT':
      return updateTranslationById();
    case 'DELETE':
      return deleteTranslationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTranslationById() {
    const data = await prisma.translation.findFirst(convertQueryToPrismaUtil(req.query, 'translation'));
    return res.status(200).json(data);
  }

  async function updateTranslationById() {
    await translationValidationSchema.validate(req.body);
    const data = await prisma.translation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTranslationById() {
    const data = await prisma.translation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
