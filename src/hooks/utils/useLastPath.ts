import { useRouter } from "next/router";

export const useLastPath = (clean = false) => {
    const router = useRouter();
    const { asPath, pathname } = router;
    const __pathname = clean ? pathname : asPath;
    return __pathname.split('/').pop();
};