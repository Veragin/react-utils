import { useRef, useEffect } from "react";

export const useRunOnlyOnce = (func: () => Promise<void> | void) => {
    const run = useRef(false);

    useEffect(() => {
        if (!run.current) {
            run.current = true;
            func();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
