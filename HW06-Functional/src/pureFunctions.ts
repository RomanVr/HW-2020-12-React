// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  const team: Team | undefined = teams.reduce<Team | undefined>(
    (acc, item: Team) => {
      if (acc && acc.score < item.score) return item;
      return acc;
    },
    teams[0]
  );
  const slayer = team ? team.name : "";
  return slayer;
};

// Задание 2
export type QsObj = Record<
  string,
  string | number | boolean | Record<string, unknown>
>;

export const createQs = (qsObj: QsObj): string => {
  const str: string[] = Object.keys(qsObj).reduce<string[]>(
    (acc, item) => [...acc, `${item}=${qsObj[item]}`],
    []
  );

  return `?${str.join("&")}`;
};

// Задание 3

export const parseQs = (qs: string): QsObj =>
  qs
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      return { ...acc, [key]: value };
    }, {});
