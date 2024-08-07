/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';

export const usePagination = <T>(data: T[], pageSize = 6) => {
    // States
    const [pageIndex, setPageIndex] = useState(0);

    // Memo vars
    const pages = useMemo(() => {
        const pages = [];
        const pagesCount = Math.ceil(data.length / pageSize);

        for (let pageIndex = 1; pageIndex <= pagesCount; pageIndex++) {
            const page: T[] = [];
            const counter = pageIndex * pageSize - pageSize;
            const limiter = counter + pageSize;

            for (let index = counter; index < limiter; index++) {
                if (data[index]) {
                    page.push(data[index]);
                }
            }

            pages.push(page);
        }

        return pages;
    }, [data, pageSize]);

    const page = useMemo(() => {
        const index =
            pageIndex > pages.length - 1
                ? pages.length - 2 <= 0
                    ? 0
                    : pages.length - 2
                : pageIndex;

        const pageItems = pages[index];

        return {
            number: index + 1,
            index: index,
            items: pageItems ?? [],
            incrementedItems: pages.slice(0, index + 1).flat(),
            canAdvance: index + 1 < pages.length,
            canBack: index >= 1,
        };
    }, [pageIndex, pages]);

    const isFirstPage = useMemo(() => page.index === 0, [page]);
    const isLastPage = useMemo(
        () => page.number === pages.length,
        [page, pages],
    );

    // Functions
    function changePage(number: number) {
        setPageIndex(number - 1);
    }

    function nextPage() {
        if (!isLastPage) setPageIndex(prev => prev + 1);
    }

    function prevPage() {
        if (!isFirstPage) setPageIndex(prev => prev - 1);
    }

    return {
        pages,
        page: {
            ...page,
            next: prevPage,
            prev: nextPage,
            changePage,
        },
        isFirstPage,
        isLastPage,
        prevPage,
        nextPage,
        changePage,
    };
};
