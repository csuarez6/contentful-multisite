import { useRouter } from "next/router";

export const useLastPath = () => {
    const { asPath } = useRouter();

    return asPath.split('/').pop();
};