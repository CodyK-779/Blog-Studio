import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es
  .imageBucket()
  .beforeDelete(({ ctx, fileInfo }) => {
    console.log('beforeDelete', ctx, fileInfo)
    return true;
  })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;