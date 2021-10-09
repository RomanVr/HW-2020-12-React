import { authorizedOnlyHoc } from "@/HOC/authorizedOnlyHoc";
import { GameOfLife } from "@/modules/GameOfLife/GameOfLife";

export const GameScreen = authorizedOnlyHoc<unknown>(GameOfLife, "/login");
