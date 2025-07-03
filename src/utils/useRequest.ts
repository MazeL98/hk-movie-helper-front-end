import { useCallback, useState } from "react";
type RequestFn<D, P extends any[]> = (...args: P) => Promise<D>;
// type BaseOptions<D, P extends any[]> = {
//   manual?: boolean;
//   defaultParams?: P;
//   onSuccess?: (data: D) => void;
//   onError?: (error: any) => void;
// };

// ,options:BaseOptions<D,P> ={}

export default function useRequest<D, P extends any[]>(
    requestFn: RequestFn<D, P>
) {
    const [resultData, setResultData] = useState<D>();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();

    const run = useCallback(async (...params: P) => {
        setLoading(true);
        let res;
        try {
            res = await requestFn(...params);
              setResultData(res);

        } catch (error: any) {
            setErr(error.message);
        }

        setLoading(false);
        return res as D;
    }, []);

    return {loading, resultData, err, run};
}
