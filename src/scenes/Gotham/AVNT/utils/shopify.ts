import { ReactNode, useEffect, useMemo, useState } from "react";
import ShopifyBuy, { Cart as ShopifyCart, LineItemToAdd } from "shopify-buy";
import { Cart, Item, Product, ShopState } from "../types/shop";

type ShopifyClient = {
  domain: string;
  storefrontAccessToken: string;
};

export const useShopifyShop = (props: ShopifyClient): ShopState => {
  const { domain, storefrontAccessToken } = props;

  const CART_ID = `muse-cart-${domain}`;

  const client = useMemo(
    () => ShopifyBuy.buildClient({ domain, storefrontAccessToken }),
    [domain, storefrontAccessToken]
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [checkout, setCheckout] = useState<ShopifyCart>();
  const visuals = useMemo(() => new Map<string, ReactNode>(), []);
  const [open, setOpen] = useState(false);

  const saveNewCart = (newCheckout: ShopifyCart) => {
    localStorage.setItem(CART_ID, newCheckout.id as string);
    setCheckout(newCheckout);
  };

  useEffect(() => {
    // fetch products, cast to Product type
    client.product
      .fetchAll()
      .then((shopifyProducts: any) =>
        setProducts(shopifyToProduct(shopifyProducts))
      );

    // fetch cart id from local storage or create a new one
    const id = localStorage.getItem(CART_ID);
    if (id) {
      client.checkout.fetch(id).then(saveNewCart);
    } else {
      client.checkout.create().then(saveNewCart);
    }
  }, [client]);

  // create cart object
  const cart: Cart = {
    items: checkout ? (checkout.lineItems as Item[]) : [],
    // @ts-ignore
    url: checkout?.webUrl,
    add: (id: string, visual?: ReactNode) => {
      // store visual in the map
      if (visual) visuals.set(id, visual);

      if (!checkout?.id) return;
      const lineItemsToAdd: LineItemToAdd = { variantId: id, quantity: 1 };
      client.checkout
        .addLineItems(checkout.id, [lineItemsToAdd])
        .then(saveNewCart);
    },
    subtract: (id: string) => {
      if (!checkout?.id) return;
      const prod = checkout.lineItems.find((prod: any) => prod.id === id);
      if (!prod) return;
      if (prod.quantity === 1) {
        client.checkout.removeLineItems(checkout.id, [id]).then(saveNewCart);
      } else {
        client.checkout
          .updateLineItems(checkout.id, [{ id, quantity: prod.quantity - 1 }])
          .then(saveNewCart);
      }
    },
    remove: (id: string) => {
      if (!checkout?.id) return;
      client.checkout.removeLineItems(checkout.id, [id]).then(saveNewCart);
    },
    count: checkout?.lineItems
      ? checkout.lineItems.reduce(
          (acc: number, cur: any) => acc + cur.quantity,
          0
        )
      : 0,
    clear: () => {
      client.checkout.create().then(saveNewCart);
    },
    visuals,
    isOpen: open,
    close: () => setOpen(false),
    open: () => setOpen(true),
  };

  return {
    products,
    cart,
  };
};

const shopifyToProduct = (shopifyProducts: any) =>
  shopifyProducts.map((product: any) => ({
    id: product.id,
    title: product.title,
    available: product.availableForSale,
    handle: product.handle,
    description: product.description,
    images: product.images.map((image: any) => image.src),
    variants: product.variants.map((variant: any) => ({
      id: variant.id,
      available: variant.available,
      price: variant.price,
    })),
  }));
