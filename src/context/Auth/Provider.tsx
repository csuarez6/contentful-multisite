import { ReactNode, useEffect, useMemo, useState } from 'react';
import CheckoutContext, { IAuth } from ".";
import { SessionProvider, useSession } from "next-auth/react";
import CommerceLayer, { CommerceLayerClient, Customer } from '@commercelayer/sdk';
import { CL_ORGANIZATION } from '@/constants/commerceLayer.constants';
import jwtDecode from 'jwt-decode';

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProviderWrapper = ({ children }: IAuthProviderProps) => {
  const { status, data: userSession } = useSession();
  const [clientLogged, setClientLogged] = useState<CommerceLayerClient>();
  const [user, setUser] = useState<Customer>();

  const isLogged = useMemo(() => status === "authenticated", [status]);

  useEffect(() => {
    (async () => {
      if (!userSession) return;
      if (status === 'loading') return;

      if (status === 'unauthenticated') return;

      const accessToken: string = userSession?.user["accessToken"];

      try {
        const client = CommerceLayer({
          accessToken,
          organization: CL_ORGANIZATION,
        });

        const { owner } = jwtDecode<{ owner: { id: string } }>(accessToken);

        setUser(await client.customers.retrieve(owner.id));
        setClientLogged(client);
      } catch (error) {
        console.error(error.message);
        setClientLogged(null);
        setUser(null);
      }
    })();
  }, [userSession, status]);

  const valuesProvider: IAuth = {
    isLogged,
    clientLogged,
    user,
  };

  return (
      <CheckoutContext.Provider value={valuesProvider}>
        {children}
      </CheckoutContext.Provider>
  );
};

const AuthProvider = ({ children, session }) => (
  <SessionProvider session={session}>
    <AuthProviderWrapper>{children}</AuthProviderWrapper>
  </SessionProvider>
);
export default AuthProvider;
