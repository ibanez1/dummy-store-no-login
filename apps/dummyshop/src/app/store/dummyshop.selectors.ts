import { createSelector } from '@ngrx/store';
import { productsFeature, userFeature } from './dummyshop.reducer';
import { Product } from './product';

const { selectProducts, selectFavorites, selectSelectedId } = productsFeature;
const { selectUser } = userFeature;

const selectById = (id: number) =>
  createSelector(selectProducts, (state: Product[]): Product | undefined =>
    state.find((p) => p.id === id),
  );

const selectPagedProducts = createSelector(
  selectProducts,
  selectSelectedId,
  productsFeature.selectTotal,
  productsFeature.selectLimit,
  productsFeature.selectSkip,
  (products, selectedId, total, limit, skip) => ({
    products: products.map((product: Product) => ({
      ...product,
      selected: product.id === selectedId,
    })),
    total,
    limit,
    skip
  }),
);

export const fromUser = {
  selectUser
}

export const fromProducts = {
  selectProducts,
  selectFavorites,
  selectPagedProducts,
  selectById,
};
