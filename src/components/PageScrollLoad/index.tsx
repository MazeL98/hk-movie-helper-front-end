import { useLayoutEffect, useRef } from "react";
import { debounce } from "@/utils/debounce";

type PageLoadProps = {
    loadMore: () => void;
    hasMore: boolean;
    threshold?: number;
};
const usePageScrollLoad = ({
    loadMore,
    hasMore,
    threshold = 180,
}: PageLoadProps) => {
    useLayoutEffect(() => {
        if (typeof window === "undefined") return;
        const handleScroll = debounce(() => {
            if (!hasMore) return;
            const scrollTop = window.scrollY || window.pageYOffset;
            const clientHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollBottom = scrollHeight - scrollTop - clientHeight;
            console.log(
                "clientHeight",
                clientHeight,
                "scrollHeight",
                scrollHeight,
                "scrollTop",
                scrollTop,
                "scrollBottom",
                scrollBottom
            );
            if (scrollBottom <= threshold) {
                loadMore();
            }
        });
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
};
export default usePageScrollLoad;
