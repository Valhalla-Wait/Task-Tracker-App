/* eslint-disable max-len */
export const correctPageCurrent = (pageCurrent: number, pageTotal: number, itemsCount: number) =>
  (pageCurrent === pageTotal && itemsCount === 1 && pageTotal !== 1 ? pageCurrent - 1 : pageCurrent);
