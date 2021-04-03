import { useLayoutEffect } from "react";

type Props = {
  code?: string;
};

export default function GoogleAnalytics(props: Props) {
  const { code } = props;

  useLayoutEffect(() => {
    if (code) {
      // @ts-ignore
      const gtag = window.gtag || {};
      gtag("config", code);
    }
  }, [code]);

  return null;
}
