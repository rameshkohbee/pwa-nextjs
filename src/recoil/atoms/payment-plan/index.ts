import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeePaymentPlan } from "src/models/kohbee-payment-plan";

const defaultPaymentPlanData = {} as KohbeePaymentPlan;

export const paymentPlanState = atom({
    key: Atoms.PaymentPlan,
    default: defaultPaymentPlanData,
});
