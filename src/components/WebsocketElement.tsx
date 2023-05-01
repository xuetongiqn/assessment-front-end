import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { socket } from "../app/websocket";

// The WebsocketElement catchs the websocket connection status changes. If it is
// disconnected, give user an alert.
export default function WebsocketElement({ children }: { children: JSX.Element }): JSX.Element {
  const [isConnectError, setConnectError] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setConnectError(false);
    });

    socket.on("connect_error", () => {
      setConnectError(true);
    });
  }, []);

  return (
    <div>
      {children}
      {isConnectError && <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity='error' sx={{ width: '100%' }}>Can't connect to the server.</Alert>
      </Snackbar>}
    </div>
  )
}