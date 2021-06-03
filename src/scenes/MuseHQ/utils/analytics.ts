import posthog from "posthog-js";

posthog.init("PCoHEHV8I8etm7-gSY6RT8tcev9M3VWoejzJKjv2Ifw", {
  api_host: "https://app.posthog.com",
});

const IS_PROD = process.env.NODE_ENV === "production";

export const analytics = {
  capture: (id: string, data?: any) => {
    if (IS_PROD) {
      posthog.capture(id, data);
    } else {
      console.log(`POSTHOG CAPTURE // ${id} // ${JSON.stringify(data)}`);
    }
  },
  identify: (uniqueId: string, data?: any) => {
    if (IS_PROD) {
      posthog.identify(uniqueId, data);
    } else {
      console.log(`POSTHOG IDENTIFY // ${uniqueId} // ${JSON.stringify(data)}`);
    }
  },
};
