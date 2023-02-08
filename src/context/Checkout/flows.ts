export enum VantiCheckoutFlowType {
  pse = "pse",
  vantiListo = "vantiListo",
  factura = "factura",
}

export type VantiCheckoutStep = {
  path: string;
  onNext: () => void;
  onPrev: () => void;
};

export interface VantiChekoutCustomer {
  name: string;
  lastName: string;
  cellPhone: string | number;
  email: string;
}

export type VantiCheckoutFlow = {
  name: VantiCheckoutFlowType;
  steps: string[];
  getNextStep: (step: string) => string | null;
  getPrevStep: (step: string) => string | null;
};

export class Flow implements VantiCheckoutFlow {
  name: VantiCheckoutFlowType;
  steps: string[];
  loggedSteps: string[];

  constructor(
    name: VantiCheckoutFlowType,
    steps: string[],
    loggedSteps?: string[]
  ) {
    this.name = name;
    this.steps = steps;
    this.loggedSteps = loggedSteps || steps;
  }

  public getNextStep(step: string, isLogged = false) {
    const steps = isLogged ? this.loggedSteps : this.steps;
    const i = steps.findIndex((item) => item === step);

    return steps.at(i + 1);
  }

  public getPrevStep(step: string, isLogged = false) {
    const steps = isLogged ? this.loggedSteps : this.steps;
    const i = steps.findIndex((item) => item === step);

    return steps.at(i - 1);
  }

  public getAddressesStep() {
    return this.steps.find((i) => i === "addresses");
  }
};

const flows = [
  new Flow(
    VantiCheckoutFlowType.pse,
    ["verify", "personal-info", "addresses", "summary"],
    ["verify", "addresses", "summary"],
  )
];
export default flows;
