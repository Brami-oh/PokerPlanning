import { InferType } from "yup";
import { pokerPlanningSchema } from "./PokerPlanning.rules";

export type TPokerPlanning = InferType<typeof pokerPlanningSchema>;

export type TVotePokerPlanning = { username: string; vote: number };
