import { VantiCheckoutFlow, VantiCheckoutFlowType } from ".";

class Flow implements VantiCheckoutFlow {
  steps: string[];
  name: VantiCheckoutFlowType;

  constructor(name: VantiCheckoutFlowType, steps: string[]) {
    this.name = name;
    this.steps = steps;
  }

  public getNextStep(step: string) {
    const i = this.steps.findIndex((item) => item === step);

    return this.steps.at(i + 1);
  }

  public getPrevStep(step: string) {
    const i = this.steps.findIndex((item) => item === step);

    return this.steps.at(i - 1);
  }
};

const flows: VantiCheckoutFlow[] = [
  new Flow(
    VantiCheckoutFlowType.pse,
    ["verify", "personal-info", "addresses", "summary"],
  )
];
export default flows;
