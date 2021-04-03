import ReactPixel from "react-facebook-pixel";
import { useEffect } from "react";

const options = {
  autoConfig: true,
  debug: false,
};

const isProduction = process.env.NODE_ENV === "production";

const actions = {
  track: (title: string, data: any) => {
    if (isProduction) {
      ReactPixel.track(title, data);
    } else {
      console.log(`Facebook Pixel || Track: ${title} - ${data}`);
    }
  },
  trackCustom: (title: string, data: any) => {
    if (isProduction) {
      ReactPixel.trackCustom(title, data);
    } else {
      console.log(`Facebook Pixel || Track Custom: ${title} - ${data}`);
    }
  },
  pageView: () => {
    if (isProduction) {
      ReactPixel.pageView();
    } else {
      console.log("Facebook Pixel || Pageview");
    }
  },
};

type FBPixelProps = {
  code?: string;
};

export default function FBPixel(props: FBPixelProps) {
  const { code } = props;

  useEffect(() => {
    if (code) {
      ReactPixel.init(code, undefined, options);
      actions.pageView();
    }
  }, [code]);

  return null;
}
