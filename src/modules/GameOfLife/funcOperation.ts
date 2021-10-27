export function getRandomieDataField(
  sizeX: number,
  sizeY: number,
  rndRrate: number
): number[][] {
  const newFieldData = new Array(sizeX)
    .fill(null)
    .map(() => new Array(sizeY).fill(0));

  const rndCellOnY = (sizeY * rndRrate) / 100;
  let rndCounter = 0;
  const setElementJ: Set<number> = new Set([]);
  for (let i = 0; i < sizeX; i += 1) {
    while (rndCounter < rndCellOnY) {
      const j = Math.round(Math.random() * (sizeY + 1));
      if (!setElementJ.has(j) && j < sizeY) {
        setElementJ.add(j);
        rndCounter += 1;
        newFieldData[i][j] = 1;
      }
    }
    setElementJ.clear();
    rndCounter = 0;
  }
  return newFieldData;
}

export function setNewSizeFieldData(
  fieldData: number[][],
  sizeX: number,
  sizeY: number
): number[][] {
  const newFieldData = generateDataField(sizeX, sizeY);

  const stateSizeX: number = fieldData.length;
  const stateSizeY: number = fieldData[0].length;

  for (let i = 0; i < newFieldData.length; i += 1) {
    if (i > stateSizeX - 1) break;
    for (let j = 0; j < newFieldData[i].length; j += 1) {
      if (j > stateSizeY - 1) break;
      newFieldData[i][j] = fieldData[i][j];
    }
  }
  return newFieldData;
}

export function generateDataField(sizeX: number, sizeY: number): number[][] {
  return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
}

export function nextStep(
  fieldData: number[][],
  fieldDataPrev: number[][]
): {
  fieldCurrent: number[][];
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];
} {
  const newFieldDataPrev2 = fieldDataPrev;
  const newFieldDataPrev = fieldData;
  const sizeX: number = fieldData.length;
  const sizeY: number = fieldData[0].length;
  const newFieldData = new Array(sizeX)
    .fill(null)
    .map(() => new Array(sizeY).fill(0));
  for (let i = 0; i < newFieldData.length; i += 1) {
    for (let j = 0; j < newFieldData[i].length; j += 1) {
      const countAround: number = getCountAround(fieldData, i, j);
      const currentCell = Boolean(fieldData[i][j]);
      if (
        (!currentCell && countAround == 3) ||
        (currentCell && (countAround == 3 || countAround == 2))
      ) {
        newFieldData[i][j] = 1;
      } else if (currentCell && countAround != 3 && countAround != 2) {
        newFieldData[i][j] = 0;
      }
    }
  }
  return {
    fieldCurrent: newFieldData,
    fieldDataPrev: newFieldDataPrev,
    fieldDataPrev2: newFieldDataPrev2,
  };
}

export function getCountAround(
  fieldData: number[][],
  x: number,
  y: number
): number {
  const [coordX, coordY] = [[3], [3]];
  coordX[2] = x;
  coordY[2] = y;
  const stateSizeX: number = fieldData.length;
  const stateSizeY: number = fieldData[0].length;
  coordX[0] = x - 1 < 0 ? stateSizeX - 1 : x - 1; //sub
  coordX[1] = x + 1 == stateSizeX ? 0 : x + 1; //add
  coordY[0] = y - 1 < 0 ? stateSizeY - 1 : y - 1; //sub
  coordY[1] = y + 1 == stateSizeY ? 0 : y + 1; //add
  return (
    coordX.reduce(
      (accX, elemX) =>
        accX +
        coordY.reduce((accY, elemY) => accY + fieldData[elemX][elemY], 0),
      0
    ) - fieldData[x][y]
  );
}

export function isFinish(
  fieldData: number[][],
  fieldDataPrev: number[][],
  fieldDataPrev2: number[][]
): boolean {
  const countLifeCell: number = fieldData
    .flat()
    .reduce((acc, item) => acc + item, 0);
  if (countLifeCell == 0) return true;
  for (let i = 0; i < fieldData.length; i += 1) {
    for (let j = 0; j < fieldData[i].length; j += 1) {
      if (
        fieldDataPrev[i][j] != fieldData[i][j] &&
        fieldDataPrev2[i][j] != fieldData[i][j]
      ) {
        return false;
      }
    }
  }
  return true;
}

export function clickOnCell(
  fieldData: number[][],
  x: number,
  y: number
): number[][] {
  const newFieldData = new Array(fieldData.length)
    .fill(null)
    .map((itemRow, indexRow) => [...fieldData[indexRow]]);
  newFieldData[x][y] = fieldData[x][y] ? 0 : 1;
  return newFieldData;
}
