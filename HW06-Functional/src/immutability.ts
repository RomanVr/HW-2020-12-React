// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  const name = "New York Badgers", league = originalTeam.league;
  return { name, league, roster: 25 };
};

// Задание 2
type SomeArray = ReadonlyArray<number | string>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
  //
  return originalArray.reduce<SomeArray>((acc, item, index) => {
    // console.log(`acc: ${acc} item: ${item} index: ${index}`);
    if (index == 0) return ["two"];
    if (index == 1) return [...acc];
    if (index == 3) return [...acc, item, 5];
    return [...acc, item];
   }, []);
};

// Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeamDeep = (originalTeam: Team): Team => {
  const copyObject = (obj: any): any => 
    Object.keys(obj).reduce((acc, item) => {
      const value: string | number | Object = obj[item];
      if (value instanceof Object) return { ...acc, [item]: copyObject(value) };
      if (item == "age" && value == 27) return { ...acc, [item]: 28 };
      return { ...acc, [item]: value };
    }, {});
  return copyObject(originalTeam);
};
