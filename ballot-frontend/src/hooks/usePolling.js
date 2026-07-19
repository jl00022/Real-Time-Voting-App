import { useCallback, useEffect, useRef } from "react";
import { updateCount } from "../api/sessions";

const POLL_INTERVAL_MS = 2000;

export function usePolling({ onData, onEnded }) {
  const pollRef = useRef(null);
  const callbacksRef = useRef({ onData, onEnded });
  callbacksRef.current = { onData, onEnded };

  const stop = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const start = useCallback(
    (sessionId) => {
      stop();
      const tick = async () => {
        try {
          const data = await updateCount(sessionId);
          callbacksRef.current.onData(data.counts || {});
        } catch (e) {
          if (e.status === 404) {
            stop();
            callbacksRef.current.onEnded();
            return;
          }
          // transient network blip — stay quiet and try again next tick
        }
      };
      tick();
      pollRef.current = setInterval(tick, POLL_INTERVAL_MS);
    },
    [stop]
  );

  useEffect(() => stop, [stop]);

  return { start, stop };
}
