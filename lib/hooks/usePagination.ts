/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';

export const usePagination = <T>(data: T[], pageSize: number) => {
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
    }, []);

    const page = useMemo(() => {
        const pageItems = pages[pageIndex];
        if (!pageItems) return null;

        return {
            number: pageIndex + 1,
            index: pageIndex,
            items: pageItems,
            canAdvance: pageIndex + 1 < pages.length,
            canBack: pageIndex >= 1,
        };
    }, []);

    const isFirstPage = useMemo(() => page?.index === 0, [page]);
    const isLastPage = useMemo(() => page?.number === pages.length, [pages]);

    // Functions
    function changePage(number: number) {
        setPageIndex(number - 1);
    }

    function nextPage() {
        if (!isFirstPage) setPageIndex(prev => prev + 1);
    }

    function prevPage() {
        if (!isLastPage) setPageIndex(prev => prev - 1);
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
