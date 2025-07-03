import {
    useRef,
    useLayoutEffect,
    ReactNode
} from "react";
import styles from "./ScrollLoad.module.scss"

type ScrollLoadProps = {
  loadMore: () => void;
  children: ReactNode;
  hasMore: boolean;
  wrapperClassName?: string ;
  height?: number | string;
  showBackToTopButton?:boolean;
}

const ScrollLoad =({wrapperClassName = "",loadMore,hasMore,height=400,showBackToTopButton=false,children}:ScrollLoadProps):React.ReactNode => {

    const containerRef = useRef<HTMLDivElement>(null);
    // const [showTopBtn, setShowTopBtn] = useState(false);
    // const [isLoading, setIsLoading] = useState(false); // 当前是否正在加载数据
    // console.log('showTopBtn',showBackToTopButton,showTopBtn)

    useLayoutEffect(() => {
        const handleScroll = () => {

            const container = containerRef.current;
            if (!container) return;
            const scrollBottom =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight; 
            if (scrollBottom < 50 && hasMore) {
                // setIsLoading(true);

                loadMore();
            }
            // setShowTopBtn(container.scrollTop > 250)
        };

        containerRef.current?.addEventListener("scroll", handleScroll);

        return () =>
            containerRef.current?.removeEventListener("scroll", handleScroll);
    });

    return (
        <div style={{ height: height, overflow: "auto",width: '100%' }} ref={containerRef} className={styles.scrollLoadWrapper + wrapperClassName}>
             {children}
        </div>
    );
  }

export default ScrollLoad;
