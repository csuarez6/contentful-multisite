import { IBlockFormSignUp } from "./SignUpFormBlock";
import { mockSignUpFormsProps } from "@/components/organisms/forms/signup-form/SignUpForm.mocks";
import { mockSidebarInformativeProps } from "@/components/organisms/cards/sidebar-informative/SidebarInformative.mock";

const data: IBlockFormSignUp = {
    form: mockSignUpFormsProps.data,
    sidebar: mockSidebarInformativeProps.data
};

export const mockSignUpFormBlockProps = {
    data
};