import { IBlockFormSignIn } from "./SignInFormBlock";
import { mockSignInFormsProps } from "@/components/organisms/forms/signin-form/SignIn.mocks";
import { mockSidebarInformativeProps } from "@/components/organisms/cards/sidebar-informative/SidebarInformative.mock";

const data: IBlockFormSignIn = {
    form: mockSignInFormsProps.data,
    sidebar: mockSidebarInformativeProps.data
};

export const mockSignInFormBlockProps = {
    data
};