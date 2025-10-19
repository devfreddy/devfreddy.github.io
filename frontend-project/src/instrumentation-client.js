import { init, addSignalAttribute } from "@dash0/sdk-web";

// devfreddycom
init({
  serviceName: "my-website",
  endpoint: {
    // Replace this with the endpoint url identified during preparation
    url: "https://devfreddy.com",
    // Replace this with your auth token you created earlier
    // Ideally inject the value at build time to not commit the token to git, even if its effectively public
    authToken: "auth_Ro2pVbBZ47ZS2Sq48ieIRl9seWOl8P7B",
    dataset: "devfreddycom"
  },
});

addSignalAttribute("environment", "production");
addSignalAttribute("version", "1.0.0");