import { useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";

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

const NUMBER_RESOULTS_ON_PAGE = 100;

export const useQueryWithPages = <T>(
    queryId: string,
    loadData: (page: number) => Promise<T[]>,
    loadPages: () => Promise<number>,
    dependencies: any[]
) => {
    const [page, setPage] = useState(0);
    const maxPage = useRef<number>(0);
    const dataCount = useRef<number>(0);

    const query = useQuery({
        queryKey: [queryId, page, ...dependencies],
        queryFn: async () => {
            const [data, count] = await Promise.all([loadData(page), loadPages()]);

            maxPage.current = Math.round(count / NUMBER_RESOULTS_ON_PAGE);
            dataCount.current = count;
            return data;
        },
    });

    return {
        ...query,
        page,
        setPage,
        maxPage,
        dataCount,
    };
};
