import { useEffect, useState } from "react";
// import axios from "axios";
import { api as axios } from "../services/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import { REVERB_APP_KEY, REVERB_HOST, REVERB_PORT, REVERB_SCHEME } from "@env";

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    //  Setup Pusher client
    const PusherClient = new Pusher(REVERB_APP_KEY, {
      wsHost: REVERB_HOST,
      wsPort: REVERB_PORT ?? 80,
      wssPort: REVERB_PORT ?? 443,
      forceTLS: (REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
      disableStats: true,
      cluster: "mt1",
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            axios
              .post("/broadcasting/auth", {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(false, response.data);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
    });

    // Create Echo instance
    const echo = new Echo({
      broadcaster: "reverb",
      client: PusherClient,
    });

    setEchoInstance(echo);

    // Cleanup on unmount
    return () => {
      if (echo) {
        echo.disconnect();
      }
    };
  }, []);

  return echoInstance;
};

export default useEcho;
